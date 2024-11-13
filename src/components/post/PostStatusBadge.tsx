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
        case "Archived":
            colorClass = "bg-gray-500";
            break;
        case "In progress":
            colorClass = "bg-green-600";
            break;
        case "Denied":
            colorClass = 'bg-red-500';
            break;
        default:
            colorClass = "hidden"; // Default color
    }

    return (
        <span className={`rounded-md p-1 text-xs text-white ${colorClass}`}>
            {statusText}
        </span>
    );
}
