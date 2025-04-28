import VideoUploadForm from "@/components/VideoUploadForm";
// import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
// import React, { useState } from "react";

function Upload() {
  // const [progress, setProgress] = useState(0);
  // const [uploadSuccess, setUploadSuccess] = useState({});

  // const handleProgress = (progress: number) => {
  //   setProgress(progress);
  // };
  // const handleSuccess = (response: IKUploadResponse) => {
  //   setUploadSuccess(response);
  // };
  // console.log(progress);
  // console.log(uploadSuccess);
  return (
    <div className="w-full h-full flex justify-center ">
      <div className="w-1/2">
        <h2 className="text-center text-white text-3xl">Video Upload Form</h2>
        <VideoUploadForm />
      </div>
    </div>
  );
}

export default Upload;
