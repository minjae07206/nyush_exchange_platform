interface DenyReasonProps {
    denyReason: string;
}
export default function DenyReason({denyReason}:DenyReasonProps) {
    return (
        <div className="bg-red-500 text-white text-3xl font-bold p-2 m-auto text-center">
            {denyReason}
        </div>
    )
}