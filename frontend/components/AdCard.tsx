"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import Toast from "./Toast";
interface componentProps {
    adImage: string;
    type: "search" | "saved";
    format: "video" | "image";
}
interface messageProps {
    message: string;
    error: boolean;
}
const AdCard: React.FC<componentProps> = ({ adImage, type, format }) => {
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const [saveMessage, setSaveMessage] = useState<messageProps>({
        message: "",
        error: false,
    });
    async function saveAd() {
        try {
            setSaveMessage({ message: "Saving...", error: false });
            setConfirmation(true);
            const res = await fetch("/api/save-ad", {
                method: "POST",
                body: JSON.stringify({
                    url: adImage,
                }),
            });
            if (!res.ok) {
                throw new Error(await res.text());
            }
            setSaveMessage({
                message: "Ad Saved",
                error: false,
            });
            await new Promise<void>((resolve, _) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });
        } catch (error: any) {
            setSaveMessage({
                message: "Failed to save",
                error: true,
            });
            await new Promise<void>((resolve, _) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });
        } finally {
            setConfirmation(false);
        }
    }
    async function deleteAd() {
        try {
            setConfirmation(true);
            setSaveMessage({
                message: "Deleting...",
                error: false,
            });
            const response = await fetch(`/api/delete-ad`, {
                method: "POST",
                body: JSON.stringify({
                    url: adImage,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            setSaveMessage({
                message: "Ad Deleted",
                error: false,
            });
            await new Promise<void>((resolve, _) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });
        } catch (error: any) {
            console.log(error.message);
            setSaveMessage({
                message: "Failed to delete. Try Again",
                error: false,
            });
            await new Promise<void>((resolve, _) => {
                setTimeout(() => {
                    resolve();
                }, 3000);
            });
        } finally {
            setConfirmation(false);
        }
    }
    async function triggerDownloadImage(
        imageUrl: string,
        defaultFileName: string = "downloaded-image",
    ) {
        setSaveMessage({
            message: "Downloading...",
            error: false,
        });
        setConfirmation(true);
        try {
            // Fetch the image from the URL
            const response = await fetch(imageUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            // Convert the response to a Blob
            const blob = await response.blob();

            // Detect MIME type from the Blob
            const mimeType = blob.type;

            // Set the correct file extension based on the MIME type
            let extension = "";
            if (mimeType === "image/png") {
                extension = "png";
            } else if (mimeType === "image/jpeg") {
                extension = "jpg";
            } else if (mimeType === "image/gif") {
                extension = "gif";
            } else {
                throw new Error(`Unsupported MIME type: ${mimeType}`);
            }

            // Construct the full file name
            const fileName = `${defaultFileName}.${extension}`;

            // Create a URL for the Blob and trigger the download
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link); // Append to the DOM
            link.click(); // Trigger download
            document.body.removeChild(link); // Clean up

            // Revoke the object URL to free memory
            URL.revokeObjectURL(url);
            setSaveMessage({
                message: "Downloaded Successfully",
                error: false,
            });
            await new Promise<void>((resolve, _) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        } catch (error: any) {
            setSaveMessage({
                message: error.message,
                error: true,
            });
            await new Promise<void>((resolve, _) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
            console.error("Error downloading the image:", error.message);
        } finally {
            setConfirmation(false);
            setSaveMessage({
                //reseting message
                message: "",
                error: false,
            });
        }
    }
    return (
        <div className="size-max gap-2 flex flex-col items-center justify-between bg-[#f5f5f5] p-2 rounded-md mx-auto">
            {format === "image" ? (
                <Dialog>
                    <DialogTrigger>
                        <img
                            src={adImage}
                            alt="Ad image"
                            className="object-cover rounded-md w-[20rem] h-auto"
                        />
                    </DialogTrigger>
                    <DialogContent>
                        <img
                            src={adImage}
                            alt="Ad image"
                            className="object-cover rounded-md w-[90%] md:w-[70%] h-auto"
                        />
                    </DialogContent>
                </Dialog>
            ) : format === "video" ? (
                <Dialog>
                    <DialogTrigger>
                        <video
                            src={adImage}
                            className="object-cover rounded-md w-[20rem] h-auto"
                            autoPlay
                            loop
                            muted
                            controls
                        />
                    </DialogTrigger>
                    <DialogContent>
                        <video
                            src={adImage}
                            className="object-cover rounded-md w-[90%] md:w-[70%] h-auto"
                            autoPlay
                            loop
                            muted
                            controls
                        />
                    </DialogContent>
                </Dialog>
            ) : null}
            {type === "search" ? (
                <div className="w-full h-max p-1 px-1 bg-[#f5f5f5] text-sm truncate rounded-b-md flex items-center justify-end">
                    {/*                         <button onClick={()=> {saveAd()}} className="p-2 rounded-md hover:bg-[#ffff] text-black">
                            Save to list
                        </button> */}
                    <div
                        onClick={() =>
                            triggerDownloadImage(adImage, "Ads by AdsInspect")
                        }
                        className="w-max p-1 rounded-md hover:bg-[#ffff]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-download"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </div>
                </div>
            ) : (
                <div className="w-full h-max p-1 px-1 bg-[#f5f5f5] text-sm truncate rounded-b-md flex items-center justify-between">
                    <button
                        onClick={() => {
                            deleteAd();
                        }}
                        className="p-2 rounded-md bg-red-400 hover:bg-red-300 text-white"
                    >
                        Delete
                    </button>
                    <div
                        onClick={() =>
                            triggerDownloadImage(adImage, "Ads by AdsInspect")
                        }
                        className="w-max p-1 rounded-md hover:bg-[#ffff]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-download"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </div>
                </div>
            )}
            {confirmation && (
                <Toast
                    error={saveMessage.error}
                    message={saveMessage.message}
                />
            )}
        </div>
    );
};

export default AdCard;
