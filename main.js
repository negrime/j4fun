"use strict"

const APP_ID = "7577780";
const AUTH_LINK = "https://oauth.vk.com/authorize?client_id=" + APP_ID + "&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=offline&wall&groups&response_type=token&v=5.52";
const ACCESS_TOKEN = "91a8c8c1919e2518d118357436d0d129eb7fc1db51a2d7a1212780f9016934b9d8d4b77d001894afb552b";
const SERVICE_KEY = "8e9d9bae8e9d9bae8e9d9bae4e8eee3b1a88e9d8e9d9baed1d8a8ffd8000c37c78c8c59";

let phrases = ["Не обращай внимение на этот ублюдсикй дизайн", "Дизайн от Артемия Лебедева"];


let mainText = document.getElementById("aboveTxt").innerText = phrases[Math.floor(Math.random() * phrases.length)];
console.log("https://api.vk.com/method/wall.createComment?owner_id=-143393434&post_id=629&message=test&access_token=" + ACCESS_TOKEN + "&v=5.52");

console.log("https://api.vk.com/method/wall.get?owner_id=-143393434&count=1&message=test&access_token=" + ACCESS_TOKEN + "&v=5.52");

let textInput = document.getElementById("message");

let commentMessage = "";


textInput.oninput = function () {
    commentMessage = textInput.value;
    console.log(commentMessage);
}


setInterval(kek, 10000);

function kek()
{
    $.ajax({
        url: "https://api.vk.com/method/wall.createComment?owner_id=-143393434&post_id=629&message=" + commentMessage +"&access_token=" + ACCESS_TOKEN + "&v=5.52",
        type: 'GET',
        dataType: 'jsonp',
        success: function(data){
            console.log(data.response);
            //   data.response.items.forEach(el => console.log("https://vk.com/" +el.screen_name));
        }
    })
}


