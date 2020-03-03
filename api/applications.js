const validate=require("../validate")
const sup=require("../supplement");

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
            let q=`update application set status=${req.body.status},updated_at=(select now()) where job_id=${req.params.jid} and owner_id=${req.params.id} and candidate_id=${req.params.cid};`;
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
            let q=`select candidate_id,job_id,status from applications\
             where owner_id=${req.params.id};`;
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
    jid=req.params.ojid.split(":")[0]
    oid=req.params.ojid.split(":")[1]

    console.log(jid,oid,req.params.ojid)
    client=sup.dbcon()

    await client.connect()
    .then(()=>console.log("WOHOO"))
    .then(()=>{
        let q=`Insert into applications (job_id,candidate_id,owner_id,created_at,updated_at) \
        values ('${jid}','${req.params.id}','${oid}',(select now()),(select now()));`;
        //console.log(q)
        return client.query(q);
    })

    .then((result)=>{
        res.status(201).end(`created new application for (${req.params.ojid},${req.params.id})`)
    })
    
    .catch((e)=>{
        // console.log(e)
        if (e.message.match('constraint "applications_job_id_fkey"')!==null || e.message.match('invalid input syntax for type integer')!==null)
            res.status(400).end("incorrect job id")
        else if(e.message.match('constraint "applications_pkey"')!==null)
            res.status(400).end("application exists")
        else
            throw e;
        
    })
    .finally(()=>{client.end();})
}

module.exports={
    getapplications,
    updatestatus,
    apply
}