// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
app.listen(port,listening);
function listening(){
    console.log(`server running on localhost:${port}`);
};


// response to the post request from the client side and adding the specific information to the porject data
app.post("/posting",(req,res)=>{
    projectData = {
        date: req.body.date,
        temperature: req.body.temperature,
        feeling: req.body.feeling,
        description:req.body.description,
        icon:req.body.icon
    };
    res.send(req.body);
    console.log(projectData);
});
// response to the get request from the client side and send the data to the client side
app.get("/get",(req,res)=>{
    res.send(projectData);
    console.log(projectData);
})
