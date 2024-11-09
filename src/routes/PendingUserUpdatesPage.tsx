import { useEffect, useState } from "react"
import axios from "axios";
import UserUpdate from "components/userUpdates/UserUpdate";
export default function PendingUserUpdatesPage () {
    const [pendingUpdatesArray, setPendingUpdatesArray] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3001/api/user/get-user-updates", {withCredentials:true})
        .then((result)=>{
            console.log(result)
            setPendingUpdatesArray(result.data);
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])

    return (
        <div className="min-w-[280px] mt-4 p-4 rounded-md bg-slate-100 md:grid md:grid-rows-2 md:grid-cols-3 md:gap-3 md:justify-items-center lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {
                pendingUpdatesArray.map((userUpdate: any)=>{
                    const newUsername:string | null = userUpdate.new_username;
                    const newWechatQRCodeImage:string | null = userUpdate.new_wechat_qr_code_image;
                    const newProfileImage:string | null = userUpdate.new_profile_image;
                    const requestId: string = userUpdate.request_id;
                    
                    return <UserUpdate key={userUpdate.request_id} requestId={requestId} newUsername={newUsername} newProfileImage={newProfileImage} newWechatQRCodeImage={newWechatQRCodeImage}></UserUpdate>
                })
            }
        </div>
    )
}