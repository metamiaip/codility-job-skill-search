const express = require('express');
const app = express();

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
 app.post('/add_candidate', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Add candidate');
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
 // This responds a GET request for abcd, abxcd, ab123cd, and so on
 /*
 app.get('/ab*cd', function(req, res) {   
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
 })
*/

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


app.listen(3000, () => {
    console.log(`Express started on port 3000`);
    
    
  });
