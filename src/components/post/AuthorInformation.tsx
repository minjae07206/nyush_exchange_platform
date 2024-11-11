import Button from "components/Button";
import { useState } from "react";
interface AuthorInformationProps {
    username: string;
    email: string;
    profileImage: string;
    wechatQRCodeImage: string
}
export default function AuthorInformation({ username, email, profileImage, wechatQRCodeImage }: AuthorInformationProps) {
    const [showConnectInfo, setShowConnectInfo] = useState<boolean>(false);
    const handleConnectButtonClick = () => {
        setShowConnectInfo(true);
    }
    return (
        <div className="flex">
            <img src={`http://localhost:3001/${profileImage}`}></img>
            <p>{username}</p>
            <Button buttonText="Connect" handleButtonClickProp={handleConnectButtonClick}></Button>
            {showConnectInfo && <div>
                <div className="p-1">
                    <p>Email: {email}</p>
                    <img src={`http://localhost:3001/${wechatQRCodeImage}`}></img>
                </div>
                {/* Grey translucent background */}
                <div className="fixed top-14 inset-0 bg-gray-900 opacity-50" onClick={() => { }}></div>
                <Button buttonText="Close" handleButtonClickProp={()=>{setShowConnectInfo(false)}}></Button>
            </div>
            }
        </div>
    )
}