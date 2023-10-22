const https = require('https');
const express = require('express');
const bodyText = require('body-parser')



const app = express();
app.use(bodyText.urlencoded({extended:true})); //To use body parser with post request

//include all static files so we can use CSS
app.use(express.static( __dirname + '/public'));


//main page
app.get("/", function(req,res) {
	res.sendFile(__dirname +"/public/index.html" );
});

// Display the information when there is post request
app.post("/", async function(request,_res) {
  let city = request.body.city;   
  
  if(!city){
    return _res.sendFile(__dirname +"/public/index.html" );
  }

  //Get the weather 
  const options = {
    hostname: 'openweather43.p.rapidapi.com',
    path: '/weather?q=' + city + '&appid=da0f9c8d90bde7e619c3ec47766a42f4&units=standard',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7d3e5eac64msh4429df536f2888fp1989a5jsn7369e0859ebf',
      'X-RapidAPI-Host': 'openweather43.p.rapidapi.com',
    },
  };

  
  const req = https.request(options, (res) => {
    let data = '';
  
    res.on('data', (chunk) => {
      data += chunk;
    });
  
    res.on('end', () => {
      console.log(data);
      _res.send(data); 
      // You can send the data as a response to an HTTP request here
    });
  });
  
  req.on('error', (error) => {
    _res.send(error); 
    console.error(error);
  });
  
  req.end();
  
 

  


});

let port = process.env.PORT || 8002;
app.listen(port, function() {
    console.log ("Server running on port 8002");
})
