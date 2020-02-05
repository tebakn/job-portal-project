# job-portal-project


job_id       | integer               |           | not null | 
 name         | character varying(50) |           | not null | 
 salary       | character varying(50) |           |          | 
 department   | character varying(50) |           | not null | 
 availabilty  | character varying(50) |           | not null | 
 joining_date | date                  |           | not null | 
 skills       | character varying(50) |           | not null | 
 isopen       | character varying(5)  |           | not null | true
 owner_id   

candidate_id | integer               |           | not null | 
 cv           | character varying(50) |           |          | 
 skills       | character varying(50) | 


 recruiter_id | integer               |           | not null | 
 company      | character varying(50) |           | not null |

 user_id      | integer               |           | not null | 
 first_name   | character varying(50) |           | not null | 
 last_name    | character varying(50) |           | not null | 
 email        | character varying(50) |           |          | 
 gender       | character varying(50) |           | not null | 
 phone_number | character varying(50) |           | not null | 
 password     | character varying(50) |           | not null | 
 username     | character varying(50) |           | not null | 
 education    | character varying(50)

 job_id       | integer               |           | not null | 
 candidate_id | integer               |           | not null | 
 status       | character varying(50) |  