const express = require('express');
const app = express();
app.use(express.json());

const candidatesArr = [
    {id: 1, name: "John", skills:["java","python","nodejs","mongodb"]},
    {id: 2, name: "May", skills:["go","ruby","c#","c++"]},
    {id: 3, name: "Peter", skills:["java","angular","react","vuejs"]},
];
// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Welcome to candidate skill search page');
 })
 
 // This responds a POST request for the homepage
 /*
req.body - put the following in postman body part
{
   "name": "xxx",
   "skills": ["java","vbnet","ruby"]
}
 */
 app.post('/add_candidate', function (req, res) {
    console.log("Got a POST request for the homepage");
    const id = getNextCandidateId();
    console.log(id);
    console.log(req.body);
    
    const newCandidate = {id:0, name:"", skills:[]};
    newCandidate.id = id;
    newCandidate.name = req.body.name;
    newCandidate.skills = req.body.skills;
    candidatesArr.push(newCandidate);
    res.send(newCandidate);
 })
 
 // This responds a DELETE request for the /del_user page.
 app.delete('/del_candidate', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Delete candidate');
 })
 
 // This responds a GET request for the /list_user page.
 app.get('/list_candidate', function (req, res) {
    console.log("Got a GET request for /list_candidate");
    if (res.statusCode === 200) {
        res.send(candidatesArr);
    }
    else 
        res.send('Error');
 })

 app.get('/search_candidate', function (req, res) {
    console.log("Got a GET request for /search_candidate");
    //console.log(req.query);
    //console.log(req.query.skills.split(','));
    const searchSkills = req.query.skills.split(',');
    //console.log(searchSkills);
    const candidateWithScore = getCandidateWithScore(searchSkills);
    candidateWithScore.sort((a,b) => b.score - a.score);
    //console.log(candidateWithScore);
    res.send(candidateWithScore[0]);
 })

const getCandidateWithScore = (skills) => candidatesArr.map( (candidate) => {
   candidate.score = 0;
   for (let i=0; i<candidate.skills.length; i++) {
       for (let j=0; j<skills.length; j++) {
           if (candidate.skills[i] == skills[j]) {
               candidate.score++;
           }
       }
   }
   return candidate;
});

const getNextCandidateId = () => {
   const cloneArr = candidatesArr.slice(0);
   const getMaxCandidateId = () => cloneArr.sort((a,b) => b.id - a.id);
   const getMaxCId = getMaxCandidateId()[0].id;
   return getMaxCId != null? getMaxCId + 1:0;
}

app.listen(3000, () => {
    console.log(`Express started on port 3000`);
    
    
  });
