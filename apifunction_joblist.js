const sup=require("./supplement_joblist");



async function get_jobs(req,res,logger){
    try{
        if(sup.getDatainfo()!==undefined && sup.getDatainfo().api==="jobs"){
                logger.info(`Request from ${req.originalUrl} on ${new Date()}`)
                logger.info(req.query) 
                res.json(sup.filterdata(req.query))
                return
            }

        }
        catch(e){
            
            if (e.name==="key error"){
                logger.warn(e.name+": "+e.message)
                res.status(400).end(e.message)
            }
            else{
                logger.error("Error" + e)
                throw e;
        }
           }
}

module.exports={
    get_jobs
}