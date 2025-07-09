import React, { useEffect, useState } from 'react';
import '@justinribeiro/lite-youtube';
import type { YoutubeAPIVideo } from '../types/youtube-api';
import { setSubscription, checkIfSubscribed } from '@/db/subscriptions';
import { cn } from '@/lib/utils';

type Props = {
  video: YoutubeAPIVideo;
};

const VideoDetails: React.FC<Props> = ({ video }) => {
  const { id, snippet } = video;

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async () => {
    if (!isSubscribed) {
      try {
        setIsLoading(true);
        const sub = await setSubscription(video);
        setIsLoading(false);
        if (sub) {
          setIsSubscribed(true);
        } else {
          console.error("Error when subscribing. Please, try again later.");
        }
      } catch {
        console.error("Error when subscribing. Please, try again later.");
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const isAlreadySubscribed = await checkIfSubscribed(snippet.channelId);
        setIsSubscribed(isAlreadySubscribed);
      } catch (error) {
        console.error("Error checking subscription status:", error);
      }
    };
    
    checkSubscriptionStatus();
  }, []);

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
        <button 
        onClick={handleSubscription}
        disabled={isLoading}
        className={cn(
          'px-4 py-2 rounded transition-all duration-300 cursor-pointer hover:scale-105',
          isSubscribed
            ? 'bg-gray-950 text-white hover:bg-gray-800'
            : 'bg-red-600 text-white  hover:bg-red-700'
        )}>
          {isSubscribed ? 'Subscribed ✔️' : 'Subscribe'}
        </button>
      </div>

      <p className="text-gray-800 whitespace-pre-line leading-relaxed">
        {snippet.description}
      </p>
    </div>
  );
};

export default VideoDetails;