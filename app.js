const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  console.log(firstName, lastName, email);



const data = {
  members : [
    {
      email_address : email,
      status : "subscribed",
      merge_fields : {
        FNAME : firstName,
        LNAME : lastName
      }
    }
  ]
};
const jsonData = JSON.stringify(data);

const url = "https://us7.api.mailchimp.com/3.0/lists/17b57b87bf";
const options = {
  method: "POST",
  auth: "shanahancolin:e5ca76331a7fe41b5447ac8bb9bdc507-us7"
}
const request = https.request(url, options, function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else {
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));

  });
});

request.write(jsonData);
request.end();

});

app.post("/success", function(req, res){
  res.redirect("/");
});
app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT, function(){
  console.log("Server foud on p3t");
});

// api key
// e5ca76331a7fe41b5447ac8bb9bdc507-us7
//
