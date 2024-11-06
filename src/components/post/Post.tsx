import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingPage from "components/LoadingPage";
import NotFoundPage from "routes/NotFoundPage";
import { Link } from "react-router-dom";
import ImageSlide from "./ImageSlide";
export default function Post() {
    const commonClassName = 'min-w-[280px] max-w-[780px] m-auto border bg-white rounded-md mt-12';
    const { postId } = useParams(); // Get postId from the URL parameters

    const [authorId, setAuthorId] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');
    const [dateOfCreation, setDateOfCreation] = useState<string>('');
    const [dateOfExpiration, setDateOfExpiration] = useState<string>('');
    const [dateOfLastEdit, setDateOfLastEdit] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [openToNegotiate, setOpenToNegotiate] = useState<boolean>(false);
    const [overallOrPerUnit, setOverallOrPerUnit] = useState<string>('');
    const [postIdState, setPostIdState] = useState<string>('');
    const [postStatus, setPostStatus] = useState<string>('');
    const [postTitle, setPostTitle] = useState<string>('');
    const [postType, setPostType] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [savedCount, setSavedCount] = useState<number>(0);
    const [username, setUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // When this component is rendered, send a request to the server to get the full information for this post.
    useEffect(() => {
        axios.get(`http://localhost:3001/api/post/get-post-full?postId=${postId}`, { withCredentials: true })
            .then((response) => {
                const responseData = JSON.parse(response.data);
                console.log(responseData)
                setAuthorId(responseData.author_id);
                setCurrency(responseData.currency);
                setDateOfCreation(responseData.date_of_creation);
                setDateOfExpiration(responseData.date_of_expiration);
                setDateOfLastEdit(responseData.date_of_last_edit);
                setDescription(responseData.description);
                setImageUrl(responseData.image_url);
                setImages(responseData.images);
                setIsSaved(responseData.is_saved);
                setOpenToNegotiate(responseData.open_to_negotiate_flag);
                setOverallOrPerUnit(responseData.overall_or_per_unit);
                setPostIdState(responseData.post_id);
                setPostStatus(responseData.post_status);
                setPostTitle(responseData.post_title);
                setPostType(responseData.post_type);
                setPrice(responseData.price);
                setQuantity(responseData.quantity);
                setSavedCount(responseData.saved_count);
                setUsername(responseData.username);
                setLoading(false);

            })
            .catch((error) => {
                console.log(error);
                setError("An error occurred while fetching the post.");
                setLoading(false);
            });
    }, [])

    if (loading) {
        return <LoadingPage></LoadingPage>
    }

    if (error) {
        return <NotFoundPage></NotFoundPage>
    }
    return <div className={commonClassName}>
        <ImageSlide images={images}/>
    </div>
}