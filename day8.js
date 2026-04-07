import http from 'http';
import {URL} from 'url';
const PORT=3000;
const server=http.createServer((req,res) => {
    const url=new URL(req.url, `http://localhost:${PORT}`);
    const path=url.pathname;
    const method=req.method;
    res.setHeader('Content-Type','application/json');
    res.setHeader('X-powered-By','My Custom Server');
    if(path==='/' && method=== 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({message:'Welcome to my API!'}));

    } else if(path==='/echo' && method ==='GET') {
        res.writeHead(200);
        res.end(JSON.stringify({status: 'OK',uptime:process.uptime() }));
    } else if (path==='/echo' && method==='POST') {
        let body='';
        req.on('data',chunk=> body+=chunk);
        req.on('end', () => {
            res.writeHead(200);
            res.end(JSON.stringify({ received: JSON.parse(body) }));
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route not found'}));
    }
});
server.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
});