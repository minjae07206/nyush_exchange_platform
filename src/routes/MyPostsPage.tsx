import MyPostsNavBar from 'components/MyPostsNavBar';
import {Routes, Route, Navigate} from 'react-router-dom';
import MyDraftPostsPage from 'routes/MyDraftPostsPage';
import MyArchivedPostsPage from 'routes/MyArchivedPostsPage';
import MyAvailablePostsPage from 'routes/MyAvailablePostsPage';
export default function MyPostsPage () {
    return (
        <section>
            <MyPostsNavBar></MyPostsNavBar>
            <Routes>
                {/* When a user enters /myposts, redirects them to /myposts/available as /myposts itself does not have any content. */}
                <Route index element={<Navigate to="available" />} />
                <Route path="/available" element={<MyAvailablePostsPage />}></Route>
                <Route path="/draft" element={<MyDraftPostsPage />}></Route>
                <Route path="/archived" element={<MyArchivedPostsPage />}></Route>
            </Routes>
        </section>
    )
}