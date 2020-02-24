const validate=require("./validate")
const sup=require("./supplement");



function logindet(req,res){
    if(!sup.validuser(req.params.id,req.path.split('/')[1])){
        if (sup.getLogininfo()===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    res.status(200).end("Welcome user "+ JSON.stringify({id:sup.getLogininfo().id,name:sup.getLogininfo().name}))
}

async function getcandidates(req,res){
    if(!sup.validuser(req.params.id,"recruiter")){
        if (sup.getLogininfo()===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    try{
    if(sup.getDatainfo()!==undefined && sup.getDatainfo().api==="candidate"){
        res.status(200).end(JSON.stringify(sup.filterdata(req.query).results))
        return
    }
    client=sup.dbcon()

        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select first_name,last_name,gender,email,phone_number,skills,education \
            from candidate INNER JOIN personal_details ON candidate.candidate_id=personal_details.user_id ;`;
            return client.query(q);
        })
        .then(async (result)=>{
            await sup.setDatainfo({api:"candidate",data:result.rows})
            res.status(200).end(JSON.stringify(sup.filterdata(req.query).results))
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
    if(!sup.validuser(req.params.id,req.path.split('/')[1])){
        if (sup.getLogininfo()===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    try{
    if(sup.getDatainfo()!==undefined && sup.getDatainfo().api==="jobs"){ 
            res.end(JSON.stringify(sup.filterdata(req.query).results))
            return
        }
    if (req.path.split('/')[1]=="candidate"){
        client=sup.dbcon()
        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select * from jobs where isopen='true';`;
            return client.query(q);
        })
        .then(async (result)=>{
            await sup.setDatainfo({api:"jobs",data:result.rows})
            res.status(200).end(JSON.stringify(sup.filterdata(req.query).results))
        })
        .catch((e)=>{throw e;})
        .finally(()=>client.end())

    }
    else{
        client=sup.dbcon()
        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select * from jobs where owner_id=${req.params.id};`;
            return client.query(q);
        })
        .then(async (result)=>{
            await sup.setDatainfo({api:"jobs",data:result.rows})
            res.status(200).end(JSON.stringify(sup.filterdata(req.query).results))
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
    if(!sup.validuser(req.params.id,req.path.split('/')[1])){
        if (sup.getLogininfo()===undefined)
        res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    job=req.body
    let failflag=false;
    out=await validate.validateJob(job)
    .catch((e)=>{
        res.status(400).end(e.message)
        failflag=true;
        })
    if (failflag)
        return
    // console.log("OUTPUT",out)
    client=sup.dbcon()
    await client.connect()
    .then(()=>console.log("WOHOO"))
    .then(()=>{
        let q=`Insert into jobs \
             values('${job.job_id}','${job.name}','${job.salary}','${job.department}','${job.availability}'\
             ,'${job.joining_date}','${job.skills}','${job.isopen}','${req.params.id}');`
                ret=client.query(q);
                return ret  
    })
    .then(()=>{
    res.status(201).end(`Job inserted with ID ${job.job_id}`)})
    .catch((e)=>{
        if (e.message.match('constraint "jobs_pkey"')!==-1)
            res.status(400).end("Job id exists")
        else
            throw e;
    })
    .finally(()=>{client.end()})
}

async function updatestatus(req,res){
    if(!sup.validuser(req.params.id,"recruiter")){
        if (sup.getLogininfo()===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    client=sup.dbcon()
        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`update application set status=${req.boody.status} where job_id=${req.params.jid} and candidate_id=${req.params.cid};`;
            return client.query(q);
        })
        .then((result)=>{
            res.status(200).end(`Updated status of ${req.params.cid}`)
        })
        .catch((e)=>{
            throw e;
        })
        .finally(()=>{client.end()})
}

async function getapplications(req,res){
    if(!sup.validuser(req.params.id,req.path.split('/')[1])){
        if (sup.getLogininfo()===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    try{
    if(sup.getDatainfo()!==undefined && sup.getDatainfo().api==="application"){
        res.end(JSON.stringify(sup.filterdata(req.query).results))
        return
    }
    // console.log(req.path.split('/'))
    if (req.path.split('/')[1]=="candidate"){
        client=sup.dbcon()
        await client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select * from applications where candidate_id=${req.params.id};`;
            return client.query(q);
        })
        .then(async (result)=>{
            await sup.setDatainfo({api:"application",data:result.rows})
            res.end(JSON.stringify(sup.filterdata(req.query).results))
        })
        .catch((e)=>{throw e;})
        .finally(()=>{client.end()})

    }
    else{
        client=sup.dbcon()
        client.connect()
        .then(()=>console.log("WOHOO"))
        .then(()=>{
            let q=`select candidate_id,applications.job_id,status from applications,jobs\
             where applications.job_id=jobs.job_id and jobs.owner_id=${req.params.id};`;
            return client.query(q);
        })
        .then(async (result)=>{
            await sup.setDatainfo({api:"application",data:result.rows})
            res.end(JSON.stringify(sup.filterdata(req.query).results))
        })
        .catch((e)=>{throw e;})
        .finally(()=>{client.end()})
    }
    }
    catch(e){
        if (e.name==="key error")
        res.status(400).end(e.message)
        else
        throw e;
       }
    }
async function apply(req,res){
    if(!sup.validuser(req.params.id,"candidate")){
        if (sup.getLogininfo()===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    client=sup.dbcon()
    await client.connect()
    .then(()=>console.log("WOHOO"))
    .then(()=>{
        let q=`Insert into applications (job_id,candidate_id) values (${req.params.jid},${req.params.id});`;
        return client.query(q);
    })
    .then((result)=>{
        res.status(201).end(`created new application for (${req.params.jid},${req.params.id})`)
    })
    .catch((e)=>{
        // console.log(e.message.match('constraint "applications_job_id_fkey"'))
        if (e.message.match('constraint "applications_job_id_fkey"')!==null)
            res.status(400).end("incorrect job id")
        else if(e.message.match('constraint "applications_pkey"')!==null)
            res.status(400).end("application exists")
        else
            throw e;
        
    })
    .finally(()=>{client.end();})
}
async function login(req,res){
    if (sup.getLogininfo()!==undefined)
        res.status(401).end("LOGINUSER EXISTS")
    inp={id:req.body.username , pass:req.body.password}
    console.log(inp)
    user=req.path.split('/')[1]
    let ret;

    client=sup.dbcon()

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
    .then(async (result)=>{
        console.log(result.rows)
        let candidate_details=result.rows[0]
        if (candidate_details===undefined)
            res.status(400).end("User not found");
        
        else if ((candidate_details.password) !== inp.pass){
            res.status(400).end("Password not found");
        }
        else{
            if(user==="candidate")
                await sup.setLogininfo({id:candidate_details.user_id,skill:candidate_details.skills,name:candidate_details.first_name})
            else
                await sup.setLogininfo({id:candidate_details.user_id,company:candidate_details.company,name:candidate_details.first_name})
            res.status(200).end(`User ${sup.getLogininfo().id}`)
        }
                    //console.log(ret,result.rows[0].user_id)  
    })
    .finally(()=>{client.end();})
}
async function deletefromtable(req,res){
    if (sup.getLogininfo()===undefined){
        res.status(401).end("Login First")
        return
    }
    else if(sup.getLogininfo().id!==10001){
        res.status(401).end(`Invalid ID token`)
        return
    }
    client=sup.dbcon()
    try{
        if (req.path.split('/')[1]=="candidate" && req.path.split('/')[3]=="applications"){

        await client.connect()
        .then(()=>{
            q=`delete from applications where job_id=${req.params.jid} and candidate_id=${req.params.id};`
            return client.query(q)
        })
        .then((results)=>{
            if(results.rowCount===0)
                res.status(200).end(`Application ${req.params.jid} ,${req.params.id} does not exists`)
            else
                res.status(200).end(`Successfully deleted ${req.params.jid} ,${req.params.id} from applications`)
        })
        .catch((e)=>{throw e;})
        .finally(()=>{client.end()})
        }
        else{
            await client.connect()
            .then(()=>{
                q=`delete from jobs where job_id=${req.params.jid} and owner_id=${req.params.id};`
                return client.query(q)
            })
            .then((results)=>{
                if(results.rowCount===0)
                    res.status(200).end(`Job ${req.params.jid} ,${req.params.id} does not exists`)
                else
                    res.status(200).end(`Successfully deleted ${req.params.jid} ,${req.params.id} from jobs`)
            })
            .catch((e)=>{ throw e;})
            .finally(()=>{client.end()})
            }
        }   
        catch(e){
            if(e.message.match('constraint "applications_job_id_fkey"')!==null)
                res.status(400).end("Delete applications first")
            else
            throw e;
        }

}
async function tooglelogin(req,res){
    if (sup.getLogininfo()===undefined) 
        await sup.setLogininfo({id:10001,name:"NAMANAMAN"})
    else
        await logout({},{status:(stat)=>{
            return {end :((message)=>{console.log(`${message} with ${stat} `)})}}})
    res.status(200).end("ADMIN")
}
async function logout(req,res){
    sup.clearDatainfo()
    sup.clearLogininfo()
    res.status(200).end("Logged out successfully")
}



module.exports={
    delete:deletefromtable,
    apply,
    logindet,
    login,
    getapplications,
    getjobs,
    getcandidates,
    insertjobs,
    updatestatus,
    tooglelogin,
    logout
}