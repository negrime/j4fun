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


let keyWords = [];

let userToken = "";
let groupId = 0;

app.get('/', function (request, response) {
//    console.log(path.dirname(__filename) + '/public/index.html');
    response.send("hello");
})

app.get('/test', function (request, response) {
    response.send("sup");
})



app.get('/start-scan/:groupid&:token', function (req, res) {

    userToken = req.params.token;
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

    let url = "https://api.vk.com/method/wall.get?owner_id=-123621826&count=2&access_token=c6f2bcf7766dfb3e01e280fbfc56b4871aa9f255ecc12839442d68526c7477c3e708ce8a016c2500e85c3&v=5.52";
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(json => console.log(json));
    // axios.get(url)
    //     .then(function (response) {
    //         // handle success
    //         console.log("Request " + response.data.response);
    //         data = response.data.response.items;
    //         let post = data[0].is_pinned === 1 ? data[1] : data[0];
    //         if (post.id <= lastPostId)
    //         {
    //             console.log(post.id);
    //             return console.log("Not new post...");
    //         }
    //
    //         if (lastPostId === -1)
    //         {
    //             lastPostId = post.id;
    //             return;
    //         }
    //
    //         console.log("New post!")
    //         lastPostId = post.id;
    //         post.text = post.text.toLowerCase();
    //         let isContains = false;
    //         keyWords.forEach(item =>  {
    //             if (post.text.includes(item)){
    //                 isContains = true;
    //             }
    //         })
    //
    //         if (isContains) {
    //             console.log("sending")
    //
    //             sendMessage(groupId, post.id, "Привет world!!!", userToken);
    //             // clearInterval(scanAnimation);
    //             // scanText.innerText = "Комментарий отправлен!";
    //             // PostLinkByGroupId(textGroupId.value, post.id);
    //         }
    //     }) .catch(function (error, response) {
    //     // handle error
    //     console.log("Ошибка! " + error);
    // });
}

function sendMessage(gid, postId, message, token)
{
    let url = "https://api.vk.com/method/wall.createComment?owner_id=-"+ gid +"&post_id="+ postId +"&message=" + encodeURIComponent(message) +"&access_token=" + token + "&v=5.52";
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



