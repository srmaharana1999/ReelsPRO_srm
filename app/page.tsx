"use client";

import VideoFeed from "@/components/VideoFeed";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { Video } from "@imagekit/next";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        console.log(data);
        setVideos(data);
      } catch (error) {
        console.log("Error fetching videos: ", error);
      }
    };

    fetchVideos();
  }, []);
  console.log(videos[0]);
  return (
    <div className="">
      <VideoFeed videos={videos} />
    </div>
  );
}
