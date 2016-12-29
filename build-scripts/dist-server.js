import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression'

/* eslint-disable no-console */
const port = 3000;
const app = express();

//gzip compression for all files served
app.use( compression() )
app.use(express.static('dist'))

app.get('/users', function(req, res){
   res.json([
      {"id": 1, "firstName": "Bob",     "lastName": "Smith",    "email": "bsmith@mail.com"},
      {"id": 2, "firstName": "Jimbo",   "lastName": "Tuffle",   "email": "jtuff@mail.com"},
      {"id": 3, "firstName": "Shannon", "lastName": "O'Bannon", "email": "shannon@mail.com"}
   ])
})

app.get('/', function(req, res){
   res.sendFile(path.join(__dirname, `/../src/index.html`))
})

app.listen(port, function(err){
   if(err){
      console.log(err)
   } else {
      open(`http://localhost:${port}`)
   }
})
