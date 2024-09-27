import {Routes, Route} from 'react-router-dom';
import MyDraftPostsPage from 'routes/MyDraftPostsPage';
export default function MyPostsPage () {
    return (
        <div>
            <Routes>
                <Route path="/draft" element={<MyDraftPostsPage />}></Route>
            </Routes>
            myposts!!!!
        </div>
    )
}