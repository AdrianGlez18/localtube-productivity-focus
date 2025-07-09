import { LikedVideo } from '@/types/sqlite-schemas'
import React from 'react'

type LikedVideoCardProps = {
    video: LikedVideo;
    handleVideoClick: (youtubeId: string) => void;
}

const LikedVideoCard = ({
    video,
    handleVideoClick
}: LikedVideoCardProps) => {
    return (
        <div
            key={video.id}
            className="bg-white border-2 border-black rounded-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden"
        >
            <div className="relative">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-52 object-cover border-b-2 border-black"
                    onClick={() => handleVideoClick(video.youtube_id)}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                    <button className="bg-white p-1 rounded-md border-2 border-black hover:bg-red-300 transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h3
                    className="font-bold text-gray-900 line-clamp-2 cursor-pointer"
                    onClick={() => handleVideoClick(video.youtube_id)}
                >
                    {video.title}
                </h3>
                <p className="text-sm text-gray-600 font-mono mt-2">
                    {video.author || "Anonnymous"}
                </p>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600 font-mono">
                        {new Date(video.date_liked).toLocaleDateString()}
                    </p>
                    <button className="bg-white p-1 rounded-md border-2 border-black hover:bg-blue-100 transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LikedVideoCard