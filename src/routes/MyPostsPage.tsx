import MyPostsNavBar from 'components/post/MyPostsNavBar';
import {Routes, Route, Navigate} from 'react-router-dom';
import MyDraftDeniedPostsPage from 'routes/MyDraftDeniedPostsPage';
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
                <Route path="/draft-denied" element={<MyDraftDeniedPostsPage />}></Route>
                <Route path="/archived" element={<MyArchivedPostsPage />}></Route>
            </Routes>
        </section>
    )
}