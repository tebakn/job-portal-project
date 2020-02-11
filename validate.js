joi=require('joi')
//.extend(require('@hapi/joi-date'));

function validateCandidate(customer){
    const schema ={
        username: joi.string().min(3).max(30).required(),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        email: joi.string().email({ minDomainAtoms: 2 }),
        phoneno: joi.number()
    };
    return joi.validate(customer,schema);
}
function validateRecruiter(recruiter){
    const schema1 ={
        username: joi.string().min(3).max(30).required(),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        email: joi.string().email({ minDomainAtoms: 2 }),
        phoneno: joi.number()
    };
    return joi.validate(recruiter,schema);
}
function validatelogin(company){
    const schema2 ={
        company_id: joi.number().integer(),
        company_name: Joi.string().min(3).max(30).required(),
        description: joi.string()
    };
    return joi.validate(company,schema);
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
    validateJob:validatejob}