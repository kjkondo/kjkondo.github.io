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

  //REST CALL RESPONSE
  const data = JSON.parse(xhr.responseText);

  function extractDateFromFilename(filename) {
    const pattern = /(\d{4})(\d{2})(\d{2})\.html/g;
    const match = filename.split(pattern);

    if (match) {
      const year = match[1];
      const month = match[2];
      const day = match[3];
      return new Date(`${year}-${month}-${day}`);
    } else {
      return null;
    }
  }
  function sortObjectsByDate(objects) {
    // Extract dates from filenames and create an array of objects with date properties
    const objectsWithDates = objects.map((obj) => ({
      name: obj.name,
      date: extractDateFromFilename(obj.name),
    }));
    // Sort objects by date descending (newest first)
    objectsWithDates.sort((a, b) => b.date - a.date);
    // Return sorted objects without the date property
    return objectsWithDates.map((obj) => obj.name);
  }

  // Extract file names
  postFiles = sortObjectsByDate(data);
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
