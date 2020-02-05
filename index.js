const Client =require("pg").Client
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let loginuser;
async function getjobs(req,res){
    if (req.path.split('/')[1]=="candidate"){
        client=dbcon()
        client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select * from jobs;`;
            return client.query(q);
        })
        .then((result)=>{
            res.end(JSON.stringify(result.rows))
        })

    }
    else{
        client=dbcon()
        client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select * from jobs where owner_id=${req.params.id};`;
            return client.query(q);
        })
        .then((result)=>{
            res.end(JSON.stringify(result.rows))
        })
    }
}
async function insertjobs(req,res){
    job=req.body
    client=dbcon()
    await client.connect()
    .then(()=>console.log("WOHOO"))
    .then(()=>{
        let q=`Insert into jobs \
             values('${job.job_id}','${job.name}','${job.salary}','${job.deparment}','${job.availability}'\
             ,'${job.joining_date}','${job.skills}','${job.isopen}','${req.params.id}');`
        return client.query(q);
    })
    res.redirect(`/recruiter/${req.params.id}/jobs`);
}
async function getapplications(req,res){
    if (req.path.split('/')[1]=="candidate"){
        client=dbcon()
        client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select * from applications where candidate_id=${req.params.id};`;
            return client.query(q);
        })
        .then((result)=>{
            res.end(JSON.stringify(result.rows))
        })

    }
    else{
        client=dbcon()
        client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select candidate_id,applications.job_id,status from applications,jobs,recruiter\
             where applications.job_id=jobs.job_id and jobs.owner_id=${req.params.id};`;
            return client.query(q);
        })
        .then((result)=>{
            res.end(JSON.stringify(result.rows))
        })
    }
}
async function apply(req,res){
    client=dbcon()
    client.connect()
    .then(()=>console.log("WOHOO"))
    .then(()=>{
        let q=`Insert into applications `;
        return client.query(q);
    })
    .then((result)=>{
        res.end(JSON.stringify(result.rows))
    })
}
async function login(inp,user){
    let ret;

    try{       
    client=dbcon()

    await client.connect()
    .then(()=>{console.log("WOHOO")})
    .then(()=>{
        let q;
        if (user==="candidate")
        { q=`Select user_id,first_name,skills,password from personal_details,candidate where username='${inp.id}'\
        and candidate_id=user_id ;`}
        else
         q=`Select user_id,first_name,company,password from personal_details,recruiter where username='${inp.id}'\
        and recruiter_id=user_id ;`
        return client.query(q)})
    .then(result=>{
        let candidate_details=result.rows[0]
        if (candidate_details===undefined)
            ret =false
        
        else if ((candidate_details.password) !== inp.pass){
            ret= null
        }
        else{
            if(user==="candidate")
                ret= {id:candidate_details.user_id,skill:candidate_details.skills,name:candidate_details.first_name}
            else
                ret= {id:candidate_details.user_id,company:candidate_details.company,name:candidate_details.first_name}    
        }
                    //console.log(ret,result.rows[0].user_id)  
    })
    .catch((e)=>console.log(e))
    }
    finally{
    client.end()
}
    console.log(ret)
    return ret
}

function dbcon(){
    return (new Client({
        user: "postgres",
        password:"1234",
        host:"desk-naman",
        port:5432,
        database:"portal"
    }))
}

app.get("/",(req,res)=>{
    res.send("Welcome Login to continue")

})

app.post("/candidate",async (req,res)=>{

    if (loginuser!==undefined)
        res.status(404).end("LOGINUSER EXISTS")
    
    let logininp={id: req.body.username, pass: req.body.password}
    loginuser=await login(logininp,"candidate")
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
app.get("/candidate/:id/jobs",getjobs)

app.get("/candidate/:id/applications",getapplications)
  
  app.post("/recruiter",async (req,res)=>{

    if (loginuser!==undefined)
        res.status(404).end("LOGINUSER EXISTS")

    let logininp={id: req.body.username, pass: req.body.password}
    loginuser=await login(logininp,"recruiter")
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
app.get("/recruiter/:id/applications",getapplications)


app.get("/recruiter/:id/jobs",getjobs)

app.post("/recruiter/:id/jobs",insertjobs)

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })