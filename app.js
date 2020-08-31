const request = require('request');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');




let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


const PORT = process.env.PORT || 8080;
let lastPostId = -1;


let keyWords = ["тест"];

let userToken = "";
let groupId = 0;

app.get('/', function (request, response) {
//    console.log(path.dirname(__filename) + '/public/index.html');
    response.send("hello");
})

app.get('/test', function (request, response) {
 //   response.send("sup");

    let url = "https://oauth.vk.com/authorize?client_id=7583370&display=page&redirect_uri=https://enigmatic-beach-30487.herokuapp.com/best&scope=wall,offline,email,groups&response_type=code&v=5.122";

      //  fetch(url)
           // .then(res => res.json())
     //       .then((res) => console.log(res));

        response.redirect(url);
})

app.get('/best', function (request, response) {
    console.log("Best");
    //console.log(request.params);
    console.log(request.query.code);
 //   console.log(response)

    let url = "https://oauth.vk.com/access_token?client_id=7583370&client_secret=nM768w7byjfoNbkQ1F5d&redirect_uri=https://enigmatic-beach-30487.herokuapp.com/best&code="+ request.query.code;
    fetch(url)
        .then(res => res.json())
        .then(json => {console.log(json); userToken = json.access_token });
    response.sendStatus(200);
})


app.get('/success', function (request, response) {
    response.sendStatus(201);
})


app.get('/start-scan/:groupid', function (req, res) {

    //userToken = req.params.token;
    groupId = req.params.groupid;
    res.send("Start scanning");


    setInterval(checkLastPost, 5000);



})


app.post('/keywords', function (req, res) {
    keyWords.push(req.body.value)
    res.send(keyWords);
})

app.get('/get-keywords', function (req, res) {
    res.send(keyWords);
})

app.listen(PORT, function () {
    console.log("Server started");
    console.log(PORT);
})

function checkLastPost() {

    let url = "https://api.vk.com/method/wall.get?owner_id=-123621826&count=2&access_token=" + "78d01f63a3e960150de70c20673c9b67a8af31215772b25e2e4ffc7068dd38942ca8f90bb3c3f8360cdc6"+"&v=5.52";
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(json => json.response.items)
        .then(data => {
            let post = data[0].is_pinned === 1 ? data[1] : data[0];
            if (post.id <= lastPostId)
            {
                console.log(post.id);
                return console.log("Not new post...");
            }

            if (lastPostId === -1)
            {
                lastPostId = post.id;
                return;
            }

            console.log("New post!")
            lastPostId = post.id;
            post.text = post.text.toLowerCase();
            let isContains = false;
            keyWords.forEach(item =>  {
                if (post.text.includes(item)){
                    isContains = true;
                }
            })

            if (isContains) {
                console.log("sending")

                sendMessage(groupId, post.id, "Привет world!!!", userToken);
                // clearInterval(scanAnimation);
                // scanText.innerText = "Комментарий отправлен!";
                // PostLinkByGroupId(textGroupId.value, post.id);
            }
        }) .catch(function (error, response) {
        // handle error
        console.log("Ошибка! " + error);
        });
    // axios.get(url)
    //     .then(function (response) {
    //         // handle success
    //         console.log("Request " + response.data.response);
    //         data = response.data.response.items;

    // });
}

function sendMessage(gid, postId, message, token)
{
    let url = "https://api.vk.com/method/wall.createComment?owner_id=-"+ gid +"&post_id="+ postId +"&message=" + encodeURIComponent(message) +"&access_token=" + "b80858c9a296e2ec2133c6abe2cf4ace1f78f2b0cf1969c2e2a8972e25a6594c5c0b94f80eb8c522135b4" + "&v=5.52";
    console.log(url);
    axios.get(url)
        .then(function (response) {
            console.log(response.data);
        });

    // $.ajax({
    //     url: "https://api.vk.com/method/wall.createComment?owner_id=-"+ gid +"&post_id="+ postId +"&message=" + encodeURIComponent(message) +"&access_token=" + token + "&v=5.52",
    //     type: 'GET',
    //     dataType: 'jsonp',
    //     success: function(data){
    //         console.log(data.response);
    //         //   data.response.items.forEach(el => console.log("https://vk.com/" +el.screen_name));
    //     }
    // })
}

function PostLinkByGroupId(groupId, postId) {

    $.ajax({
        url: "https://api.vk.com/method/groups.getById?group_id="+ groupId +"&access_token=" + tokenText.value + "&v=5.52",
        type: 'GET',
        dataType: 'jsonp',
        success: function(data){
            console.log(data.response);
            linkToPost.style.display = "inline";
            linkToPost.href = "https://vk.com/"+ data.response[0].screen_name +"?w=wall-"+ groupId +"_" + postId;
        }
    })
}



