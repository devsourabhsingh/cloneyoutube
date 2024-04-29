import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderSearchBar from "./HeaderSearchBar";
const YouTubeDataApi = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCvQNyTuE29Qgk5YnVJWkwFBOWQEA_3daQ&chart=mostPopular&part=id,snippet,contentDetails,player,status,topicDetails&maxResults=50"
      )
      .then((res) => {
        setVideos(res.data.items);
      });
  }, []);
  console.log("videosNew", videos);

  return (
    <>
      <HeaderSearchBar videos={videos}/>
      <div className="grid-youTube">
        {videos.length > 0 &&
          videos?.map((video) => (
            <div key={video.id}>
              <iframe
                title={video.snippet.title}
                width="480"
                height="270"
                src={`//www.youtube.com/embed/${video.id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </div>
    </>
  );
};

export default YouTubeDataApi;
