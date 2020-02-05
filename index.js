const Client =require("pg").Client
var express = require('express');
const bodyParser = require('body-parser');
const sup=require('./supplement');
var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let loginuser;

app.get("/",(req,res)=>{
    res.send("Welcome Login to continue")

})

app.post("/candidate",async (req,res)=>{

    if (loginuser!==undefined)
        res.status(404).end("LOGINUSER EXISTS")
    
    let logininp={id: req.body.username, pass: req.body.password}
    loginuser=await sup.login(logininp,"candidate")
    console.log(loginuser)
    if (loginuser===false ){
        loginuser=undefined;
        res.end("User not found");
    }

    else if(loginuser===null){
        loginuser=undefined;
        res.end("Password not found");
    }
    else
        res.redirect(`/candidate/${loginuser.id}`)
})


app.get("/candidate/:id",(req,res)=>{

  res.send("Welcome user "+loginuser.name)
})
app.get("/candidate/:id/jobs",sup.getjobs)

app.post("/candidate/:id/jobs/:jid",sup.apply)

app.get("/candidate/:id/applications",sup.getapplications)


  
  app.post("/recruiter",async (req,res)=>{

    if (loginuser!==undefined)
        res.status(404).end("LOGINUSER EXISTS")

    let logininp={id: req.body.username, pass: req.body.password}
    loginuser=await sup.login(logininp,"recruiter")
    console.log(loginuser)
    if (loginuser===false ){
        loginuser=undefined;
        res.end("User not found");
    }

    else if(loginuser===null){
        loginuser=undefined;
        res.end("Password not found");
    }
    else
        res.redirect(`/recruiter/${loginuser.id}`)
})
app.get("/recruiter/:id",(req,res)=>{
    res.send("Welcome user "+loginuser.name)
})
app.get("/recruiter/:id/applications",sup.getapplications)


app.get("/recruiter/:id/jobs",sup.getjobs)

app.post("/recruiter/:id/jobs",sup.insertjobs)

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })