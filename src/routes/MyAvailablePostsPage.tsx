import PostList from "components/post/PostList"
import axios from "axios"
import { useEffect, useState } from "react"
export default function MyAvailablePostsPage() {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    useEffect(() => {
        axios.get('http://localhost:3001/api/post/my-available-post', {
            withCredentials: true,
        }).then((response)=>{
            const responseData = JSON.parse(response.data);
            setPostList(responseData);
            setLoading(true);

        })
    }, [])
    return (
        <section>
            <PostList postList={postList}></PostList>
        </section>
    )
}