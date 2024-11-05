import { useState } from "react";
import Post from "./Post"
import PostStatusBadge from "./PostStatusBadge"
import axios from "axios";
interface PostThumbnailProps {
    postId: string;
    postStatus: string;
    postTitle: string;
    currency: string;
    price: string;
    savedCount: number;
    time: string;
    imageURL: string;
    isSaved: boolean;
    authorId: string;
}
export default function PostThumbnail({ postId, postStatus, postTitle, currency, price, savedCount, time, imageURL, authorId, isSaved }: PostThumbnailProps) {
    const [postSaved, setPostSaved] = useState<boolean>(isSaved);
    const [postSavedCount, setPostSavedCount] = useState<number>(savedCount);
    const handleSavedClick = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // Update saved count immediately
        if (postSaved) {
            setPostSavedCount(prevCount => prevCount - 1);
        } else {
            setPostSavedCount(prevCount => prevCount + 1);
        }
        setPostSaved(!postSaved);


        try {
            if (postSaved) {
                // Unsaving the post
                await axios.post(
                    "http://localhost:3001/api/post/unsave-post",
                    { postId: postId },
                    { withCredentials: true }
                );
                // incrementing the saved count in post table
                await axios.patch("http://localhost:3001/api/post/decrement-saved-count", {
                    postId: postId
                })

            } else {
                // Saving the post
                await axios.post(
                    "http://localhost:3001/api/post/save-post",
                    { postId: postId },
                    { withCredentials: true }
                );
                // decrementing the saved count in post table
                await axios.patch("http://localhost:3001/api/post/increment-saved-count", {
                    postId: postId
                })
            }
        } catch (error) {
            console.log("Error while saving/unsaving post:", error);
            // reverting the changes to UI if the request was not successful
            if (postSaved) {
                setPostSaved(false);
                setPostSavedCount((initialValue) => initialValue - 1);
            } else {
                setPostSaved(true);
                setPostSavedCount((initialValue) => initialValue + 1);
            }
        }
    }
    // status can be available, pending approval, draft, archived(completed), in-progress, 
    return (
        <div className="flex shadow-md bg-grey-100 h-32 larger-phones:h-40 md:h-80 md:w-60 md:rounded-md md:block cursor-pointer">
            <div className="w-full h-full larger-phones:w-5/12 md:w-full  md:h-4/6">
                <img src={`http://localhost:3001/${imageURL}`} alt="not available" className="object-cover w-full h-full p-1 rounded-md"></img>
            </div>
            <div className="block w-2/3 larger-phones:w-7/12 px-2 md:w-full md:h-1/5">
                {/* The title can cover 2 rows, any title longer than that will be hidden. */}
                {/* Hiding text that goes over 2 lines is easily done thanks to the line-clamp of tailwindcss*/}
                <h5 className="break-words line-clamp-2">{postTitle}

                </h5>
                <p className="text-sm">{time}</p>
                <div className="flex">
                    {<PostStatusBadge statusText={postStatus} />}
                    <span className="ml-1">{price}{currency}</span>
                    <div onClick={handleSavedClick}>
                        {
                            postSaved
                                ? <i className="hidden md:block text-sm fa-solid fa-bookmark ml-14 mt-2 text-gray-400"> </i>
                                : <i className="hidden md:block text-sm fa-regular fa-bookmark ml-14 mt-2 text-gray-400"></i>
                        }
                    </div>
                    <span className="hidden md:block text-sm mt-1 ml-1 text-gray-400">{postSavedCount}</span>
                </div>
                {/* PostList's Save number before screen size is md. */}
                {/* Another possible solution is delete this part and play around with the css of the 4 components in the flexbox above */}
                <div className="flex justify-end larger-phones:mt-9 text-gray-400 md:hidden">
                    <div onClick={handleSavedClick}>
                        {
                            postSaved
                                ? <i className="text-sm fa-solid fa-bookmark"></i>
                                : <i className="text-sm fa-regular fa-bookmark mt-1"></i>
                        }
                    </div>
                    <span className="text-sm ml-1">{postSavedCount}</span>
                </div>
            </div>
        </div>
    )
}