const validate=require("./validate")
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
function logindet(req,res){
    if(!validuser(req.params.id,req.path.split('/')[1])){
        if (loginuser===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    res.status(200).end("Welcome user "+ JSON.stringify({id:loginuser.id,name:loginuser.name}))
}
function filterdata(filter){
    console.log(filter)
    page=filter.$paginate_page || 1
    limit=filter.$paginate_limit || 5
     delete filter.$paginate_page
     delete filter.$paginate_limit
    if (Object.keys(filter).length===0)
        return paginated(gotdata.data,page,limit);

        try{
        filtered_result= gotdata.data.filter((values)=>{
        
        let ret= Object.keys(filter).reduce((tot,filtkey)=>{

            return (tot && comparator(values,filter,filtkey))},true)
        return ret; 
    })
    return paginated(filtered_result,page,limit);
    }
    catch(e){throw e;}
}
function comparator(dbrowobj,filterobj,filterkey){
    keyarr=filterkey.split('_')

    if (keyarr.length===1){
        if (dbrowobj[filterkey.toLowerCase()]!==undefined)
            return dbrowobj[filterkey.toLowerCase()]===filterobj[filterkey]
        else
            throw  {name:'key error', message:`Key ${filterkey} is not present`}
    }

    last=keyarr.pop()
    let compute;

    if (last.toLowerCase()==="isgreater")
        compute=(a,b)=>{return Number(a) >= Number(b)}

    else if(last.toLowerCase()==="isless")
        compute=(a,b)=>{return Number(a)<= Number(b)}

    else if (last.toLowerCase()==="isrange")
        compute=(a,b)=>{return Number(b[0])<=Number(a) && Number(a)<=Number(b[1])}

    else
        compute=(a,b)=>{return a===b}
    filterdbkey=keyarr.join('_')

    if (dbrowobj[filterdbkey.toLowerCase()]!==undefined)
            return compute(dbrowobj[filterdbkey.toLowerCase()],filterobj[filterkey])
        else
        throw  {name:'key error', message:`Key ${filterdbkey} is not present`}

}
function paginated(result,page,limit){

    start_index=(page-1)*limit
    end_index=page*limit
    ret_obj={}
    ret_obj.results=result.slice(start_index,end_index);
    if (end_index<result.length)
    {
        ret_obj.next={
            page: page+1,
            limit: limit
        }
    }
    if(start_index>0)
    {
        ret_obj.next={
            page: page-1,
            limit: limit
        }
    }
    return ret_obj
}

async function getcandidates(req,res){
    if(!validuser(req.params.id,"recruiter")){
        if (loginuser===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    try{
    if(gotdata!==undefined && gotdata.api==="candidate"){
        res.status(200).end(JSON.stringify(filterdata(req.query).results))
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
            res.status(200).end(JSON.stringify(filterdata(req.query).results))
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
        if (loginuser===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    try{
    if(gotdata!==undefined && gotdata.api==="jobs"){ 
            res.end(JSON.stringify(filterdata(req.query).results))
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
            res.status(200).end(JSON.stringify(filterdata(req.query).results))
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
            res.status(200).end(JSON.stringify(filterdata(req.query).results))
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
        res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    job=req.body
    await validate.validateJob(job)
    .catch((e)=>{
        console.log(e);
        res.status(400).end(e.message)})
    console.log(job)
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
    res.status(201).end(`Job inserted with ID ${job.job_id}`)})
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
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
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
            res.status(200).end(`Updated status of ${req.params.cid}`)
        })
        .catch((e)=>{
            throw e;
        })
        .finally(()=>{client.end()})
}

async function getapplications(req,res){
    if(!validuser(req.params.id,req.path.split('/')[1])){
        if (loginuser===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    try{
    if(gotdata!==undefined && gotdata.api==="application"){
        res.end(JSON.stringify(filterdata(req.query).results))
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
            res.end(JSON.stringify(filterdata(req.query).results))
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
            res.end(JSON.stringify(filterdata(req.query).results))
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
    if(!validuser(req.params.id,"candidate")){
        if (loginuser===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
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
        res.status(201).end(`created new application for (${req.params.jid},${req.params.id})`)
    })
    .catch((e)=>{
        console.log(e.message.match('constraint "applications_job_id_fkey"'))
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
            res.status(400).end("User not found");
        
        else if ((candidate_details.password) !== inp.pass){
            res.status(400).end("Password not found");
        }
        else{
            if(user==="candidate")
                loginuser= {id:candidate_details.user_id,skill:candidate_details.skills,name:candidate_details.first_name}
            else
                loginuser= {id:candidate_details.user_id,company:candidate_details.company,name:candidate_details.first_name}
            res.status(200).end(`User ${loginuser.id}`)
        }
                    //console.log(ret,result.rows[0].user_id)  
    })


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