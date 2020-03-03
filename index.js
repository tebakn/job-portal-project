var express = require('express');
const bodyParser = require('body-parser');
const api=require('./apifunction');
const authapi=require('./api/authentication');
const jobsapi=require('./api/jobs');
const userapi=require('./api/candidateandrecruiter');
const appapi=require('./api/applications');
const cors = require('cors')

const corsOptions = {
    origin: 'https://editor.swagger.io'
  }
  
  let app = express();
  app.use(cors(corsOptions))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/front',express.static('frontend'))
app.use('/swagger',express.static('api/swagger/'))
app.use('/swag',express.static('swagger.json'))
app.use('/semantic',express.static('semantic'))



app.get("/",(req,res)=>{
    res.status(200).sendFile("/home/local/INTERNAL/naman.t/job-portal/frontend/HTML/job_List_With_Image.html")

})
app.get("/toogleadm",authapi.tooglelogin)

app.get("/logout",authapi.logout)


app.post("/candidate",(req,res)=>{
    console.log(req.body)

    if (Object.keys(req.body).includes('first_name'))
        userapi.newuser(req,res)
    else
        authapi.login(req,res)
    })
app.post("/recruiter",(req,res)=>{
    console.log(req.body)
    if (Object.keys(req.body).includes('first_name'))
        userapi.newuser(req,res)
    else
        authapi.login(req,res)
    })

app.get("/candidate/:id",authapi.logindet)
app.get("/recruiter/:id",authapi.logindet)


app.get("/candidate/:id/jobs",jobsapi.getjobs)
app.get("/recruiter/:id/jobs",jobsapi.getjobs)


//app.post("/candidate/:id/jobs",api.getjobs)


app.get("/candidate/:id/applications",appapi.getapplications)
app.get("/recruiter/:id/applications/",appapi.getapplications)


app.post("/candidate/:id/jobs/:ojid",appapi.apply)
app.delete("/candidate/:id/applications/:ojid",api.delete)


app.get("/recruiter/:id/candidates/",userapi.getcandidates)

app.patch("/recruiter/:id/applications/:jid/:cid",appapi.updatestatus)

// app.get("/new:name",(req,res)=>{
//     res.end(req.params.name)
// })

app.post("/recruiter/:id/jobs",jobsapi.insertjobs)
app.delete("/recruiter/:id/jobs/:jid",api.delete)


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
 module.exports=server