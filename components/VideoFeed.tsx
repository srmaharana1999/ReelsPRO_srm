import { IVideo } from "@/models/Video";
import VideoComponent from "./VideoComponent";

interface videoFeedProps {
  videos: IVideo[];
}
export default function VideoFeed(props: videoFeedProps) {
  return (
    <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {props.videos.length > 0 ? (
        props.videos.map((video) => (
          <div key={video._id?.toString()}>
            <VideoComponent video={video} />
          </div>
        ))
      ) : (
        <h1>NO Videos</h1>
      )}
    </div>
  );
}
