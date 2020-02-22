let http = require('http')
let fs=require('fs')
let url=require('url')

let server = http.createServer()

server.on('request',(request,response) => {
    response.writeHead(200)
    let query = url.parse(request.url,true).query
    let name = query.name === undefined ? 'anonyme' : query.name //si sinon
    
    fs.readFile('index.html','utf8',(err,data) => {
        if (err) {
            response.writeHead(404)
            response.end('Ce fichier n\'existe pas')
        }

        response.writeHead(200, {
            'Content-type': 'text/html; charset=utf-8'
    
        })
        data = data.replace('{{ name }}', name)
        response.end(data)
    })
    

})

server.listen(8080)
