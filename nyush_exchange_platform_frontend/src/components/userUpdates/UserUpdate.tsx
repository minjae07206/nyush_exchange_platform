import { Link } from "react-router-dom";
import Button from "components/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface UserUpdateProps {
    newWechatQRCodeImage: string | null;
    newUsername: string | null;
    newProfileImage: string | null;
    requestId: string;
    requester_user_id: string;
}

export default function UserUpdate({ requester_user_id, newWechatQRCodeImage, newProfileImage, newUsername, requestId }: UserUpdateProps) {
    const navigate = useNavigate();
    const [denyReason, setDenyReason] = useState<string>("");

    const handleProfileImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = "/default-profile-image.png";
    };

    const handleWechatQRCodeImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = "/default-wechat-qr-code.png";
    };

    const handleApproveButtonClick = () => {
        axios.patch(`${process.env.REACT_APP_HOST_NAME}/api/user/approve-update`, {
            newUsername,
            newWechatQRCodeImage,
            newProfileImage,
            requestId,
            requester_user_id,
        }, { withCredentials: true })
        .then(()=>{navigate('/pending-user-updates')})
        .catch((error)=>{console.log(error)});
    };

    const handleDenyButtonClick = () => {
        axios.patch(`${process.env.REACT_APP_HOST_NAME}/api/user/deny-update`, {
            denyReason,
            requestId,
            requester_user_id,
        }, { withCredentials: true })
        .then(()=>{navigate('/pending-user-updates')})
        .catch((error)=>{console.log(error)});
    };
    return (
        <div className="flex shadow-md bg-grey-100 h-32 larger-phones:h-40 md:h-80 md:w-60 md:rounded-md md:block cursor-pointer">
            <div className="flex w-full md:h-1/2">
                <div className="w-1/2 h-full larger-phones:w-5/12 md:h-full md:w-full">
                    <Link className="flex-shrink-0 w-full h-full" rel="noopener noreferrer" target="_blank" to={`${process.env.REACT_APP_HOST_NAME}/${newProfileImage ? newProfileImage : "/default-profile-image.png"}`}>
                        <img src={`${process.env.REACT_APP_HOST_NAME}/${newProfileImage}`} alt="not available" className="object-cover w-full h-full p-1 rounded-md" onError={handleProfileImageError}></img>
                    </Link>
                </div>
                <div className="w-1/2 h-full larger-phones:w-5/12 md:h-full md:w-full">
                    <Link className="flex-shrink-0 w-full h-full" rel="noopener noreferrer" key={newWechatQRCodeImage} target="_blank" to={`${process.env.REACT_APP_HOST_NAME}/${newWechatQRCodeImage ? newWechatQRCodeImage : "/default-wechat-qr-code.png"}`}>
                        <img src={`${process.env.REACT_APP_HOST_NAME}/${newWechatQRCodeImage}`} alt="not available" className="object-cover w-full h-full p-1 rounded-md" onError={handleWechatQRCodeImageError}></img>
                    </Link>
                </div>
            </div>
            <div className="w-2/3 larger-phones:w-7/12 px-2 md:w-full md:h-1/5 relative">
                Username: {newUsername}
            </div>
            <Button customClass="p-1 bg-green-500 hover:bg-green-600" buttonText="Approve" handleButtonClickProp={()=>{handleApproveButtonClick();}}></Button>
            <Button customClass="p-1 bg-red-500 hover:bg-red-600" buttonText="Deny" handleButtonClickProp={()=>{handleDenyButtonClick();}}></Button>
            <form className="ml-1" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="denyReason">Deny reason:</label>
                <input
                    className="pl-1 border-black border border-solid"
                    id="denyReason"
                    name="denyReason"
                    type="text"
                    value={denyReason}
                    onChange={(e) => setDenyReason(e.target.value)}
                />
            </form>
        </div>
    );
}
