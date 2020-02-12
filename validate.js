joi=require('joi')
//.extend(require('@hapi/joi-date'));

// function validateCandidate(customer){
//     const schema ={
//         username: joi.string().min(3).max(30).required(),
//         password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
//         email: joi.string().email({ minDomainAtoms: 2 }),
//         phoneno: joi.number()
//     };
//     return joi.validate(customer,schema);
// }
// function validateRecruiter(recruiter){
//     const schema ={
//         username: joi.string().min(3).max(30).required(),
//         password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
//         email: joi.string().email({ minDomainAtoms: 2 }),
//         phoneno: joi.number()
//     };
//     return joi.validate(recruiter,schema);
// }
function validateGotData(dataobj){
    const schema ={
        api: joi.string().required(),
        data: joi.array().required()
    };
    return joi.validate(dataobj,schema);

}
function validatelogin(loginobj){
    const schema ={
        id: joi.number().integer(),
        name: joi.string().required(),
        company: joi.string(),
        skill: joi.string()
    };
    return joi.validate(loginobj,schema);
} 
function validatejob(jobs){
    const schema ={
        job_id: joi.number().integer().required(),
        name: joi.string().min(5).required(),
        salary: joi.number(),
        department: joi.string().required(),
        availability: joi.string().required(),
        joining_date: joi.date().required(),
        skills: joi.string().required(),
        isopen: joi.boolean().required()
    };
    return joi.validate(jobs,schema);
}
module.exports={
    validateGotData,
    validatelogin,
    validateJob:validatejob}