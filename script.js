"use strict";

let block = document.getElementById('first');

function infoServer(){
    let newRequest = new XMLHttpRequest();
    newRequest.open("GET", "https://jsonplaceholder.typicode.com/posts");
    newRequest.addEventListener("load", function(){

        let dataJS = JSON.parse(newRequest.responseText);
        console.log(dataJS);

        dataJS.forEach(x => {
            createNewDiv(x);
        });
    });
    newRequest.send();
}


function createNewDiv(x){
    const parentBlock = document.createElement('div');
    parentBlock.classList.add('posts-wrap');

    const mainInfo = document.createElement('h3');
    mainInfo.classList.add('header-1');
    mainInfo.textContent = x.id;
    
    const article = document.createElement('p');
    article.classList.add('header-2');
    article.textContent = x.title;

    parentBlock.appendChild(mainInfo);
    parentBlock.appendChild(article);

    block.appendChild(parentBlock);
    console.log(parentBlock);
}

infoServer();