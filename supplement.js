const Client =require("pg").Client

let gotdata;
let loginuser;

function dbcon(){
    return (new Client({
        user: "postgres",
        password:"1234",
        host:"desk-naman",
        port:5432,
        database:"portal"
    }))
}
function logindet(){
    if (loginuser===undefined)
        return loginuser
    return {id:loginuser.id,name:loginuser.name}
}
function filterdata(filter){
    console.log(filter)
    if (Object.keys(filter).length===0)
        return gotdata.data;

        return gotdata.data.filter((values)=>{
        
        let ret= Object.keys(filter).reduce((tot,filtkey)=>{
            if (values[filtkey.toLowerCase()]===undefined)
                {throw {name:"key error",message:`key ${filtkey} not present`};
                return false}
            return (tot && values[filtkey.toLowerCase()]===filter[filtkey])},true)
        return ret; 
    })
}
// function comparator(dbrowobj,filterobj,filterkey){
//     keyarr=filterkey.split('_')
//     if (keyarr.length===1){
//         if (dbrowobj[filterkey.toLowerCase()]!==undefined)
//             return dbrowobj[filterkey.toLowerCase()]===filterobj[filterkey]
//         else
//             throw  `Key ${filterkey} is not present`
//     }
//     last=keyarr.pop()
//     let compute;
//     if (last.toLowerCase()==="isgreater")
//         compute=(a,b)=>{a >= b}
//     else if(last.toLowerCase()==="isless")
//         compute=(a,b)=>{a<=b}
//     else if(last.toLowerCase()==="and")
//         compute=(a,b)


// }
async function getcandidates(req,res){
    if(!validuser(req.params.id,"recruiter")){
        if (loginuser===undefined)
        res.redirect('/')
        else
            res.redirect(`/recruiter/${loginuser.id}`)
        return
    }
    try{
    if(gotdata!==undefined && gotdata.api==="candidate"){
        res.status(200).end(JSON.stringify(filterdata(req.query)))
        return
    }
    client=dbcon()

        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select first_name,last_name,gender,email,phone_number,skills,education \
            from candidate INNER JOIN personal_details ON candidate.candidate_id=personal_details.user_id ;`;
            return client.query(q);
        })
        .then((result)=>{
            gotdata={api:"candidate",data:result.rows}
            res.status(200).end(JSON.stringify(filterdata(req.query)))
        })
        .catch((e)=>{
            throw e;
        })
        .finally(()=>{client.end()})
   }
   catch(e){
    if (e.name==="key error")
    res.status(400).end(e.message)
    else
    throw e;
   }
}
async function getjobs(req,res){
    if(!validuser(req.params.id,req.path.split('/')[1])){
        if (loginuser===undefined){
            res.status(403).end("Invalid user id")
            //res.status(403).redirect('/')
        }
        else{
            let user= (loginuser.skills)?"candidate":"recruiter";
            res.status(403).end("Invalid user id")
            //res.status(403).redirect(`/${user}/${loginuser.id}`)
        }
        return
    }
    try{
    if(gotdata!==undefined && gotdata.api==="jobs"){ 
            res.end(JSON.stringify(filterdata(req.query)))
            return
        }
    if (req.path.split('/')[1]=="candidate"){
        client=dbcon()
        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select * from jobs where isopen='true';`;
            return client.query(q);
        })
        .then((result)=>{
            gotdata={api:"jobs",data:result.rows}
            res.status(200).end(JSON.stringify(filterdata(req.query)))
        })
        .catch((e)=>{throw e;})
        .finally(()=>client.end())

    }
    else{
        client=dbcon()
        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select * from jobs where owner_id=${req.params.id};`;
            return client.query(q);
        })
        .then((result)=>{
            gotdata={api:"jobs",data:result.rows}
            res.status(200).end(JSON.stringify(filterdata(req.query)))
        })
        .catch((e)=>{throw e;})
        .finally(()=>client.end())
    }
    }
    catch(e){
        if (e.name==="key error")
        res.status(400).end(e.message)
        else
        throw e;
       }

}
async function insertjobs(req,res){
    if(!validuser(req.params.id,req.path.split('/')[1])){
        if (loginuser===undefined)
        res.redirect('/')
        else{
            let user= (loginuser.skills)?"candidate":"recruiter";
            res.status(400).redirect(`/candidate/${loginuser.id}`)
        }
        return
    }
    job=req.body
    client=dbcon()
    await client.connect()
    .then(()=>console.log("WOHOO"))
    .then(()=>{
        let q=`Insert into jobs \
             values('${job.job_id}','${job.name}','${job.salary}','${job.deparment}','${job.availability}'\
             ,'${job.joining_date}','${job.skills}','${job.isopen}','${req.params.id}');`
                ret=client.query(q);
                return ret  
    })
    .then(()=>{console.log("afterquerry")
    res.status(201).redirect(`/recruiter/${req.params.id}/jobs`);})
    .catch((e)=>{
        console.log("INSIDE CATCH")
        if (e.message.match('constraint "jobs_pkey"')!==-1)
            res.status(400).end("Job id exists")
        else
            throw e;
    })
    .finally(()=>{client.end()})
}

async function updatestatus(req,res){
    if(!validuser(req.params.id,"recruiter")){
        if (loginuser===undefined)
        res.redirect('/')
        else
            res.redirect(`/recruiter/${loginuser.id}`)
        return
    }
    client=dbcon()
        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`update application set status=${req.boody.status} where job_id=${req.params.jid} and candidate_id=${req.params.cid};`;
            return client.query(q);
        })
        .then((result)=>{
            res.status(200).redirect(`/recruiter/${req.params.id}/applications`)
        })
        .catch((e)=>{
            throw e;
        })
        .finally(()=>{client.end()})
}

async function getapplications(req,res){
    if(!validuser(req.params.id,req.path.split('/')[1])){
        if (loginuser===undefined)
        res.redirect('/')
        else{
            let user= (loginuser.skills)?"candidate":"recruiter";
            res.redirect(`/${user}/${loginuser.id}`)
        }
        return
    }
    try{
    if(gotdata!==undefined && gotdata.api==="application"){
        res.end(JSON.stringify(filterdata(req.query)))
        return
    }
    console.log(req.path.split('/'))
    if (req.path.split('/')[1]=="candidate"){
        client=dbcon()
        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select * from applications where candidate_id=${req.params.id};`;
            return client.query(q);
        })
        .then((result)=>{
            gotdata={api:"application",data:result.rows}
            res.end(JSON.stringify(filterdata(req.query)))
        })
        .catch((e)=>{throw e;})
        .finally(()=>{client.end()})

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
            gotdata={api:"application",data:result.rows}
            res.end(JSON.stringify(filterdata(req.query)))
        })
        .catch((e)=>{throw e;})
        .finally(()=>{client.end()})
    }
    }
    catch{
        if (e.name==="key error")
        res.status(400).end(e.message)
        else
        throw e;
       }
    }
async function apply(req,res){
    if(!validuser(req.params.id,"candidate")){
        if (loginuser===undefined)
        res.redirect('/')
        else
            res.redirect(`/candidate/${loginuser.id}`)
        return
    }
    client=dbcon()
    await client.connect()
    .then(()=>console.log("WOHOO"))
    .then(()=>{
        let q=`Insert into applications (job_id,candidate_id) values (${req.params.jid},${req.params.id});`;
        return client.query(q);
    })
    .then((result)=>{
        res.redirect(`/candidate/${req.params.id}/applications`)
    })
    .catch((e)=>{
        if (e.message.match('constraint "applications_job_id_fkey"')!==-1)
            res.status(400).end("incorrect job id")
        else
            throw e;
        
    })
    .finally(()=>{client.end();})
}
async function login(req,res){
    if (loginuser!==undefined)
        res.status(401).end("LOGINUSER EXISTS")
    inp={id: req.body.username, pass: req.body.password}
    user=req.path.split('/')[1]
    let ret;

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
            res.end("User not found");
        
        else if ((candidate_details.password) !== inp.pass){
            res.end("Password not found");
        }
        else{
            if(user==="candidate")
                loginuser= {id:candidate_details.user_id,skill:candidate_details.skills,name:candidate_details.first_name}
            else
                loginuser= {id:candidate_details.user_id,company:candidate_details.company,name:candidate_details.first_name}
            res.redirect(`/candidate/${loginuser.id}`)   
        }
                    //console.log(ret,result.rows[0].user_id)  
    })


}
function validuser(id,user){
    id=Number(id)
    if (String(id)==='NaN')
        return false
    console.log(loginuser)
    console.log(user)
    if (loginuser===undefined)
        return false
    if (loginuser.id!==id && loginuser.id!==10001)
        return false
    if (user==="candidate" && loginuser.skill===undefined && loginuser.id!==10001)
        return false
    else if (user==="recruiter" && loginuser.company===undefined && loginuser.id!==10001)
        return false
    return true
}
async function tooglelogin(req,res){
    if (loginuser===undefined)
        loginuser={id:10001,name:"NAMANAMAN"}
    else
        loginuser=undefined
    res.status(200).end("ADMIN")
}



module.exports={
    apply,
    logindet,
    login,
    getapplications,
    getjobs,
    getcandidates,
    insertjobs,
    updatestatus,
    tooglelogin
}