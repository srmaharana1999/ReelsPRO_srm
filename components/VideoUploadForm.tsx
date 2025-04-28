"use client";
import { useState } from "react";
import VideoUpload from "./VideoUpload";
import { useForm } from "react-hook-form";
import { UploadResponse } from "@imagekit/next";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}
const VideoUploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });
  const handleUploadSucces = (response: UploadResponse) => {
    setValue("videoUrl", response.filePath || "");
    setValue("thumbnailUrl", response.filePath || "");
    // console.log(response);
  };
  const onSubmit = handleSubmit(async (data) => {
    if (!data.videoUrl) {
      setError("Upload a video First");
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.createVideo(data);

      // Reset
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      if (res) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to Publish Video");
      }
    } finally {
      setLoading(false);
    }
  });
  return (
    <>
      <form className="w-full h-full" onSubmit={onSubmit}>
        <div className="my-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Type here"
              {...register("title", { required: true, maxLength: 50 })}
            />
            {errors?.title && (
              <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}
          </fieldset>
        </div>
        <div className="my-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              className="textarea h-24 w-full"
              placeholder="Descrition"
              {...register("description", { required: true, maxLength: 150 })}
            ></textarea>
            {errors?.description && (
              <p className="text-red-400 text-sm">
                {errors.description.message}
              </p>
            )}
          </fieldset>
        </div>
        <div className="my-5">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Upload Video</legend>
            <VideoUpload onSuccess={handleUploadSucces} />
          </fieldset>
        </div>
        <div className="mt-8 w-1/2 mx-auto">
          <button className="btn btn-wide" disabled={loading}>
            {loading ? "Publishing...." : "Publish Video"}
          </button>
        </div>
      </form>
      {error && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{error}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoUploadForm;
