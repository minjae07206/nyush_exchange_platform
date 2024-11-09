import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingPage from "components/LoadingPage";
import NotFoundPage from "routes/NotFoundPage";
import ImageSlide from "./ImageSlide";
import { timeAgo } from "utils/timeAgo";
import Button from "components/Button";
import OpenToNegotiateFlagBadge from "./OpenToNegotiateFlagBadge";
import FormItem from "components/forms/FormItem";
import FormLabel from "components/forms/FormLabel";
import Input from "components/forms/Input";
import Form from "components/forms/Form";
import PostStatusBadge from "./PostStatusBadge";
import { useNavigate } from "react-router-dom";
import DenyReason from "./DenyReason";
export default function Post() {
    const navigate = useNavigate();
    const commonClassName = 'min-w-[280px] max-w-[780px] m-auto border bg-white rounded-md mt-12 md:flex';
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
    const [category, setCategory] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [postHandlerError, setPostHandlerError] = useState<string | null>(null);
    const [denyReason, setDenyReason] = useState<string | null>(null) 

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isAuthor, setIsAuthor] = useState<boolean>(false);

    // When this component is rendered, send a request to the server to get the full information for this post.
    useEffect(() => {
        axios.get(`http://localhost:3001/api/post/get-post-full?postId=${postId}`, { withCredentials: true })
            .then((response) => {
                const responseData = JSON.parse(response.data);
                console.log(responseData)

                // format the date_of_creation date data.
                const timeAgoDateOfCreation = timeAgo(responseData.date_of_creation);
                // format date of expiration just to get the date.
                // date is in US format, mm/dd/yyyy
                const formattedDateOfExpiration = new Date(responseData.date_of_expiration).toLocaleDateString("en-US");
                setAuthorId(responseData.author_id);
                setCurrency(responseData.currency);
                setDateOfCreation(timeAgoDateOfCreation);
                setDateOfExpiration(formattedDateOfExpiration);
                setDateOfLastEdit(responseData.date_of_last_edit);
                setDescription(responseData.description);
                setImageUrl(responseData.image_url);
                if (responseData.images.length === 0) {
                    setImages(['/default-post-image.png']);  // Corrected URL
                  } else {
                    setImages(responseData.images);
                  }
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
                setCategory(responseData.category);
                setIsAdmin(responseData.isAdmin);
                setIsAuthor(responseData.isAuthor);
                setDenyReason(responseData.deny_reason);
                setLoading(false);

            })
            .catch((error) => {
                console.log(error);
                setError("An error occurred while fetching the post.");
                setLoading(false);
            });
    }, [])

    const handleSavedClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        // stop propagation so clicking on the save div doesn't send the user to the post specification page.
        e.stopPropagation();
        // Update saved count immediately
        if (isSaved) {
            setSavedCount(prevCount => prevCount - 1);
        } else {
            setSavedCount(prevCount => prevCount + 1);
        }
        setIsSaved(!isSaved);


        try {
            if (isSaved) {
                // Unsaving the post
                await axios.post(
                    "http://localhost:3001/api/post/unsave-post",
                    { postId: postId },
                    { withCredentials: true }
                );
                // incrementing the saved count in post table
                await axios.patch("http://localhost:3001/api/post/decrement-saved-count", {
                    postId: postId
                })

            } else {
                // Saving the post
                await axios.post(
                    "http://localhost:3001/api/post/save-post",
                    { postId: postId },
                    { withCredentials: true }
                );
                // decrementing the saved count in post table
                await axios.patch("http://localhost:3001/api/post/increment-saved-count", {
                    postId: postId
                })
            }
        } catch (error) {
            console.log("Error while saving/unsaving post:", error);
            // reverting the changes to UI if the request was not successful
            if (isSaved) {
                setIsSaved(false);
                setSavedCount((initialValue) => initialValue - 1);
            } else {
                setIsSaved(true);
                setSavedCount((initialValue) => initialValue + 1);
            }
        }
    }

    const handleDeleteButtonClick = () => {
        axios.delete('http://localhost:3001/api/post/delete-post', {
            data: { postId: postId },
            withCredentials: true
        })
        .then(()=>{
            // redirect to another page
            navigate('/myposts');
        })
        .catch((error)=>{
            
        });
    }

    const handleEditButtonClick = () => {
        navigate(`/edit-post/${postId}`)
    }

    const handleApproveButtonClick = () => {
        axios.patch('http://localhost:3001/api/post/approve-post', 
            { postId }, // The data you want to send
            { withCredentials: true } // The configuration option for credentials
        )
        .then(() => {
            navigate('/market'); // Redirect after successful request
        })
        .catch((error) => {
            console.log(error); // Handle error if any
        });
    }

    const handleDenyButtonClick = () => {
        axios.patch('http://localhost:3001/api/post/deny-post', {denyReason, postId}, {withCredentials:true})
        .then(()=>{
            navigate('/pending-post');
        })
        .catch((error)=>{
            console.log(error);
            console.log(1)
        })
    }

    if (loading) {
        return <LoadingPage></LoadingPage>
    }

    if (error) {
        return <NotFoundPage></NotFoundPage>
    }
    return (
        <>
            { denyReason && <DenyReason denyReason={denyReason}></DenyReason> }
            <div className={commonClassName}>
                <div className="w-full md:w-1/2 md:ml-10">
                    <ImageSlide images={images} />
                    <div>{username}</div>
                </div>
                <div className="ml-2 relative max-w-[780px] md:w-1/2">
                    <h1 className="text-xl mr-2">{postTitle}</h1>
                    <div className="text-xs text-gray-700">
                        <span>{category}</span>
                        <span> • </span>
                        <span>{dateOfCreation}</span>
                    </div>
                    <div className="text-md">
                        <span>{price}</span>
                        <span>{currency}</span>
                        {openToNegotiate && <OpenToNegotiateFlagBadge />}
                        <span className="ml-1 mb-1">
                        <PostStatusBadge statusText={postStatus}></PostStatusBadge>
                        </span>
                    </div>
                    <p className="text-sm mb-2 break-words mr-2">{description}</p>
                    {isAuthor && postStatus !== "Denied" && <Button customClass="p-1 bg-purple-600 hover:bg-purple-700" buttonText="Edit" handleButtonClickProp={()=>{handleEditButtonClick();}}></Button>}
                    {isAuthor && <Button customClass="p-1 bg-red-600 hover:bg-red-700" buttonText="Delete" handleButtonClickProp={()=>{handleDeleteButtonClick();}}></Button>}
                    <div className="flex items-center mb-2 md:justify-end md:absolute md:bottom-2 md:right-4 text-gray-400">
                        <div onClick={handleSavedClick}>
                            {
                                isSaved
                                    ? <i className="text-sm fa-solid fa-bookmark"></i>
                                    : <i className="text-sm fa-regular fa-bookmark"></i>
                            }
                        </div>
                        <span className="text-sm ml-1">{savedCount}</span>
                    </div>
                </div>

            </div>
            <div className={commonClassName}>
                {isAdmin && postStatus === "Pending" && <Button customClass="p-1 bg-green-600 hover:bg-green-700" buttonText="Approve" handleButtonClickProp={()=>{handleApproveButtonClick();}}></Button>}

                {isAdmin && postStatus === "Pending" &&
                    <Form handleSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                     }}>
                        <FormItem>
                            <FormLabel htmlFor="deny-reason">Deny reason</FormLabel>
                            <Input name="deny-reason" id="deny-reason" type="text" onInputChange={setDenyReason}></Input>
                        </FormItem>
                        <Button customClass="p-1 bg-red-700 hover:bg-red-800" buttonText="Deny" handleButtonClickProp={()=>{handleDenyButtonClick();}}></Button>
                    </Form>}
            </div>
        </>
    )




}