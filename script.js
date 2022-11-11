"use strict";

let block = document.getElementById("first");
let overlay = document.getElementById("overlay");
let content = document.getElementById("content");
let close = document.getElementById("close");
let addPOst = document.getElementById("addPost");
let addOverlay = document.getElementById("addOverlay");
let form = document.getElementById("form");
let buttonAdd = document.getElementById("add-post-btn");
let input = document.getElementById("titlepost");

function infoServer(url, callback) {
  let newRequest = new XMLHttpRequest();
  newRequest.open("GET", url);
  newRequest.addEventListener("load", function () {
    let dataJS = JSON.parse(newRequest.responseText);

    callback(dataJS);
  });
  newRequest.send();
}

infoServer("https://jsonplaceholder.typicode.com/posts", function (dataJS) {
  dataJS.forEach((x) => {
    createNewDiv(x);
  });
});

function createNewDiv(x) {
  const parentBlock = document.createElement("div");
  parentBlock.classList.add("posts-wrap");
  parentBlock.setAttribute("data-id", x.id);

  const mainInfo = document.createElement("h3");
  mainInfo.classList.add("header-1");
  mainInfo.textContent = x.id;

  const article = document.createElement("p");
  article.classList.add("header-2");
  article.textContent = x.title;

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "delete this post";
  deleteButton.classList.add("delbutton");

  // BUTTON CLICK
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    let id = event.target.getAttribute("data-id");
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    fetch(url, {
      method: "DELETE",
    }).then(() => parentBlock.remove());
  });

  // DIV CLICK
  parentBlock.addEventListener("click", function (event) {
    const id = event.target.getAttribute("data-id");
    overlay.classList.add("active");
    document.getElementById("close").classList.add("close-plus");
    let link = `https://jsonplaceholder.typicode.com/posts/${id}`;
    infoServer(link, function (dataJS) {
      overlayFunction(dataJS);
    });
  });

  parentBlock.appendChild(mainInfo);
  parentBlock.appendChild(article);
  parentBlock.appendChild(deleteButton);

  block.appendChild(parentBlock);
  console.log(parentBlock);
}

function overlayFunction(x) {
  let description = document.createElement("p");
  description.classList.add("paragraph");
  description.textContent = x.body;

  content.appendChild(description);
}

close.addEventListener("click", function () {
  overlay.classList.remove("active");
  content.innerHTML = "";
  close.classList.remove("close-plus");
  addOverlay.classList.remove("overlay-add-active");
});

addPOst.addEventListener("click", function () {
  addOverlay.classList.add("overlay-add-active");
  document.getElementById("close").classList.add("close-plus");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let formInfo = {
    title: event.target[0].value,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formInfo),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((item) => {
      createNewDiv(item);
      addOverlay.classList.remove("overlay-add-active");
    });
});
