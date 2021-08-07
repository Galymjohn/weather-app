const express = require("express")
const https = require("https")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "baa4ff9f9208a2cf2353c19542ac11a8"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description

            
            const icon = weatherData.weather[0].icon
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            

            res.write("<h1>The Temperature in " + query + " is " + temp + " C.</h1>"); //can use only one res methood per get or other.
            //can have multiple res.write('') 
            res.write("<img src=" + iconURL + ">")
            res.write( "<h2>The weather is currently " + weatherDescription + ".</h2>")
            res.send()
        })
    })
})


 app.listen(5000, function(){
     console.log("Server is running on port 5000.")
 })


// const express = require("express")
// const https = require("https")

// const app = express();

// app.get("/", function(req, res){

//     const query = "London"
//     const apiKey = "baa4ff9f9208a2cf2353c19542ac11a8"
//     const unit = "metric"
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
//     https.get(url, function(response){
//         console.log(response.statusCode);

//         response.on("data", function(data){
//             const weatherData = JSON.parse(data)
//             const temp = weatherData.main.temp
//             const weatherDescription = weatherData.weather[0].description

            
//             const icon = weatherData.weather[0].icon
//             const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            

//             res.write("<h1>The Temperature in Chicago is " + temp + " C.</h1>"); //can use only one res methood per get or other.
//             //can have multiple res.write('') 
//             res.write("<img src=" + iconURL + ">")
//             res.write( "<h2>The weather is currently " + weatherDescription + ".</h2>")
//             res.send()
//         })
//     })
// })

//  app.listen(5000, function(){
//      console.log("Server is running on port 5000.")
//  })