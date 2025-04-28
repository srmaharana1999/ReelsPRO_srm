import { IVideo } from "@/models/Video";
import { Video } from "@imagekit/next";
interface VideoComponentProps {
  video: IVideo;
}

export default function VideoComponent(props: VideoComponentProps) {
  return (
    <div className="flex flex-col gap-2 w-fit mx-auto bg-neutral-500 border-2 rounded-b-2xl p-1 shadow-lg shadow-gray-400 hover:scale-105 transition-all duration-500 min-sm:my-3 ">
      <div className="">
        <Video
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URLENDPOINT}
          src={props.video.videoUrl}
          controls
          width={240}
          height={480}
        />
      </div>
      <div className=" text-white">
        <h1 className="text-2xl">{props.video.title}</h1>
        <p className="text-lg">{props.video.description}</p>
        <p className="text-xs my-2">
          {props.video.createdAt
            ? props.video.createdAt.toLocaleString()
            : "Date is not avilable"}
        </p>
      </div>
    </div>
  );
}
