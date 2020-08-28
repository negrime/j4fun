"use strict"


const APP_ID = "7577780";
let phrases = ["Не обращай внимания на этот ублюдсикй дизайн", "Дизайн от Артемия Лебедева"];

let keyWords = [];
let lastPostId = -1;
let commentMessage = "";

document.getElementById("aboveTxt").innerText = phrases[Math.floor(Math.random() * phrases.length)];
let textInput = document.getElementById("message");
let textGroupId = document.getElementById("groupId");
let tokenText = document.getElementById("token");
let stopButton = document.getElementById("stop");
let keyWordsInput = document.getElementById("keyWords");
let keyWordsDisplay = document.getElementById("keyWordsDisplay");
let getPostsButton = document.getElementById("getPosts");
let scanText = document.getElementById("scan");
let linkToPost = document.getElementById("linkToPost");


let postsChecker;
let scanAnimation;

console.log(scanText);

stopButton.disabled = true;
scanText.style.display = "none";
linkToPost.style.display = "none";

getPostsButton.onclick = function() {
    linkToPost.style.display = "none";
    scanText.innerText = "Сканирую";
    scanText.style.display = "inline";
    getPostsButton.disabled = true;
    stopButton.disabled = false;
    checkLastPost();
    postsChecker = setInterval(checkLastPost, 5000);

    let dotIndex = 0;
    scanAnimation = setInterval(() => {
        dotIndex++;
        scanText.innerText += ".";
            if (dotIndex > 3) {
                scanText.innerText = "Сканирую";
                dotIndex = 0;
            }
    }, 500)
}

textGroupId.oninput = function() {
    textGroupId.value = textGroupId.value.trim();
}

stopButton.onclick = function() {
    scanText.style.display = "none";
    clearInterval(postsChecker);
    clearInterval(scanAnimation);
    stopButton.disabled = true;
    getPostsButton.disabled = false;
}

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
                clearInterval(scanAnimation);
                scanText.innerText = "Комментарий отправлен!";
                PostLinkByGroupId(textGroupId.value, post.id);
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


