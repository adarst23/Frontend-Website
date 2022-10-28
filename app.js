const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));


app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

app.post("/news", function(request, response){

    const email = request.body.mail;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed"
                
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/1de98441ac";
    const Option = {
        method: "POST",
        auth: "adarsh:" + process.env.API_KEY1
    }
    
    const rest = https.request(url, Option, function(res){

        if (res.statusCode == 200) {
            response.sendFile(__dirname + "/success.html");
        }
        else{
            response.sendFile(__dirname + "/failure.html");
        }
        
        res.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    rest.write(jsonData);
    rest.end();
});


app.post("/enroll", function(request, response){

    const firstName1 = request.body.fName;
    const lastName1 = request.body.lName;
    const email1 = request.body.email1;
    const cont = request.body.contact;

    const data = {
        members: [
            {
                email_address: email1,
                status: "subscribed",
                merge_fields: {
                    PHONE: cont,
                    FNAME: firstName1,
                    LNAME: lastName1
                }
            }
        ]
    };

    const jsonData1 = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/2c8644b4ac";
    const Option = {
        method: "POST",
        auth: "adarsht:" + process.env.API_KEY2
    }
    
    const rest = https.request(url, Option, function(res){

        response.sendFile(__dirname + "/enrollment.html");

        res.on("data", function(data){
            // console.log(JSON.parse(data));
        });
    });

    rest.write(jsonData1);
    rest.end();
});

app.post("/failure", function(request, response){
    response.redirect("/");
})

app.listen(process.env.PORT || 3000, function(request, response){
    console.log("Server is up & running at port 3000");
});




