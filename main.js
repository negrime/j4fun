"use strict"

const APP_ID = "7577780";
const AUTH_LINK = "https://oauth.vk.com/authorize?client_id=" + APP_ID + "&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=offline&status&wall&groups&response_type=token&v=5.52";
const ACCESS_TOKEN = "251a7ab661a33dc0eb19e7d99f4af802eccca92b7fd9a7bfe7b01b64c9359735d018fd4456d589e3c6d1e";
const SERVICE_KEY = "8e9d9bae8e9d9bae8e9d9bae4e8eee3b1a88e9d8e9d9baed1d8a8ffd8000c37c78c8c59";

let phrases = ["Не обращай внимение на этот ублюдсикй дизайн", "Дизайн от Артемия Лебедева"];

let keyWords = [];
let lastPostId = -1;
let mainText = document.getElementById("aboveTxt").innerText = phrases[Math.floor(Math.random() * phrases.length)];
console.log(AUTH_LINK);
console.log("https://api.vk.com/method/wall.createComment?owner_id=-143393434&post_id=629&message=test&access_token=" + ACCESS_TOKEN + "&v=5.52");

console.log("https://api.vk.com/method/wall.get?owner_id=-143393434&count=1&message=test&access_token=" + ACCESS_TOKEN + "&v=5.52");

let textInput = document.getElementById("message");

let textGroupId = document.getElementById("groupId");

let tokenText = document.getElementById("token");

let stopButton = document.getElementById("stop");

let keyWordsInput = document.getElementById("keyWords");
let keyWordsDisplay = document.getElementById("keyWordsDisplay");

stopButton.disabled = true;




//let button = document.getElementById("btn");
let getPostsButton = document.getElementById("getPosts");


console.log(getPostsButton);

let postsChecker;
getPostsButton.onclick = function() {
    getPostsButton.disabled = true;
    stopButton.disabled = false;
    postsChecker = setInterval(checkLastPost, 5000);
}

textGroupId.oninput = function() {
    textGroupId.value = textGroupId.value.trim();
}

stopButton.onclick = function() {
    clearInterval(postsChecker);
    stopButton.disabled = true;
    getPostsButton.disabled = false;
}



let commentMessage = "";


textInput.oninput = function () {
    commentMessage = textInput.value;
}

keyWordsInput.oninput = function () {
    if (keyWordsInput.value.includes(";")) {
        keyWords.push(keyWordsInput.value.replace(";","").toLowerCase());
        keyWordsDisplay.innerText += " " + keyWordsInput.value.replace(";", "");
        keyWordsInput.value = "";
    }
}


function checkLastPost() {
    $.ajax({
        url: "https://api.vk.com/method/wall.get?owner_id=-123621826&count=2&access_token=3eeedc3485db29b3835fc86ab9a8cd4da0ae054bdf51503d459fd82e99306c649c94a2a20fae8f1549745&v=5.52",
        type: 'GET',
        dataType: 'jsonp',
        success: function(data){
            let post = data.response.items[0].is_pinned === 1 ? data.response.items[1] : data.response.items[0];
            if (post.id <= lastPostId)
            {
                console.log(post);
                return console.log("Not new post...");
            }

            if (lastPostId === -1)
            {
                lastPostId = post.id;
                return;
            }

            lastPostId = post.id;
            post.text = post.text.toLowerCase();
            let isContains = false;
            keyWords.forEach(item =>  {
                isContains = post.text.includes(item);
            })

            if (isContains) {
                sendMessage(post.id);
            }

        }
    })
}

function sendMessage(postId)
{
    $.ajax({
        url: "https://api.vk.com/method/wall.createComment?owner_id=-"+ textGroupId.value +"&post_id="+ postId +"&message=" + encodeURIComponent(commentMessage) +"&access_token=" + tokenText.value + "&v=5.52",
        type: 'GET',
        dataType: 'jsonp',
        success: function(data){
            console.log(data.response);
            //   data.response.items.forEach(el => console.log("https://vk.com/" +el.screen_name));
        }
    })
}

function showToken() {
    console.log(ACCESS_TOKEN);
}


