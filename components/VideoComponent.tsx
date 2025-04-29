import { IVideo } from "@/models/Video";
import { Video } from "@imagekit/next";
interface VideoComponentProps {
  video: IVideo;
}

export default function VideoComponent(props: VideoComponentProps) {
  return (
    <div className="flex flex-col gap-2 max-w-xs w-full mx-auto rounded-b-2xl p-1 min-sm:my-3 shadow-sm shadow-gray-400 hover:shadow-lg hover:shadow-gray-500 transition-shadow duration-300">
      <div className="">
        <Video
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URLENDPOINT}
          src={props.video.videoUrl}
          controls
          width={"100%"}
          height={"100%"}
          transformation={[{ width: "100", height: "150" }]}
        />
      </div>
      <div className=" text-white px-4">
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
