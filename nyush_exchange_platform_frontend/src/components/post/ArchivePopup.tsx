interface ArchivePopupProps {
    handleDeleteButtonClick: () => void;
    handleArchiveButtonClick: () => void;
}

import Button from "components/Button";


export default function ArchivePopup({handleDeleteButtonClick, handleArchiveButtonClick}:ArchivePopupProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center w-96">
                <h2 className="text-xl font-semibold mb-4">Archive or delete post</h2>
                <p className="mb-4">Did you make a deal? You can either archive or delete this post.</p>
                <Button customClass="p-1 bg-blue-600 hover:bg-blue-700" buttonText="Archive" handleButtonClickProp={() => { handleArchiveButtonClick(); }}></Button>
                <Button customClass="p-1 bg-red-600 hover:bg-red-700" buttonText="Delete" handleButtonClickProp={() => { handleDeleteButtonClick(); }}></Button>
            </div>
        </div>
    )
}