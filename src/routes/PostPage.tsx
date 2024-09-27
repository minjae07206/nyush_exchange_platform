import {Routes, Route} from 'react-router-dom';
import Post from 'components/Post';
export default function PostPage() {
    return (
        <div>
        <Routes>
            <Route path=":id" element={<Post/>}></Route>
        </Routes>
        <div>This is the Post information page</div>
        </div>
    )
}