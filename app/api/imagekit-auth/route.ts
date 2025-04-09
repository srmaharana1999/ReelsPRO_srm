import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY!,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY!,
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT!,
});

export async function GET() {
    try{
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters);
    }catch(error){
        console.log(error);
        return NextResponse.json({error:"Imagekit Auth Failed!"},{status:500})
    }
 
}