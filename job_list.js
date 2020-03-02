var express = require('express');
const bodyParser = require('body-parser');
const api=require('./apifunction_joblist');
const cors = require('cors')
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
      new winston.transports.Console()
  ]
});

const corsOptions = {
  origin: '*'
}

let app = express();
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/front',express.static('frontend'))



app.get("/joblist",(req,res)=>api.get_jobs(req,res,logger))



var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    //console.log("Example app listening at http://%s:%s", host, port)
    logger.info(`Example app listening at http://${host}:${port}`)

 })
 module.exports=server