import PostThumbnail from "components/PostThumbnail"
export default function PostList() {
    return (
        <div className="min-w-[280px] mt-4 p-4 rounded-md bg-slate-100 md:grid md:grid-rows-2 md:grid-cols-3 md:gap-3 md:justify-items-center lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            <PostThumbnail></PostThumbnail>
            <PostThumbnail></PostThumbnail>
            <PostThumbnail></PostThumbnail>
            <PostThumbnail></PostThumbnail>
            <PostThumbnail></PostThumbnail>
            <PostThumbnail></PostThumbnail>
            <PostThumbnail></PostThumbnail>
        </div>
    )
}