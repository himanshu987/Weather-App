 const request = require('request');
// const argv = require('yargs').argv;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}));

let apiKey = 'acc0342c2160422a2695cc4c803377aa';



app.get('/',function(req,res){
  res.render('index',{weather: null, error: null});
});

app.post('/',function(req,res){
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else{
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
  // res.render('index');
  // console.log(req.body.city);https://api.teleport.org/api/cities/?search=san%20francisco
});


app.listen(3001,function(){
  console.log('listening on port 3001');
});
