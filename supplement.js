const Client =require("pg").Client
const validate=require("./validate")


let gotdata;
let loginuser;

function getLogininfo(){
    return loginuser
}
function getDatainfo(){
    return gotdata
}
function clearLogininfo(){
    loginuser=undefined
}
function clearDatainfo(){
    gotdata=undefined
}
async function setLogininfo(obj){
    let failflag=false;
    out=await validate.validatelogin(obj)
    .catch((e)=>{
        res.status(500).end(e.message)
        failflag=true;
        })
    if (failflag)
        return
    loginuser=obj
}
async function setDatainfo(obj){
    let failflag=false;
    out=await validate.validateGotData(obj)
    .catch((e)=>{
        res.status(500).end(e.message)
        failflag=true;
        })
    if (failflag)
        return
    return gotdata=obj
}
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
    // console.log(loginuser)
    // console.log(user)
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
function filterdata(filter){
    // console.log(filter)
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
    let compute=arethmatic_comparator(last);
    if(compute){
        if (dbrowobj[filtkey.toLowerCase()] instanceof Array || filterobj[filtkey] instanceof Array)
        compute=logic_comparator
        else
        compute=(a,b)=>{return Number(a)===Number(b)}
        keyarr.push(last)
    }
    filterdbkey=keyarr.join('_')

    if (dbrowobj[filterdbkey.toLowerCase()]!==undefined)
            return compute(dbrowobj[filterdbkey.toLowerCase()],filterobj[filterkey])
        else
        throw  {name:'key error', message:`Key ${filterdbkey} is not present`}

}
function arethmatic_comparator(key_last){
    if (key_last.toLowerCase()==="isgreater")
    return (a,b)=>{return Number(a) >= Number(b)}

else if(key_last.toLowerCase()==="isless")
    return (a,b)=>{return Number(a)<= Number(b)}

else if (key_last.toLowerCase()==="isrange")
    return (a,b)=>{return Number(b[0])<=Number(a) && Number(a)<=Number(b[1])}
else
    return undefined
}
function  logic_comparator(db_attribute,filter_attribute){
    db_attribute=db_attribute[0]?db_attribute:[db_attribute]
    filter_attributefilter_attribute[0]?filter_attribute:[filter_attribute]
    
    let common=db_attribute.filter((value)=>filter_attribute.include(value))
    return common!==[]
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


module.exports={
    getDatainfo,
    setDatainfo,
    getLogininfo,
    setLogininfo,
    clearDatainfo,
    clearLogininfo,
    filterdata,
    dbcon,
    validuser
}