import express from 'express';
import db from '../db.js';
const router=express.Router();
router.get('/',(req,res)=> {
    const book=db.prepare('SELECT * FROM books WHERE id=?').get(req.params.id);
    if(!book) return res.status(404).json({error:'Not found'});
    res.json(book);
});
router.post('/',(req,res)=> {
    const{title,author,year,genre}=req.body;
    if(!title || !author) return res.status(400).json({error:'Missing fields'});
    const result=db.prepare(
        'INSERT INTO books(title,author,year,genre) VALUES(?,?,?,?)'
    ).run(title,author,year,genre ??'General');
    res.status(201).json({id:result.lastInsertRowid,title,author});
});
router.delete('/:id',(req,res) => {
    const info=db.prepare('DELETE FROM books WHERE id=?').run(req.params.id);
    if(info.changes===0) return res.status(404).json({error:'Not found'});
    res.status(204).send();
});
export default router;