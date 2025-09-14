import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    // const session = await getServerSession(authOptions);
    // console.log(session);
    if (videos.length === 0 || !videos) {
      return NextResponse.json([], { status: 400 });
    }
    return NextResponse.json(videos);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch videos." },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    // console.log(session);
    if (!session) {
      return NextResponse.json({ error: "Unautorized" }, { status: 400 });
    }
    await connectToDB();
    const reqBody: IVideo = await request.json();

    if (
      !reqBody.title ||
      !reqBody.description ||
      !reqBody.thumbnailUrl ||
      !reqBody.videoUrl
    ) {
      return NextResponse.json(
        { error: "Missing Required Fields" },
        { status: 401 }
      );
    }

    const videoData = {
      ...reqBody,
      controls: reqBody.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: reqBody.transformation?.quality ?? 100,
      },
    };
    const newVideo = await Video.create(videoData);
    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create a video." },
      { status: 400 }
    );
  }
}
