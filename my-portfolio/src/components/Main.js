import React, { useState, useEffect } from "react";

function Main() {
  const [randomMedia, setRandomMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch random media content from other pages
    const fetchRandomMedia = async () => {
      try {
        // Replace with actual API calls or data fetching logic
        // For simplicity, we'll assume you have separate data arrays for each section
        const photosData = []; // Replace with actual photo data
        const videosData = []; // Replace with actual video data
        const codeData = []; // Replace with actual code/project data
        const rantsData = []; // Replace with actual blog post/rant data

        // Combine all media data into a single array
        const allMediaData = [
          ...photosData,
          ...videosData,
          ...codeData,
          ...rantsData,
        ];

        // Shuffle the combined data to randomize it
        const shuffledMedia = shuffleArray(allMediaData);

        // Sort the shuffled media items by date (assuming a 'date' property)
        shuffledMedia.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Select the first 16 items from the sorted array (for a 4x4 grid)
        const randomMediaItems = shuffledMedia.slice(0, 16);

        setRandomMedia(randomMediaItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching random media:", error);
      }
    };

    fetchRandomMedia();
  }, []);

  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  return (
    <div>
      <h1>Main Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid-container">
          {/* Render the random media content in a 4x4 grid */}
          {randomMedia.map((mediaItem, index) => (
            <div key={index} className="grid-item">
              {/* Display the media content based on its type */}
              {mediaItem.type === "photo" && (
                <img src={mediaItem.url} alt={mediaItem.caption} />
              )}
              {mediaItem.type === "video" && (
                <video controls>
                  <source src={mediaItem.url} type="video/mp4" />
                </video>
              )}
              {mediaItem.type === "code" && <pre>{mediaItem.code}</pre>}
              {mediaItem.type === "rant" && (
                <div>
                  <h2>{mediaItem.title}</h2>
                  <p>{mediaItem.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
