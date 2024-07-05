// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("posts-container");
  const postFiles = ["./post1.html"]; // Add more post files as needed

  postFiles.forEach((postFile) => {
    fetch(`./posts/${postFile}`)
      .then((response) => response.text())
      .then((data) => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = data;
        postsContainer.appendChild(postElement);
      })
      .catch((error) => console.error("Error loading post:", error));
  });
});
