
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let supp=require('../supplement')
//var app = express();
chai.use(chaiHttp);
//Our parent block
describe('ADM', () => {
    before((done) => { //Before each test we empty the database
        chai.request(server)
              .get('/toogleadm')
              .end((req,res)=>{
                res.should.have.status(200)  
                console.log(res.status)
                done();
            });
        });
    })  
   describe('/GET admin id', () => {
        it('candidate with id', (done) => {
          chai.request(server)
              .get('/')
              .end((err, res) => {
                    res.should.have.status(200);
                    console.log(res.body)
                    //res.body.should.be.a('string');
                    
                done();
              });
        });
    });
