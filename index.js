var express = require('express');
const bodyParser = require('body-parser');
const sup=require('./supplement');
let app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/",(req,res)=>{
    res.status(200).end("Welcome Login to continue")

})
app.get("/toogleadm",sup.tooglelogin)

app.post("/candidate",sup.login)



app.get("/candidate/:id",(req,res)=>{

    res.send("Welcome user "+JSON.stringify(sup.logindet()))
})
app.get("/candidate/:id/jobs",sup.getjobs)

app.post("/candidate/:id/jobs",sup.getjobs)

app.post("/candidate/:id/jobs/:jid",sup.apply)

app.get("/candidate/:id/applications",sup.getapplications)

 app.post("/recruiter",sup.login)
  


app.get("/recruiter/:id",(req,res)=>{
    res.send("Welcome user "+JSON.stringify(sup.logindet()))
})
app.get("/recruiter/:id/applications/",sup.getapplications)

app.post("/recruiter/:id/applications/",sup.getapplications)

app.get("/recruiter/:id/candidates/",sup.getcandidates)

app.post("/recruiter/:id/candidates/",sup.getcandidates)

app.patch("/recruiter/:id/applications/:jid/:cid",sup.updatestatus)

app.get("/recruiter/:id/jobs",sup.getjobs)

app.post("/recruiter/:id/jobs",sup.insertjobs)

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
 module.exports=server