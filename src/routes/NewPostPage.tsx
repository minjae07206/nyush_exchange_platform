import PostForm from "components/forms/PostForm"
export default function NewPostPage() {
    return (
        <div className="h-screen bg-slate-200 pt-4 min-w-[280px]">
            <PostForm newOrEditFlag="new"></PostForm>
    </div>
    )
}