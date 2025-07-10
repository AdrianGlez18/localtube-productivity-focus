import ChannelCard from "@/components/SubscriptionCard";
import { getSubscriptions } from "@/db/subscriptions";
import { Subscription } from "@/types/sqlite-schemas";
import { useState, useEffect } from "react";

const SubscriptionsPage = () => {
    const [channels, setChannels] = useState<Subscription[]>([]);

    useEffect(() => {
        async function getChannels() {
            try {
                const userSubs = await getSubscriptions();
                setChannels(userSubs);
            } catch (err) {
                console.error(err);
            }
        }

        getChannels();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="font-handwritten text-4xl my-4">Subscriptions</h1>
            {/* TODO Search and filters. Pass the gird to another component */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 my-3">
                {
                    channels.map((channel: Subscription) => (
                        <ChannelCard key={channel.channel_id} channel={channel} />
                    ))
                }
            </div>
        </div>
    )
}

export default SubscriptionsPage