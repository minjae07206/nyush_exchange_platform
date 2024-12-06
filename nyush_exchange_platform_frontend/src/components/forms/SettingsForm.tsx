import Button from "components/Button"
import { useState, useEffect, useRef } from 'react';
import FormHeader from "./FormHeader";
import Form from "./Form";
import FormFooter from "./FormFooter";
import FormLabel from "./FormLabel";
import FormItem from "./FormItem";
import Input from "./Input";
import InputDescription from "./InputDescription";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import InputError from "./InputError";
import { Link } from "react-router-dom";

import axios from "axios";
import LoadingPage from "components/LoadingPage";
import NotFoundPage from "routes/NotFoundPage";
import ImageInput from "./ImageInput";
import { useSettingsFormStore } from "stores/useSettingsFormStore";
import SettingsUpdateApprovedOrDeniedMessage from "components/SettingsUpdateApprovedOrDeniedMessage";

export default function SettingsForm() {
    const profileImageFileRef = useRef<HTMLInputElement | null>(null);
    const wechatQRCodeImageFileRef = useRef<HTMLInputElement>(null);

    const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);
    const [approvedOrDenied, setApprovedOrDenied] = useState<string | null>(null);
    const [updateDeniedReason, setUpdateDeniedReason] = useState<string | null>(null);

    const commonClassName = 'min-w-[280px] max-w-[780px] m-auto border bg-white rounded-md mt-12';
    const currentUsername: string = useSettingsFormStore((state) => state.currentUsername);
    const setCurrentUsername = useSettingsFormStore((state) => state.setCurrentUsername);
    const currentUsernameError: string | null = useSettingsFormStore((state) => state.currentUsernameError);
    const setCurrentUsernameError = useSettingsFormStore((state) => state.setCurrentUsernameError);
    const email: string = useSettingsFormStore((state) => state.email);
    const setEmail = useSettingsFormStore((state) => state.setEmail);
    const profileImageURL: string = useSettingsFormStore((state) => state.profileImageURL);
    const setProfileImageURL = useSettingsFormStore((state) => state.setProfileImageURL);
    const wechatQRCodeImageURL: string = useSettingsFormStore((state) => state.wechatQRCodeImageURL);
    const setWechatQRCodeImageURL = useSettingsFormStore((state) => state.setWechatQRCodeImageURL);
    const profileImageFile: File | null = useSettingsFormStore((state) => state.profileImageFile);
    const setProfileImageFile = useSettingsFormStore((state) => state.setProfileImageFile);
    const wechatQRCodeImageFile: File | null = useSettingsFormStore((state) => state.wechatQRCodeImageFile);
    const setWechatQRCodeImageFile = useSettingsFormStore((state) => state.setWechatQRCodeImageFile);
    const formSuccess: string | null = useSettingsFormStore((state) => state.formSuccess);
    const setFormSuccess = useSettingsFormStore((state) => state.setFormSuccess);
    const formError: string | null = useSettingsFormStore((state) => state.formError);
    const setFormError = useSettingsFormStore((state) => state.setFormError);
    const isAdmin = useSettingsFormStore((state)=>state.isAdmin);
    const setIsAdmin = useSettingsFormStore((state)=>state.setIsAdmin);

    const profileImageFileSizeError: string | null = useSettingsFormStore((state)=>state.profileImageFileSizeError);
    const setProfileImageFileSizeError = useSettingsFormStore((state)=>state.setProfileImageFileSizeError);
    const wechatQRCodeImageFileSizeError: string | null = useSettingsFormStore((state)=>state.wechatQRCodeImageFileSizeError);
    const setWechatQRCodeImageFileSizeError = useSettingsFormStore((state)=>state.setWechatQRCodeImageFileSizeError);


    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleSettingsFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let CAN_PROCEED_TO_MAKING_REQUEST = true;

        const allowedUsernamePattern: RegExp = /^[a-zA-Z0-9_]+$/;
        if (!allowedUsernamePattern.test(currentUsername)) {
            setCurrentUsernameError("Username should only contain alphanumerical values and underscores.")
            CAN_PROCEED_TO_MAKING_REQUEST = false;
        } else {
            setCurrentUsernameError(null);
        }

        if (CAN_PROCEED_TO_MAKING_REQUEST) {

            const formData = new FormData();
            let thereExistsOriginalImage = false;
            let thereExistsOriginalQRCodeImage = false;
            formData.append('username', currentUsername);
            if (profileImageFile) {
                formData.append('profileImage', profileImageFile, profileImageFile.name);
            }
            if (wechatQRCodeImageFile) {
                formData.append('wechatQRCodeImage', wechatQRCodeImageFile, wechatQRCodeImageFile.name);
            }
            if (profileImageURL === "/default-profile-image.png") {
                thereExistsOriginalImage = false
            } else {
                thereExistsOriginalImage = true
            }

            if (wechatQRCodeImageURL === "/default-wechat-qr-code.png") {
                thereExistsOriginalQRCodeImage = false;
            } else {
                thereExistsOriginalQRCodeImage = true;
            }

            formData.append('defaultProfileImageExists', thereExistsOriginalImage.toString());
            formData.append('defaultWechatQRCodeExists', thereExistsOriginalQRCodeImage.toString());
            try {
                await axios.post(`${process.env.REACT_APP_HOST_NAME}/api/user/request-update-user-info`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        withCredentials: true,
                    }
                )

                await axios.patch(`${process.env.REACT_APP_HOST_NAME}/api/user/update-user-pending-state`, {pending_state:true}, {
                    withCredentials: true,
                });
                setDisableSaveButton(true);
                setFormSuccess("Update request successful. It will be reviewed by the admin.");
                setFormError(null);
            } catch (error:any) {
                const errorMessage: string = error.response.data.message;
                if (errorMessage === "An error occured on the database with updating user_pending state. This is bad, should still stop the user from sending further requests.") {
                    setDisableSaveButton(true);
                }
                setFormError(errorMessage);
                setFormSuccess(null);
            }

        } else {
            setFormError("Something wrong happened. Please try again later.");
            return;
        }

    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_HOST_NAME}/api/user/get-user-info`, { withCredentials: true })
            .then((response) => {
                const formattedResponseData = JSON.parse(response.data);
                if (formattedResponseData.profile_image === null) {
                    setProfileImageURL("/default-profile-image.png");
                } else {
                    const formatImagePath = (fullPath: string): string => {
                        // Replace the directory part with '/uploads'
                        console.log("Formatting image path: ", fullPath)
                        return fullPath.replace('/nyush_exchange_platform_server/var/www/uploads', 'uploads');
                    }
                    setProfileImageURL(formatImagePath(formattedResponseData.profile_image));
                }

                if (formattedResponseData.wechat_qr_code_image === null) {
                    setWechatQRCodeImageURL("/default-wechat-qr-code.png");
                } else {
                    const formatImagePath = (fullPath: string): string => {
                        // Replace the directory part with '/uploads'
                        console.log("Formatting image path: ", fullPath)
                        return fullPath.replace('/nyush_exchange_platform_server/var/www/uploads', 'uploads');
                    }
                    setWechatQRCodeImageURL(formatImagePath(formattedResponseData.wechat_qr_code_image));
                }
                setCurrentUsername(formattedResponseData.username);
                setEmail(formattedResponseData.email);
                setDisableSaveButton(formattedResponseData.pending_update);
                setUpdateDeniedReason(formattedResponseData.update_denied_reason);
                setApprovedOrDenied(formattedResponseData.update_result);
                formattedResponseData.role === "admin" ? setIsAdmin(true) : setIsAdmin(false)
                if (!disableSaveButton) {
                    setFormSuccess(null);
                    setFormError(null);
                }
            })
            .catch((error) => {
                console.log(error)
                setError("An error occurred while getting user info");

            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    const handleCloseButtonClick = () => {
        
        axios.patch(`${process.env.REACT_APP_HOST_NAME}/api/user/reset-deny-info`, {withCredentials: true})
        .then(()=>{  
            setApprovedOrDenied(null);
            setUpdateDeniedReason(null);
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    if (loading) {
        return <LoadingPage />
    }

    if (error) {
        return <NotFoundPage />
    }
    return (
        <>
        <div className="flex">
        {approvedOrDenied && <SettingsUpdateApprovedOrDeniedMessage approvedOrDenied={approvedOrDenied} denyReason={updateDeniedReason}/>}
        {approvedOrDenied && <Button buttonText="Close message" customClass="p-1 bg-purple-500 hover:bg-purple-600" handleButtonClickProp={()=>{handleCloseButtonClick();}}></Button>}
        
        </div>
        <div className={commonClassName}>
            <FormHeader formTitle="Settings" />
            <Form method="PATCH" handleSubmit={handleSettingsFormSubmit}>
                <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input name="username" type="text" id="username" value={currentUsername} required maxlength={100} onInputChange={setCurrentUsername}></Input>
                    <InputDescription inputDescriptionText="Username should be 1-30 characters long."></InputDescription>
                    <InputDescription inputDescriptionText="Username can only be changed once a year."></InputDescription>
                    <InputError errorText={currentUsernameError} />
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="profileImage">Profile Image</FormLabel>
                    <Button type="button" customClass="p-2 bg-purple-500 hover:bg-purple-600" buttonText="Change to default profile image" handleButtonClickProp={()=>{
                        setProfileImageFile(null);
                        setProfileImageURL("/default-profile-image.png");
                        if (profileImageFileRef.current) {
                            profileImageFileRef.current.value = ""; // Clears the first file input
                          }
                    }}></Button>
                    <ImageInput ref={profileImageFileRef} id='profileImage' name="profileImage" setFileSizeError={setProfileImageFileSizeError} currentImagePreview={profileImageURL} onImagePreviewChange={setProfileImageURL} currentImageFile={profileImageFile} onInputChange={setProfileImageFile}></ImageInput>
                    <div className="flex justify-content flex-wrap">
                        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md m-2">
                            <a href={profileImageURL} target="_blank" rel="noopener noreferrer" className="w-full h-full"> {/* Open in a new tab */}
                                <img className="w-full h-full object-cover rounded-md" src={profileImageURL} alt="not available"></img>
                            </a>
                        </div>

                    </div>
                    <InputError errorText={profileImageFileSizeError}></InputError>
                    <InputDescription inputDescriptionText="The profile image is optional and will first be reviewed by the admin before it gets shown on public."></InputDescription>
                </FormItem>
                <FormItem>
                    <FormLabel htmlFor="wechatQRCodeImage">Wechat QR Code</FormLabel>
                    <Button type="button" customClass="p-2 bg-purple-500 hover:bg-purple-600" buttonText="Change to no wechat qr code" handleButtonClickProp={()=>{
                        setWechatQRCodeImageFile(null);
                        setWechatQRCodeImageURL("/default-wechat-qr-code.png");
                        if (wechatQRCodeImageFileRef.current) {
                            wechatQRCodeImageFileRef.current.value = ""; // Clears the first file input
                          }
                    }}></Button>
                    <ImageInput ref={wechatQRCodeImageFileRef} id='wechatQRCodeImage' name="wechatQRCodeImage" setFileSizeError={setWechatQRCodeImageFileSizeError} currentImagePreview={wechatQRCodeImageURL} onImagePreviewChange={setWechatQRCodeImageURL} currentImageFile={wechatQRCodeImageFile} onInputChange={setWechatQRCodeImageFile}></ImageInput>
                    <div className="flex justify-content flex-wrap">
                        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md m-2">
                            <a href={wechatQRCodeImageURL} target="_blank" rel="noopener noreferrer" className="w-full h-full"> {/* Open in a new tab */}
                                <img className="w-full h-full object-cover rounded-md" src={wechatQRCodeImageURL} alt="not available"></img>
                            </a>
                        </div>

                    </div>
                    <InputError errorText={wechatQRCodeImageFileSizeError}></InputError>
                    <InputDescription inputDescriptionText="The wechat qr code image is optional and will first be reviewed by the admin before it gets shown on public."></InputDescription>
                </FormItem>
                <Button disabled={disableSaveButton} buttonText="Save" customClass="p-2 bg-purple-600 hover:bg-purple-700" handleButtonClickProp={() => { }}></Button>
            </Form>
            <FormSuccess innerText={formSuccess} renderSpinner={false}/>
            {disableSaveButton && <span className="text-sm ml-2 mb-2 text-gray-600">Pending update from admin, so cannot update settings for now.</span>}
            
            <FormError innerText={formError} />
            {/* <FormFooter linkTo="/change-password" footerText="Change password?"></FormFooter> */}
            {isAdmin && <div>
                <Link to={'/pending-post'}><div className="bg-blue-300 ml-2 p-2">Resolve Pending Posts</div></Link>
                <Link to={'/pending-user-updates'}><div className="bg-blue-300 ml-2 p-2">Resolve Pending User Updates</div></Link>
                </div>}
        </div>
        </>
    );
}
