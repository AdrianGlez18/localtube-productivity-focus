import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { YoutubeAPIVideo } from "../types/youtube-api";
import { BookmarkPlus, ClockPlus, DownloadCloud } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setWatchLaterVideo } from "@/db/watch-later";

type YouTubeCardProps = {
  video: YoutubeAPIVideo
};

const YoutubeCard: React.FC<YouTubeCardProps> = ({
  video
}) => {
  /* const [menuOpen, setMenuOpen] = useState(false); */
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const videoId = video.id;

  const {
    snippet: { thumbnails, title, channelTitle, publishedAt },
  } = video;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleVideoClick = () => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="relative w-full sm:max-w-sm md:max-w-md bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="cursor-pointer" onClick={handleVideoClick}>
        <div className="w-full  bg-gray-200">
          {!imageLoaded && (
            <div className="animate-pulse w-full h-full bg-gray-300" />
          )}
          <img
            src={thumbnails?.medium?.url || ""}
            alt={title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1">
        <div className="flex items-start justify-between w-full gap-1">
          <h2
            className="text-lg font-semibold text-gray-900 cursor-pointer max-w-4/5 overflow-hidden overflow-ellipsis line-clamp-2"
            onClick={handleVideoClick}
          >
            {title}
          </h2>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger>
                <DownloadCloud className="w-6 h-6 text-gray-600 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
                <p className="text-sm font-medium text-gray-900">Download</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <ClockPlus className="w-6 h-6 text-gray-600 cursor-pointer" onClick={()=> setWatchLaterVideo(video)}/>
              </TooltipTrigger>
              <TooltipContent className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
                <p className="text-sm font-medium text-gray-900">Watch later</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <BookmarkPlus className="w-6 h-6 text-gray-600 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
                <p className="text-sm font-medium text-gray-900">Save to collection</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <p className="text-sm text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {channelTitle}
        </p>

        <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
      </div>

      {/* <div className="absolute top-2 right-2">
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-black p-1 rounded-full bg-white shadow-sm"
          >
            ⋮
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  saveToWatchLater(video);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Save to Watch Later
              </button>
              <button
                onClick={() => {
                  saveToCollection(video);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Save to Collection
              </button>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default YoutubeCard;
