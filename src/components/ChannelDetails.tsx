import YoutubeCard from './YoutubeCard';
import { YoutubeAPIVideo } from '@/types/youtube-api';
import { formatLargeNumbers } from '@/lib/utils';

const ChannelDetails = ({channel, videos}: {channel: any, videos: any}) => {
  const {
    snippet: {thumbnails, title},
    statistics: {viewCount, videoCount, subscriberCount},
  } = channel;

  return (
    <div className="flex justify-center w-full items-center flex-col @container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all p-4">
            <img 
            src={thumbnails?.medium?.url || thumbnails?.high?.url || thumbnails?.default?.url} 
            alt={title} 
            className='w-40 h-40 rounded-full'/>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold font-handwritten text-center md:text-left">{title}</h1>
              <div className="flex gap-2">
                <p className="text-sm font-mono">{formatLargeNumbers(viewCount)} views</p>
                <p className="text-sm font-mono">{formatLargeNumbers(videoCount)} videos</p>
                <p className="text-sm font-mono">{formatLargeNumbers(subscriberCount)} subscribers</p>
              </div>
            </div>
        </div>
        {/* TODO: Searchbar */}
        <div className="grid grid-cols-1 @xl:grid-cols-2 @5xl:grid-cols-3 @7xl:grid-cols-4 gap-4 my-4">
                {videos.map((video: YoutubeAPIVideo) => {
                    return (
                        <YoutubeCard key={video.id} video={video}/>
                    )
                })}
            </div>
    </div>
  )
}

export default ChannelDetails



/*
import React from 'react'

const ChannelDetails = ({channel}: {channel: any}) => {
  return (
    <div className="flex justify-center w-full items-center flex-col">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8  border-2 border-black p-4">
            <img 
            src={channel.snippet.thumbnails.medium.url} 
            alt={channel.snippet.title} 
            className='w-40 h-40  rounded-full'/>
            <h1 className="text-2xl font-bold font-handwritten">{channel.snippet.title}</h1>
        </div>
    </div>
  )
}

export default ChannelDetails
*/