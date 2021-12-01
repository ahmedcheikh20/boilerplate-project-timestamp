// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
}); 
let resObject = {}

app.get("/api/:date?", function (req, res) {
  let input = req.params.date
  console.log(input)
  if(!input){
    resObject['unix'] = new Date().getTime()
    resObject['utc'] = new Date().toUTCString()
  }
  
  else if(input.includes('-')){
    resObject['unix'] = new Date(input).getTime()
    resObject['utc'] = new Date(input).toUTCString()

  }
 else if(typeof Number(input) === 'number'){
    console.log('heelo')
    resObject['unix'] = new Date(Number(input)).getTime()
    resObject['utc'] = new Date(Number(input)).toUTCString()
    }
  if(!resObject.unix || !resObject.utc){
    res.json({ error : "Invalid Date" })
  }  
  res.json(resObject)
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
