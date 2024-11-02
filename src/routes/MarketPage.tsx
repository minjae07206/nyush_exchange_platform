import FilterBar from "components/filterAndSort/FilterBar"
import PostList from "components/post/PostList"
import {useState, useEffect} from 'react';
import LoadingPage from "components/LoadingPage";
import axios from "axios";
export default function MarketPage () {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    useEffect(() => {
        axios.get('http://localhost:3001/api/post/market-post', {
            withCredentials: true,
        }).then((response)=>{
            const responseData = JSON.parse(response.data);
            setPostList(responseData);
            setLoading(true);

        })
    }, [])
    if (loading) {
        return <LoadingPage></LoadingPage>
    }
    return (
        <section>
            <FilterBar></FilterBar>
            <PostList postList={postList}></PostList>
        </section>
        
    )
}