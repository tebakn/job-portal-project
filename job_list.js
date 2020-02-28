var express = require('express');
const bodyParser = require('body-parser');
const api=require('./apifunction_joblist');
var cors = require('cors')

var corsOptions = {
  origin: '*'
}

let app = express();
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/front',express.static('frontend'))


app.get("/joblist",api.get_jobs)



var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
 module.exports=server