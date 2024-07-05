// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts-container");
  let postFiles = []; // Add more post files as needed
  const apiUrl = `https://api.github.com/repos/kjkondo/kjkondo.github.io/contents/posts`;

  // Create a synchronous XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, false); // false makes the request synchronous
  xhr.send();

  if (xhr.status !== 200) {
    throw new Error(`HTTP error! Status: ${xhr.status}`);
  }

  const data = JSON.parse(xhr.responseText);

  // Extract file names
  postFiles = data.map((item) => "./" + item.name);

  postFiles.forEach((postFile) => {
    fetch(`./posts/${postFile}`)
      .then((response) => response.text())
      .then((data) => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = data;
        console.log(data);
        postsContainer.appendChild(postElement);
      })
      .catch((error) => console.error("Error loading post:", error));
  });
});
