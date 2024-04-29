import React, { useEffect, useState } from "react";
import { FcMenu } from "react-icons/fc";
import { IoIosSearch } from "react-icons/io";
import youTubeIcon from "./icons/YoutubeIcons.svg";
import axios from "axios";
const HeaderSearchBar = ({ videos }) => {
  const [searchVideo, setSearchVideo] = useState("");
  const [videoData, setVideoData] = useState([]);
  const handleChange = (e) => {
    setSearchVideo(e.target.value);
  };

  console.log("video", videoData);
  const handleClick = () => {
    if (searchVideo) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?q=${searchVideo}&key=AIzaSyCvQNyTuE29Qgk5YnVJWkwFBOWQEA_3daQ&part=id,snippet&maxResults=50`
        )
        .then((res) => {
          setVideoData(res.data.items);
        });
    } else {
      setVideoData(videos);
    }
  };
  return (
    <>
      <div className="mx-5 d-flex align-items-baseline gap-5">
        <div>
          <FcMenu style={{ width: "2rem", height: "2rem" }} />
          <img className="icon-youtube ms-4" src={youTubeIcon} alt="" />
        </div>
        <div>
          <div
            className="input-group mb-3 input-search"
            style={{ height: "2.5rem" }}
          >
            <input
              type="text"
              className="input-youtube rounded-pill"
              size={90}
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={handleChange}
            />
            <button
              className="btn btn-outline-secondary btn-search"
              type="button"
              id="button-addon2"
              onClick={handleClick}
            >
              <IoIosSearch style={{ width: "1.5rem", height: "1.5rem" }} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid-youTube">
        {videoData.length > 0 &&
          videoData?.map((video) => (
            <div key={video.id}>
              <iframe
                title={video.snippet.title}
                width="480"
                height="270"
                src={`//www.youtube.com/embed/${video.id.videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ))}
      </div>
    </>
  );
};

export default HeaderSearchBar;
