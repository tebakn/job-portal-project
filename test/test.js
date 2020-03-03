let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let supp=require('../supplement')
//var app = express();
chai.use(chaiHttp);


describe('/GET without login', () => {
    it('Should return login first with status 401', (done) => {
      chai.request(server)
          .get('/candidate/44')
          .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.equal('Login First');
                
            done();
          });
    });
});



describe('ADM', () => {
    before((done) => { 
        chai.request(server)
              .get('/toogleadm')
              .end((req,res)=>{
                res.should.have.status(200)  
                done();
            });
        });
  

   describe('/GET admin id', () => {
        it('Welcome user with code 200', (done) => {
          chai.request(server)
              .get('/candidate/44')
              .end((err, res) => {
                    res.should.have.status(200);
                          console.log(res.text)
                    res.text.should.be.a('string');
                    
                done();
              });
        });
    });



    describe('/GET jobs and applications', () => {
      let delappflag=false;
      let deljobflag=false;
      it('Display applications with code 200',(done) => {
        chai.request(server)
            .get('/candidate/2/applications?job_id=56')
            .end((err, res) => {
                  res.should.have.status(200);
                        console.log(res.text)
                  JSON.parse(res.text).should.be.a('array');
                  if (JSON.parse(res.text).length !== 0)
                      delappflag=true;
                      console.log(delappflag)

              done();
            });
          });

      console.log(delappflag)
        it('delete application code 200 if exists ', (done) => {

          chai.request(server)
              .delete('/candidate/2/applications/56:119')
              .end((err, res) => {
                    res.should.have.status(200);
                          console.log(res.text)
                done();
              });
        });




        it('Display jobs with code 200', (done) => {
          chai.request(server)
              .get('/recruiter/119/jobs?job_id=56')
              .end((err, res) => {
                    res.should.have.status(200);
                          console.log(res.text)
                    JSON.parse(res.text).should.be.a('array');
                    if (JSON.parse(res.text).length !== 0)
                        deljobflag=true;
                done();
              });
        });
          it('delete job if exists with code 200', (done) => {

            chai.request(server)
                .delete('/recruiter/119/jobs/56')
                .end((err, res) => {
                      res.should.have.status(200);
                            console.log(res.text)
                  done();
                });
          });


            it('Display applications with code 200', (done) => {
          chai.request(server)
              .get('/candidate/3/applications')
              .end((err, res) => {
                    res.should.have.status(200);
                          console.log(res.text)
                    JSON.parse(res.text).should.be.a('array');
                    
                done();
              });
        });
    })
    describe('logout', () => {
        it('logout', (done) => {
          chai.request(server)
              .get('/toogleadm')
              .end((err, res) => {
                    res.should.have.status(200);
                done();
              });
        });
    });
})




describe('login recruiter', () => {
  before("return user id with code 200",(done) => { 
      chai.request(server)
            .post('/recruiter')
            .type('JSON')
            .send({
                'username':'gglanz3a',
                "password":"z2tSMCID82XW"
            })
            .end((req,res)=>{
              res.should.have.status(200)
              res.text.should.be.equal('User 119')  
              done();
          });
      });
      
      
  describe('/GET details of user', () => {
      it('welcome user with id and name', (done) => {
        chai.request(server)
            .get('/recruiter/119')
            .end((err, res) => {
                  res.should.have.status(200);
                        console.log(res.text)
                  res.text.should.be.equal('Welcome user {"id":119,"company":"Jaloo","name":"Goober"}');
              done();
            });
      });
      it('wrong user id', (done) => {
          chai.request(server)
              .get('/candidate/5')
              .end((err, res) => {
                    res.should.have.status(401);
                          console.log(res.text)
                    res.text.should.be.a('string');
                    
                done();
              });
        });
      
  });
  describe('post job', () => {
      it('return error with validation 1', (done) => {
        chai.request(server)
            .post('/recruiter/119/jobs/')
            .type('JSON')
            .send({
              'job_id': '56',
              'name': 'firstjob',
              'deparent': 'it',
              'availability': '10',
              'joining_date': '2020/03/01',
              'skills': 'JAVA',
              'priority': 5,
              'isopen': 'true'
            })
            .end((err, res) => {
                  res.should.have.status(400);
                        console.log(res.text)
                  res.text.should.be.a('string');
                  
              done();
            });})

      it('return error with validation 2', (done) => {
            chai.request(server)
            .post('/recruiter/119/jobs/')
            .type('JSON')
            .send({
              'job_id': '56',
              'name': 'firstjob',
              'department': 'it',
              'availability': '10',
              'joining_date': '2020/03/01',
              'skills': 'JAVA',
              'priority': 5,
              'isopen': 'true'
            })
            .end((err, res) => {
                  res.should.have.status(400);
                        console.log(res.text)
                  res.text.should.be.a('string');
                  
              done();
            });})

      it('return error with validation 3', (done) => {
            chai.request(server)
            .post('/recruiter/119/jobs/')
            .type('JSON')
            .send({
              'job_id': '56',
              'name': 'firstjob',
              'department': 'it',
              'availability': '10',
              'joining_date': '2020/03/01',
              'skills': ['JAVA','Python'],
              'priority': 5,
              'isopen': 'true'
            })
            .end((err, res) => {
                  res.should.have.status(400);
                        console.log(res.text)
                  res.text.should.be.a('string');
                  
              done();
            });})

      it('return error with validation 4', (done) => {
            chai.request(server)
            .post('/recruiter/119/jobs/')
            .type('JSON')
            .send({
              'job_id': '56',
              'name': 'firstjob',
              'department': 'it',
              'availability': '10',
              'joining_date': '2020/03/01',
              'skills': ['JAVA','python'],
              'priority': [5],
              'isopen': 'true'
            })
            .end((err, res) => {
                  res.should.have.status(400);
                        console.log(res.text)
                  res.text.should.be.a('string');
                  
              done();
            });})

      it('Transaction rolls back as only 1 table gets updated', (done) => {
        chai.request(server)
            .post('/recruiter/119/jobs/')
            .type('JSON')
            .send({
              'job_id': '56',
              'name': 'firstjob',
              'department': 'it',
              'availability': '10',
              'joining_date': '2020/03/01',
              'skills': ['JAVA','JAVA'],
              'priority': [5,3],
              'isopen': 'true'
            })
            .end((err, res) => {
                  res.should.have.status(400);
                        console.log(res.text)
                  res.text.should.be.a('string');
                  
              done();
            });
          })



      it('return job id inserted', (done) => {
          chai.request(server)
              .post('/recruiter/119/jobs/')
              .type('JSON')
              .send({
                'job_id': '56',
                'name': 'firstjob',
                'department': 'it',
                'availability': '10',
                'joining_date': '2020/03/01',
                'skills': ['JAVA'],
                'priority':[3],
                'isopen': 'true'
              })
              .end((err, res) => {
                    res.should.have.status(201);
                          console.log(res.text)
                    res.text.should.be.equal('Job inserted with ID 56');
                    
                done();
              });
        });
      it('error as the job is already inserted with status 400', (done) => {
          chai.request(server)
              .post('/recruiter/119/jobs/')
              .type('JSON')
              .send({
                'job_id': '56',
                'name': 'firstjob',
                'department': 'it',
                'availability': '10',
                'joining_date': '2020/03/01',
                'skills': ['JAVA'],
                'priority': [4],
                'isopen': 'true'
              })
              .end((err, res) => {
                    res.should.have.status(400);
                          console.log(res.text)
                    res.text.should.be.equal("Job id exists");
                    
                done();
              });
              });

    describe('logout', () => {
    it('logout', (done) => {
      chai.request(server)
          .get('/logout')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
});
})})







describe('login candidate', () => {
before("return user id with code 200",(done) => { 
    chai.request(server)
          .post('/candidate')
          .type('JSON')
          .send({
              'username':'rbrinicombe1',
              "password":"wiBBQmrYY"
          })
          .end((req,res)=>{
            res.should.have.status(200)
            res.text.should.be.equal('User 2')  
            done();
        });
    });

describe('/GET details of user', () => {
    it('welcome user with id and name', (done) => {
      chai.request(server)
          .get('/candidate/2')
          .end((err, res) => {
                res.should.have.status(200);
                      console.log(res.text)
                res.text.should.be.equal('Welcome user {"id":2,"skill":["Aspen HYSYS","XSS","Light Rail","DHTML","Summation iBlaze"],"name":"Reese"}');
                
            done();
          });
    });
    it('wrong user id', (done) => {
        chai.request(server)
            .get('/candidate/5')
            .end((err, res) => {
                  res.should.have.status(401);
                        console.log(res.text)
                  res.text.should.be.a('string');
                  
              done();
            });
      });
    
});
describe('apply for job', () => {
    it('return candidate id and job id inserted', (done) => {
      chai.request(server)
          .post('/candidate/2/jobs/56:119')
          .end((err, res) => {
                res.should.have.status(201);
                      console.log(res.text)
                res.text.should.be.equal('created new application for (56:119,2)');
                
            done();
          });
    });
    it('error as the application is already inserted with status 400', (done) => {
        chai.request(server)
            .post('/candidate/2/jobs/56:119')
            .end((err, res) => {
                  res.should.have.status(400);
                  res.text.should.be.equal('application exists')
                                    
              done();
            });
      });
    it('error as the job id is wrong  status 400', (done) => {
        chai.request(server)
            .post('/candidate/2/jobs/000:11')
            .end((err, res) => {
                  res.should.have.status(400);
                  res.text.should.be.equal('incorrect job id')                  
              done();
            });
      });
})
describe('logout', () => {
    it('logout', (done) => {
      chai.request(server)
          .get('/logout')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
});

})


    