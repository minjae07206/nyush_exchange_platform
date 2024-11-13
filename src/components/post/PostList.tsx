import PostThumbnail from "components/post/PostThumbnail"
import { timeAgo } from "utils/timeAgo";
import { Link } from "react-router-dom";
export default function PostList({postList}: any) {
    return (
        <div className="min-h-screen min-w-[280px] mt-4 p-4 rounded-md bg-slate-100 md:grid md:grid-rows-2 md:grid-cols-3 md:gap-3 md:justify-items-center lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            { postList.map((PostThumbnailInfo:any)=> {
                const isSaved = PostThumbnailInfo.is_saved;
                const authorId = PostThumbnailInfo.author_id;
                const postStatus = PostThumbnailInfo.post_status;
                const postTitle = PostThumbnailInfo.post_title;
                const price = PostThumbnailInfo.price;
                const savedCount = PostThumbnailInfo.saved_count;
                const currency = PostThumbnailInfo.currency;
                const time = timeAgo(PostThumbnailInfo.date_of_creation);
                const imageURL = PostThumbnailInfo.image_url;
                const open_to_negotiate_flag:boolean = PostThumbnailInfo.open_to_negotiate_flag
                return (
                    <Link to={`/post/${PostThumbnailInfo.post_id}`}>
                    <PostThumbnail key={PostThumbnailInfo.post_id} open_to_negotiate_flag={open_to_negotiate_flag} isSaved={isSaved} authorId={authorId} postId={PostThumbnailInfo.post_id} postStatus={postStatus} postTitle={postTitle} price={price} savedCount={savedCount} currency={currency} time={time} imageURL={imageURL}></PostThumbnail>
                    </Link>
                )
            })}
        </div>
    )
}