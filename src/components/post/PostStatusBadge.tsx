interface PostStatusBadgeProps {
    statusText: string;
}

export default function PostStatusBadge({ statusText }: PostStatusBadgeProps) {
    let colorClass = "";

    switch (statusText) {
        case "Pending":
            colorClass = "bg-amber-500";
            break;
        case "Draft":
            colorClass = "bg-gray-500";
            break;
        case "Completed":
            colorClass = "bg-gray-500";
            break;
        case "In transaction":
            colorClass = "bg-green-600";
            break;
        default:
            colorClass = "bg-gray-300"; // Default color
    }

    return (
        <span className={`rounded-md p-1 text-sm text-white ${colorClass}`}>
            {statusText}
        </span>
    );
}
