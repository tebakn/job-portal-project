var express = require('express');
const bodyParser = require('body-parser');
const api=require('./apifunction');
let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/front',express.static('frontend'))
app.use('/semantic',express.static('semantic'))



app.get("/",(req,res)=>{
    res.status(200).sendFile("/home/local/INTERNAL/naman.t/job-portal/frontend/HTML/candidateprofile.html")
})
app.get("/toogleadm",api.tooglelogin)

app.get("/logout",api.logout)


app.post("/candidate",api.login)
app.post("/recruiter",api.login)

app.get("/candidate/:id",api.logindet)
app.get("/recruiter/:id",api.logindet)


app.get("/candidate/:id/jobs",api.getjobs)
app.get("/recruiter/:id/jobs",api.getjobs)


//app.post("/candidate/:id/jobs",api.getjobs)


app.get("/candidate/:id/applications",api.getapplications)
app.get("/recruiter/:id/applications/",api.getapplications)


app.post("/candidate/:id/jobs/:ojid",api.apply)
app.delete("/candidate/:id/applications/:ojid",api.delete)


app.get("/recruiter/:id/candidates/",api.getcandidates)

app.patch("/recruiter/:id/applications/:jid/:cid",api.updatestatus)

// app.get("/new:name",(req,res)=>{
//     res.end(req.params.name)
// })

app.post("/recruiter/:id/jobs",api.insertjobs)
app.delete("/recruiter/:id/jobs/:jid",api.delete)


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
 module.exports=server