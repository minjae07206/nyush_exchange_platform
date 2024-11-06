import {Routes, Route} from 'react-router-dom';
import Post from 'components/post/Post';
export default function PostPage() {
    return (
        <div>
        <Routes>
            <Route path=":postId" element={<Post/>}></Route>
        </Routes>
        <div>This is the Post information page</div>
        </div>
    )
}