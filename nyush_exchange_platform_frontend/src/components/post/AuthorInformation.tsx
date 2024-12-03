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
    const [copyIcon, setCopyIcon] = useState<string>("Copy");
    const handleConnectButtonClick = () => {
        setShowConnectInfo(true);
    }

    const handleCopyButtonClick = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopyIcon("Copied")
        } catch (error) {
            setCopyIcon("Failed");
        } finally {
            setTimeout(() => {
                setCopyIcon("Copy")
            }, 3000)
        }
    }
    return (
        <div className="flex relative items-center justify-between w-full px-2">
            {/* Profile Image and Username */}
            <div className="flex items-center">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img className="object-cover w-full h-full" src={`${process.env.REACT_APP_HOST_NAME}/${profileImage}`} alt="Profile" />
                </div>
                <p className="ml-2">{username}</p>
            </div>

            {/* Connect Button */}
            <div className="ml-auto">
                <Button
                    buttonText="Connect"
                    customClass="p-1 bg-blue-600 hover:bg-blue-700"
                    handleButtonClickProp={handleConnectButtonClick}
                />
            </div>
            {showConnectInfo && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-10"
                    onClick={() => setShowConnectInfo(false)} // Close modal when clicking on the background
                >
                    {/* White Box for Email and QR Code */}
                    <div
                        className="bg-white p-4 rounded-lg shadow-lg w-1/3 min-w-[280px] text-center"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside the white box
                    >
                        <div className="flex justify-center">
                            <p>Email: {email}</p>
                            <div className="ml-4 cursor-pointer border p-1 rounded-md border-slate-500 text-zinc-600" onClick={() => { handleCopyButtonClick(); }}>
                                {copyIcon === "Copy" && (
                                    <i className="text-xl fa-regular fa-clipboard"></i>
                                )}
                                {
                                    copyIcon === "Copied" && (
                                        <i className="text-xl fa-solid fa-check-double"></i>
                                    )
                                }
                                {
                                    copyIcon === "Failed" && (
                                        <i className="text-xl fa-solid fa-triangle-exclamation"></i>
                                    )
                                }

                            </div>
                        </div>
                        <div className="w-52 h-52 m-auto">
                            <img src={`${process.env.REACT_APP_HOST_NAME}/${wechatQRCodeImage}`} alt="WeChat QR Code" className="mt-2 object-fit" />
                        </div>
                        <Button
                            buttonText="Close"
                            customClass="mt-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded"
                            handleButtonClickProp={() => setShowConnectInfo(false)}
                        />
                    </div>
                </div>
            )}

        </div>
    )
}