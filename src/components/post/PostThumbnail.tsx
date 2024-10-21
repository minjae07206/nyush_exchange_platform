import Post from "./Post"
import PostStatusBadge from "./PostStatusBadge"

interface PostThumbnailProps {
    PostThumbnailData?: any // need to change later, this will be a object containing the post thumbnail data.
    // and it should not be optional but it is optional for now.
}
export default function PostThumbnail({ PostThumbnailData }: PostThumbnailProps) {
    const timeSincePosting = ""
    const expirationDate = ""
    const numberofSaves = ""
    const statusAvailable = false;
    // status can be available, pending approval, draft, archived(completed), in-progress, 
    return (
        <div className="flex shadow-md bg-grey-100 h-28 larger-phones:h-40 md:h-80 md:w-60 md:rounded-md md:block">
            <div className="w-full h-full larger-phones:w-5/12 md:w-full  md:h-4/6">
                <img src="/book-example.jpg" alt="weew" className="object-cover w-full h-full p-1 rounded-md"></img>
            </div>
            <div className="block w-2/3 larger-phones:w-7/12 px-2 md:w-full md:h-1/5">
                {/* The title can cover 2 rows, any title longer than that will be hidden. */}
                {/* Hiding text that goes over 2 lines is easily done thanks to the line-clamp of tailwindcss*/}
                <h5 className="break-words line-clamp-2">abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789012345678901234567890123456789

                </h5>
                <p className="text-sm">time</p>
                <div className="flex">
                    {!statusAvailable && <PostStatusBadge statusText="In transaction" />}
                    <span className="ml-1">10,000¥</span>
                    <i className="hidden md:block text-sm fa-regular fa-bookmark ml-14 mt-2 text-gray-400"></i>
                    <span className="hidden md:block text-sm mt-1 ml-1 text-gray-400">8</span>
                </div>
                {/* PostList's Save number before screen size is md. */}
                <div className="flex justify-end larger-phones:mt-9 text-gray-400 md:hidden">
                    <i className="text-sm fa-regular fa-bookmark mt-1"></i>
                    <span className="text-sm ml-1">8</span>
                </div>
            </div>
        </div>
    )
}