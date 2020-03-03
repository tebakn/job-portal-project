const validate=require("../validate")
const sup=require("../supplement");

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
                //CHANGE
            let q=`select candidate_id,array_agg(skills) as skills_list,first_name,last_name,gender,email,phone_number,education \
            from candidate_skill,personal_details where candidate_skill.candidate_id=personal_details.user_id \
            group by(candidate_id,first_name,last_name,gender,email,phone_number,education) order by candidate_id;`;
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

async function newuser(req,res){
    if (sup.getLogininfo()!==undefined)
        res.status(401).end("LOGINUSER EXISTS")
    inp=req.body
    // console.log(inp)
    user=req.path.split('/')[1]

    let failflag=false;
    out=await validate.validateNewUser(inp)
    .catch((e)=>{
        res.status(400).end(e.message)
        failflag=true;
        })
    if (failflag)
        return
    else if(user==="candidate" && inp.skills===undefined){
        res.status(400).end("Skills is required field")
        return 
    }
    else if(user==="recruiter" && inp.company===undefined){
        res.status(400).end("Company is required field")
        return 
    }
    client=sup.dbcon()

    await client.connect()
    .then(()=>{console.log("WOHOO")})
    .then(()=>client.query("BEGIN;"))
    .then(()=>client.query("select max(user_id) from personal_details;"))
    .then((result)=>{
        userid= Number(result.rows[0].max)+1
        //console.log(result.rows[0],userid)
        let q;
        if(inp.education!==undefined){
            q=`Insert into personal_details \
            values(${userid},'${inp.first_name}','${inp.last_name}','${inp.email}','${inp.gender}','${inp.phone_number}','${inp.password}'\
            ,'${inp.username}','${inp.education}',(select now()),(select now()));`;
        }
        else{
            q=`Insert into personal_details(user_id,first_name,last_name,email,gender,phone_number,password,username,created_at,updated_at) \
            values(${userid},'${inp.first_name}','${inp.last_name}','${inp.email}','${inp.gender}','${inp.phone_number}','${inp.password}'\
            ,'${inp.username}',(select now()),(select now()));`;
        }
        
        return client.query(q)
    })
    .then(()=>{
        q=`insert into candidate(candidate_id,created_at,updated_at) values('${userid}',(select NOW()),(select NOW()));`
        return client.query(q)
    })
    .then(()=>{
            if(user==="candidate"){
            let initq=`values('${userid}','${inp.skills[0]}',(select now()),(select now()))`

            intermedq=inp.skills.slice(1).reduce((tot,value) => {
                    return (tot + `,('${userid}','${value}',(select now()),(select now()))`)
                },initq);

            q=`insert into candidate_skill ${intermedq} ;`;
        }
        else
            q=`insert into recruiter values('${userid}','${inp.company}',(select now()),(select now()));`
        
        console.log(q)
        return client.query(q);    
    })
    .then(()=>{
        res.status(201).end(`Created user with id ${userid}`)
        return client.query("COMMIT;")
    })
    .catch((e)=>{
        if(e.message.match('constraint "unique_username"')!==null)
            res.status(400).end("username exists")
        else if(e.message.match('constraint "personal_details_email_key"')!==null)
            res.status(400).end("Email id exists")
        else if(e.message.match('constraint "candidate_skill_pkey"')!==null)
            res.status(400).end("Duplicate skill value")
        else
            throw e;
    })
}



module.exports={
    getcandidates,
    newuser
}