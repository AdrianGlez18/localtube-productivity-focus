import React from 'react';
import '@justinribeiro/lite-youtube';
import type { YoutubeAPIVideo } from '../types/youtube-api';

type Props = {
  video: YoutubeAPIVideo;
};

const VideoDetails: React.FC<Props> = ({ video }) => {
  const { id, snippet } = video;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="aspect-video rounded-lg overflow-hidden mb-6 shadow">
        <lite-youtube videoid={id} style={{ width: '100%', height: '100%' }} params="enablejsapi=1&rel=0" allowfullscreen />
      </div>

      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{snippet.title}</h1>
        <p className="text-gray-600 text-sm mt-1">{snippet.channelTitle}</p>
      </div>

      <div className="mb-6 flex gap-4">
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
          Subscribe
        </button>
      </div>

      <p className="text-gray-800 whitespace-pre-line leading-relaxed">
        {snippet.description}
      </p>
    </div>
  );
};

export default VideoDetails;