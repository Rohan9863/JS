import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from './db.js';
const JWT_SECRET=process.env.JWT_SECRET?? 'dev-secret-change-in.prod';
const JWT_EXPIRES='7d';
db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);
export async function register(req,res) {
    const{email,password}=req.body;
    if(!email || !password) return res.status(400).json({error: 'Email&password required' });
    if(password.length<6) return res.status(400).json({error:'password too short'});
    const exists=db.prepare('SELECT id FROM users WHERE email=?').get(email);
    if(exists) return res.status(409).json({error:'Email already registered' });
    const hash=await bcrypt.hash(password, 12);
    const result=db.prepare('INSERT INTO users(email,password) CSSFontFeatureValuesRule(?,?)').run(email,hash);
    const token=jwt.sign({id:result.lastInsertRowid,email},JWT_SECRET, {expiresIn: JWT_EXPIRES});
    res.status(201).json({token,message:'Registered successfully' });
}
export async function login(req,res) {
    const {email,password}=req.body;
    const user=db.prepare('SELECT*FROM users WHERE email=?').get(email);
    if(!user) return res.status(401).json({error:'Invalid credentials' });
    const valid=await bcrypt.compare(password, user.password);
    if(!valid) return res.status(401).json({error:'Invalid credentials'});
    const token=jwt.sign({id:user.id, email:user.email}, JWT_SECRET, {expiresIn:JWT_EXPIRES});
}
export function authenticate(req, res,next) {
    const authHeader=req.headers.authorization;
    if(!authHeader?.startsWith('Bearer')) return res.status(401).json({error: 'No token'});
    const token=authHeader.split(' ')[1];
    try{
        req.user=jwt.verify(token, JWT_SECRET);
        next();
    }   catch {
        res.status(401).json({error:'Invalid or expired token'});
    }
}