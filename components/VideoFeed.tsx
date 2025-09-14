import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface videoFeedProps {
  videos: IVideo[];
  loading: boolean;
  error: string;
}
export default function VideoFeed({ videos, loading, error }: videoFeedProps) {
  return (
    <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {!videos && loading ? (
        <h1>Loading...</h1>
      ) : videos.length > 0 ? (
        videos.map((video) => (
          <div key={video._id?.toString()}>
            <VideoComponent video={video} />
          </div>
        ))
      ) : (
        <h1>{error || "No Videos"}</h1>
      )}
    </div>
  );
}
