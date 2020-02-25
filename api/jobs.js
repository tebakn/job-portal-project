const validate=require("../validate")
const sup=require("../supplement");

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
            let q=`select jobs.job_id,name,salary,department,availabilty,array_agg(skills) as required_skills,joining_date,jobs.owner_id \
            from jobs,job_skill where isopen='true' and jobs.job_id=job_skill.job_id and jobs.owner_id=job_skill.owner_id \
            group by (jobs.job_id,name,salary,department,availabilty,joining_date,jobs.owner_id) order by jobs.job_id;`;
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
            let q=`select jobs.job_id,name,salary,department,availabilty,array_agg(skills) as required_skills,joining_date,jobs.owner_id \
            from jobs,job_skill where isopen='true' and jobs.job_id=job_skill.job_id and jobs.owner_id=${req.params.id} \
            group by (jobs.job_id,name,salary,department,availabilty,joining_date,jobs.owner_id) order by jobs.job_id;`;
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

    else if(job.skills.length!==job.priority.length){
        res.status(400).end("Skills and Priority must have similar lengths")
        return
    }
    // console.log("OUTPUT",out)
    client=sup.dbcon()
    await client.connect()
    .then(()=>console.log("WOHOO"))
    .then(()=>client.query("Begin;"))
    .then(()=>{
        let q=`Insert into jobs(job_id,name,salary,department,availabilty,joining_date,isopen,owner_id,created_at,updated_at) \
             values('${job.job_id}','${job.name}','${job.salary}','${job.department}','${job.availability}'\
             ,'${job.joining_date}','${job.isopen}','${req.params.id}',(select now()),(select now()));`
                return client.query(q);
    })
    .then(()=>{
        let initq=`values('${job.job_id}','${req.params.id}','${job.skills[0]}','${job.priority[0]}',(select now()),(select now()))`

        intermedq=job.skills.slice(1).reduce((tot,value,valind) => {
                return (tot + `,('${job.job_id}','${req.params.id}','${value}','${job.priority[valind+1]}',(select now()),(select now()))`)
            },initq);

        let q=`insert into job_skill ${intermedq} ;`;
        console.log(q)
        return client.query(q);
    })
    .then(()=>client.query("commit;"))
    .then(()=>{
    res.status(201).end(`Job inserted with ID ${job.job_id}`)})
    .catch((e)=>{
        console.log(e.name)
        if (e.message.match('constraint "jobs_pkey"')!==null)
            res.status(400).end("Job id exists")
        else if(e.message.match('constraint "job_skill_pkey"')!==null){
            //client.query("rollback;")
            res.status(400).end("Duplicate Skill")
        }
        else
            throw e;
    })
    .finally(()=>{client.end()})
}

module.exports={
    getjobs,
    insertjobs
}