import { useParams } from "react-router-dom";
import PostForm from "components/forms/PostForm";

export default function EditPostPage() {
    const { postId } = useParams(); // Get postId from URL parameters

    return (
        <div className="bg-slate-300 pt-4 min-w-[280px] pb-12">
            <PostForm postId={postId} newOrEditFlag="edit" />
        </div>
    );
}