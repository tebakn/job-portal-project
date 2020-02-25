const validate=require("../validate")
const sup=require("../supplement");

function logindet(req,res){
    if(!sup.validuser(req.params.id,req.path.split('/')[1])){
        if (sup.getLogininfo()===undefined)
            res.status(401).end("Login First")
        else
            res.status(401).end(`Invalid ID token`)
        return
    }
    res.status(200).end("Welcome user "+ JSON.stringify(sup.getLogininfo()))
}

async function login(req,res){
    if (sup.getLogininfo()!==undefined)
        res.status(401).end("LOGINUSER EXISTS")
    inp={id:req.body.username ,pass:req.body.password }
    console.log(inp)
    user=req.path.split('/')[1]
    let ret;

    client=sup.dbcon()

    await client.connect()
    .then(()=>{console.log("WOHOO")})
    .then(()=>{
        let q;
        if (user==="candidate")
        { q=`Select user_id,first_name,array_agg(skills) as skills,password from personal_details,candidate_skill where username='${inp.id}'\
        and candidate_id=user_id group by(user_id,first_name,password);`}
        else
         q=`Select user_id,first_name,company,password from personal_details,recruiter where username='${inp.id}'\
        and recruiter_id=user_id ;`
        return client.query(q)})
    .then(async (result)=>{
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
    logindet,
    login,
    logout,
    tooglelogin
}