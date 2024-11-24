interface SettingsUpdateApprovedOrDeniedMessageProps {
    denyReason: string | null;
    approvedOrDenied: string | null;
}
export default function SettingsUpdateApprovedOrDeniedMessage({denyReason, approvedOrDenied}: SettingsUpdateApprovedOrDeniedMessageProps) {
    const colorClassName = approvedOrDenied === "approved" ? "bg-green-500": "bg-red-500"
    const denyReasonMessage = denyReason ? denyReason : "Reason not available."
    return (
        <div className={`${colorClassName} text-white`} >
            {approvedOrDenied === "approved" ? "User update has been approved." : `User update has been denied. Deny reason : ${denyReasonMessage}`}
        </div>
    )
}