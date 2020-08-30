const request = require('request');
const express = require('express');


let app = express();


app.get('/', function (request, response) {
    response.send("Hello world!!!");
})


app.get('/test/:groupid&:token', function (req, res) {
    // setInterval(functionnoide () {
    //     request('https://api.vk.com/method/wall.get?owner_id=-"+ textGroupId.value +"&count=2&access_token="+ tokenText.value +"&v=5.52', { json: true }, (err, res, body) => {
    //         if (err) { return console.log(err); }
    //         console.log(body.url);
    //         console.log(body.explanation);
    //     });
    // }, 1000)
    console.log(req.params);
    res.send(req.params);
})


app.listen(8080, function () {
    console.log("Server started");
})


