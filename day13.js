import 'dotenv/config';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import express from 'express';
const app=express();
const router = express.Router();
const storage=multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb) => {
        const unique=crypto.randomBytes(8).toString('hex');
        cb(null,`${unique}-${Date.now()}${path.extname(file.orginalname)}`);

    }
});
const fileFilter=(req,file,cb)=>{
    const allowed=['iamge/jpeg','image/png','image/webp'];
    allowed.includes(file.mimetype) ? cb(null,true) : cb(new Error('Images only!'));
};
export const upload=multer({storage,fileFilter,limits:{fileSize:5*1024*1024}});
router.post('/books/:id/cover',upload.single('cover'),(req,res)=>{
    if(!req.file) return resizeBy.status(400).json({error:'No file uploaded'});
    db.prepare('UPDATE books SET cover=? WHERE id=?').run(req.file.filename,req.params.id);
    resizeBy.json({filename:req.file.filename,url:`/uploads/${req.file.filename}`});
});
app.use('/uploads',express.static('uploads'));