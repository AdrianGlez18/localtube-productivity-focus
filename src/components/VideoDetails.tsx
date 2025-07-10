import React, { useEffect, useState } from 'react';
import '@justinribeiro/lite-youtube';
import type { YoutubeAPIVideo } from '../types/youtube-api';
import { setSubscription, checkIfSubscribed } from '@/db/subscriptions';
import { setLikedVideo, checkIfVideoLiked } from '@/db/liked-videos';
import { cn } from '@/lib/utils';
import { ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': any;
    }
  }
}

type Props = {
  video: YoutubeAPIVideo;
};

const VideoDetails: React.FC<Props> = ({ video }) => {
  const { id, snippet } = video;

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscription = async () => {
    if (!isSubscribed) {
      try {
        setIsLoading(true);
        const sub = await setSubscription(video);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
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

  const handleLike = async () => {
    if (!isLiked) {
      try {
        setIsLoading(true);
        const liked = await setLikedVideo(video);
        setTimeout(() => {
          setIsLoading(false);
          toast.success('Video added to liked videos');
        }, 300);
        if (liked) {
          setIsLiked(true);
        } else {
          toast.error('Error when liking video. Please, try again later.');
        }
      } catch {
        toast.error('Error when liking video. Please, try again later.');
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
    
    const checkLikeStatus = async () => {
      try {
        const isAlreadyLiked = await checkIfVideoLiked(id);
        setIsLiked(isAlreadyLiked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    
    checkSubscriptionStatus();
    checkLikeStatus();
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
        
        <button 
        onClick={handleLike}
        disabled={isLoading}
        className={cn(
          'px-4 py-2 rounded transition-all duration-300 cursor-pointer hover:scale-105 flex items-center gap-2',
          isLiked
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        )}>
          <ThumbsUp size={18} />
          {isLiked ? 'Liked' : 'Like'}
        </button>
      </div>

      <p className="text-gray-800 whitespace-pre-line leading-relaxed">
        {snippet.description}
      </p>
    </div>
  );
};

export default VideoDetails;