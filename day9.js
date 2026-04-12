import express from 'express';
const app=express();
const PORT=3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req,res,next)=> {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
let books= [
    {id:1, title:'Clean Code',author:'Robert Martin',year:2008},
    { id:2,title:'The Progmatic Programmer',author:'Hunt&Thomas',year:1999},
    {id:3,title:'You Don\'t Know JS',author:'Kyle Simpson',year:2015},
];
let nextId=4;
app.get('/api/books',(req,res) => {
    const{author,year}=req.query;
    let result=books;
    if(author) result=result.filter(b=>b.author.toLowerCase().includes(author.toLowerCase()));
    if(year) result=result.filter(b=>b.year===parseInt(year));
    res.json({data:result,count:result.length});
});
app.get('/api/books/:id',(req,res)=> {
    const book=books.find(b => b.id===parseInt(req.params.id));
    if(!book) return res.status(404).json({error:'Book not found'});
    res.json(book);
});
app.post('/api/books',(req,res)=> {
    const{title,author,year}=req.body;
    if(!title || !author) return res.status(400).json({error:'title and author required'});
    const newBook={id:nextId++,title,author,year:year??new Date().getFullYear()};
    books.push(newBook);
    res.status(201).json(newBook);
});
app.put('/api/books/:id',(req,res)=> {
    const idx=books.findIndex(b=>b.id===parseInt(req,params.id));
    if(idx===-1) return res.status(404).json({error:'Book not found'});
    books[idx]={...books[idx],...req.body,id:books[idx].id};
    res.json(books[idx]);
});
app.delete('/api/books/:id',(req,res)=> {
    const idx=books.findIndex(b=>b.id===parseInt(req.params.id));
    if(idx===-1) return res.status(404).json({error:'Book not found'});
    books.splice(idx,1);
    res.status(204).send();
});
app.listen(PORT,()=>console.log(`API at http://localhost:${PORT}/api/books`));