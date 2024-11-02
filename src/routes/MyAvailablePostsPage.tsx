import PostList from "components/post/PostList"
import axios from "axios"
import { useEffect, useState } from "react"
import LoadingPage from "components/LoadingPage";
export default function MyAvailablePostsPage() {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    useEffect(() => {
        axios.get('http://localhost:3001/api/post/my-available-post', {
            withCredentials: true,
        }).then((response)=>{
            const responseData = JSON.parse(response.data);
            setPostList(responseData);
            setLoading(false);

        })
    }, [])
    if (loading) {
        return <LoadingPage></LoadingPage>
    }
    return (
        <section>
            <PostList postList={postList}></PostList>
        </section>
    )
}