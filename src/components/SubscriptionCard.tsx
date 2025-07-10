import React from "react";
import { Subscription } from "@/types/sqlite-schemas";
import { useNavigate } from "react-router-dom";

type ChannelCardProps = {
  channel: Subscription
};

const ChannelCard: React.FC<ChannelCardProps> = ({
  channel
}) => {
  const navigate = useNavigate();
  
  const handleViewChannel = () => {
    console.log('navigating to: ', channel.channel_id);
    navigate(`/channel/${channel.channel_id}`);
  };

  return (
    <div className="flex items-center justify-between w-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 mb-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
      <div className="flex items-center gap-4">
        <img 
          src={channel.image_url} 
          alt={channel.name} 
          className="w-12 h-12 rounded-full border-2 border-black object-cover"
        />
        <h3 className="font-bold text-lg">{channel.name}</h3>
      </div>
      <button 
        onClick={handleViewChannel}
        className="cursor-pointer bg-black text-white px-4 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors font-bold"
      >
        View channel
      </button>
    </div>
  );
};

export default ChannelCard;