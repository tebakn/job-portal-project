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
        skill: joi.array().items(joi.string())
    };
    return joi.validate(loginobj,schema);
}

function validateNewUser(user){

    const schema ={
        first_name: joi.string().regex(/\D/).min(5).required(),
        last_name:  joi.string().regex(/\D/).min(5).required(),
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        gender: joi.string().regex(/^[Fem,M]ale$/).required(),
        phone_number: joi.string().regex(/^\+\d{1,3} \d{3} \d{3} \d{4}$/),
        password: joi.string().required(),
        username: joi.string().required(),
        education: joi.string().regex(/\D+/),
        skills: joi.array().items(joi.string().regex(/\D+/)),
        company: joi.string().regex(/\D+/)
    };
    return joi.validate(user,schema);
}

function validatejob(jobs){
    const schema ={
        job_id: joi.number().integer().required(),
        name: joi.string().regex(/\D/).min(5).required(),
        salary: joi.number(),
        department: joi.string().required(),
        availability: joi.string().required(),
        joining_date: joi.date().required(),
        skills: joi.array().items(joi.string().regex(/\D/)).required().min(1),
        priority: joi.array().items(joi.number().min(0).max(5)).min(1),
        isopen: joi.boolean().required()
    };
    return joi.validate(jobs,schema);
}
module.exports={
    validateGotData,
    validateNewUser,
    validatelogin,
    validateJob:validatejob}