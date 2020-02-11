var express = require('express');
const bodyParser = require('body-parser');
const api=require('./apifunction');
let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/",(req,res)=>{
    res.status(200).end("Welcome Login to continue")
})
app.get("/toogleadm",api.tooglelogin)

app.post("/candidate",api.login)
app.post("/recruiter",api.login)




app.get("/candidate/:id",api.logindet)
app.get("/recruiter/:id",api.logindet)


app.get("/candidate/:id/jobs",api.getjobs)
app.get("/recruiter/:id/jobs",api.getjobs)


//app.post("/candidate/:id/jobs",api.getjobs)


app.get("/candidate/:id/applications",api.getapplications)
app.get("/recruiter/:id/applications/",api.getapplications)


app.post("/candidate/:id/jobs/:jid",api.apply)


app.get("/recruiter/:id/candidates/",api.getcandidates)


app.patch("/recruiter/:id/applications/:jid/:cid",api.updatestatus)


// app.get("/new:name",(req,res)=>{
//     res.end(req.params.name)
// })

app.post("/recruiter/:id/jobs",api.insertjobs)

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
 module.exports=server