"use client";

import VideoFeed from "@/components/VideoFeed";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true; // To avoid state updates if component unmounts during fetch

    const fetchVideos = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getVideos();
        if (isMounted) {
          setVideos(data);
          setError("");
        }
      } catch (error) {
        if (isMounted) {
          setError("Error fetching videos");
          console.error("Error fetching videos: ", error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVideos();

    return () => {
      isMounted = false; // Cleanup flag on unmount
    };
  }, []);

  return (
    <div>
      <VideoFeed videos={videos} loading={loading} error={error} />
    </div>
  );
}
