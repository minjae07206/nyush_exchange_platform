import PostThumbnail from "components/post/PostThumbnail"
import { timeAgo } from "utils/timeAgo";
export default function PostList({postList}: any) {
    return (
        <div className="min-w-[280px] mt-4 p-4 rounded-md bg-slate-100 md:grid md:grid-rows-2 md:grid-cols-3 md:gap-3 md:justify-items-center lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            { postList.map((PostThumbnailInfo:any)=> {
                console.log(PostThumbnailInfo);
                const postStatus = PostThumbnailInfo.post_status;
                const postTitle = PostThumbnailInfo.post_title;
                const price = PostThumbnailInfo.price;
                const savedCount = PostThumbnailInfo.saved_count;
                const currency = PostThumbnailInfo.currency;
                const time = timeAgo(PostThumbnailInfo.date_of_creation)
                return (
                    <PostThumbnail key={PostThumbnailInfo.post_id} postStatus={postStatus} postTitle={postTitle} price={price} savedCount={savedCount} currency={currency} time={time}></PostThumbnail>
                )
            })}
        </div>
    )
}