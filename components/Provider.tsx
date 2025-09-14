"use client";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLICKEY!;
const urlEndPoint = process.env.NEXT_PUBLIC_IMAGEKIT_URLENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}:${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.error(error);
      throw new Error(`ImageKit authentication failed`);
    }
  };
  return (
    <SessionProvider>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndPoint}
        authenticator={authenticator}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
