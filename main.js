"use strict"

const APP_ID = "7577780";
const AUTH_LINK = "https://oauth.vk.com/authorize?client_id=" + APP_ID + "&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=offline&status&wall&groups&response_type=token&v=5.52";
const ACCESS_TOKEN = "251a7ab661a33dc0eb19e7d99f4af802eccca92b7fd9a7bfe7b01b64c9359735d018fd4456d589e3c6d1e";
const SERVICE_KEY = "8e9d9bae8e9d9bae8e9d9bae4e8eee3b1a88e9d8e9d9baed1d8a8ffd8000c37c78c8c59";

let phrases = ["Не обращай внимение на этот ублюдсикй дизайн", "Дизайн от Артемия Лебедева"];


let mainText = document.getElementById("aboveTxt").innerText = phrases[Math.floor(Math.random() * phrases.length)];
console.log(AUTH_LINK);
console.log("https://api.vk.com/method/wall.createComment?owner_id=-143393434&post_id=629&message=test&access_token=" + ACCESS_TOKEN + "&v=5.52");

console.log("https://api.vk.com/method/wall.get?owner_id=-143393434&count=1&message=test&access_token=" + ACCESS_TOKEN + "&v=5.52");

let textInput = document.getElementById("message");

let tokenText = document.getElementById("token");
console.log(tokenText);

let button = document.getElementById("btn");

button.onclick = function() {
    kek();
}



let commentMessage = "";


textInput.oninput = function () {
    commentMessage = textInput.value;
}




function kek()
{
    $.ajax({
        url: "https://api.vk.com/method/wall.createComment?owner_id=-143393434&post_id=625&message=" + commentMessage +"&access_token=" + tokenText.value + "&v=5.52",
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


