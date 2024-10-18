import PostForm from "components/forms/PostForm"
export default function NewPostPage() {
    return (
        <div className="bg-slate-200 pt-4 min-w-[280px] pb-12">
            <PostForm newOrEditFlag="new"></PostForm>
    </div>
    )
}