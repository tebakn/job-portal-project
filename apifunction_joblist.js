const sup=require("./supplement_joblist");



async function get_jobs(req,res){
    try{
        if(sup.getDatainfo()!==undefined && sup.getDatainfo().api==="jobs"){ 
                res.json(sup.filterdata(req.query).results)
                return
            }


        // if (req.path.split('/')[1]=="candidate"){
        //     client=sup.dbcon()
        //     await client.connect()
        //     .then(()=>console.log("WOHOO"))
        //     .then(()=>{
        //         let q=`select jobs.job_id,name,salary,department,availabilty,array_agg(skills) as required_skills,joining_date,jobs.owner_id \
        //         from jobs,job_skill where isopen='true' and jobs.job_id=job_skill.job_id and jobs.owner_id=job_skill.owner_id \
        //         group by (jobs.job_id,name,salary,department,availabilty,joining_date,jobs.owner_id) order by jobs.job_id;`;
        //         return client.query(q);
        //     })
        //     .then(async (result)=>{
        //         await sup.setDatainfo({api:"jobs",data:result.rows})
        //         res.status(200).end(JSON.stringify(sup.filterdata(req.query).results))
        //     })
        //     .catch((e)=>{throw e;})
        //     .finally(()=>client.end())
    
        // }
        }
        catch(e){
            if (e.name==="key error")
            res.status(400).end(e.message)
            else
            throw e;
           }
}

module.exports={
    get_jobs
}