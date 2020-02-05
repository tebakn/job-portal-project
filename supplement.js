const Client =require("pg").Client

function dbcon(){
    return (new Client({
        user: "postgres",
        password:"1234",
        host:"desk-naman",
        port:5432,
        database:"portal"
    }))
}
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
            let q=`select candidate_id,applications.job_id,status from applications,jobs\
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
        let q=`Insert into applications (job_id,candidate_id) values (${req.params.jid},${req.params.id});`;
        return client.query(q);
    })
    .then((result)=>{
        res.redirect(`/candidate/${req.params.id}/applications`)
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



module.exports={
    apply,
    login,
    getapplications,
    getjobs,
    insertjobs
}