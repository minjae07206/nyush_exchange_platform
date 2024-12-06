import { useState } from "react";
import Post from "./Post"
import PostStatusBadge from "./PostStatusBadge"
import axios from "axios";
import OpenToNegotiateFlagBadge from "./OpenToNegotiateFlagBadge";
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
    open_to_negotiate_flag: boolean;
}
export default function PostThumbnail({ postId, postStatus, postTitle, currency, price, savedCount, time, imageURL, authorId, open_to_negotiate_flag, isSaved }: PostThumbnailProps) {
    console.log(imageURL)
    const [postSaved, setPostSaved] = useState<boolean>(isSaved);
    const [postSavedCount, setPostSavedCount] = useState<number>(savedCount);
    const handleSavedClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // stop propagation so clicking on the save div doesn't send the user to the post specification page.
        e.stopPropagation();
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
                    `${process.env.REACT_APP_HOST_NAME}/api/post/unsave-post`,
                    { postId: postId },
                    { withCredentials: true }
                );
                // incrementing the saved count in post table
                await axios.patch(`${process.env.REACT_APP_HOST_NAME}/api/post/decrement-saved-count`, {
                    postId: postId
                })

            } else {
                // Saving the post
                await axios.post(
                    `${process.env.REACT_APP_HOST_NAME}/api/post/save-post`,
                    { postId: postId },
                    { withCredentials: true }
                );
                // decrementing the saved count in post table
                await axios.patch(`${process.env.REACT_APP_HOST_NAME}/api/post/increment-saved-count`, {
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

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = "/default-post-image.png"; // Replace the image source on error
      };

    // status can be available, pending approval, draft, archived(completed), in-progress, 
    return (
        <div className="flex shadow-md bg-grey-100 h-32 larger-phones:h-40 md:h-80 md:w-60 md:rounded-md md:block cursor-pointer">
            <div className="w-full h-full larger-phones:w-5/12 md:w-full  md:h-4/6">
                <img src={`${process.env.REACT_APP_HOST_NAME}/${imageURL}`} alt="not available" className="object-cover w-full h-full p-1 rounded-md"  onError={(e) => {handleImageError(e);}}></img>
            </div>
            <div className="w-2/3 larger-phones:w-7/12 px-2 md:w-full md:h-1/5 relative">
                {/* The title can cover 2 rows, any title longer than that will be hidden. */}
                {/* Hiding text that goes over 2 lines is easily done thanks to the line-clamp of tailwindcss*/}
                <h5 className="break-words line-clamp-2 mt-1">{postTitle}

                </h5>
                <p className="text-sm">{time}</p>
                <div className="flex items-start mt-1 mb-1">
                    {<PostStatusBadge statusText={postStatus} />}
                    {open_to_negotiate_flag && <OpenToNegotiateFlagBadge/>}
                    <span className="ml-1 relative -top-1">{price}{currency}</span>
                    <div className="md:absolute md:flex md:top-16 md:right-3 md:text-gray-400">
                    <div onClick={handleSavedClick}>
                        {
                            postSaved
                                ? <i className="hidden md:block text-sm fa-solid fa-bookmark ml-14 mt-2 text-gray-400"> </i>
                                : <i className="hidden md:block text-sm fa-regular fa-bookmark ml-14 mt-2 text-gray-400"></i>
                        }
                    </div>
                    <span className="hidden md:block text-sm mt-1 ml-1 text-gray-400">{postSavedCount}</span>
                    </div>
                </div>
                {/* PostList's Save number before screen size is md. */}
                {/* Another possible solution is delete this part and play around with the css of the 4 components in the flexbox above */}
                <div className="absolute flex top-24 right-2 text-gray-400 md:hidden">
                    <div onClick={handleSavedClick}>
                        {
                            postSaved
                                ? <i className="text-sm fa-solid fa-bookmark mt-1"></i>
                                : <i className="text-sm fa-regular fa-bookmark mt-1"></i>
                        }
                    </div>
                    <span className="text-sm ml-1 mt-1">{postSavedCount}</span>
                </div>
            </div>
        </div>
    )
}