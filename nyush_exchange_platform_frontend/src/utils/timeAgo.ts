export function timeAgo(dateString:string) {
    const dateOfCreation:Date = new Date(dateString);
    const now:Date = new Date();
    const secondsAgo: number = Math.floor((now.getTime() - dateOfCreation.getTime()) / 1000)

    let interval:number = Math.floor(secondsAgo / 31536000);
    if (interval >= 1) return interval === 1 ? "1 year ago" : interval + " years ago";

    interval = Math.floor(secondsAgo / 2592000); // 30 days
    if (interval >= 1) return interval === 1 ? "1 month ago" : interval + " months ago";

    interval = Math.floor(secondsAgo / 604800); // 1 week (7 days)
    if (interval >= 1) return interval === 1 ? "1 week ago" : interval + " weeks ago";

    interval = Math.floor(secondsAgo / 86400); // 24 hours
    if (interval >= 1) return interval === 1 ? "1 day ago" : interval + " days ago";

    interval = Math.floor(secondsAgo / 3600); // 1 hour
    if (interval >= 1) return interval === 1 ? "1 hour ago" : interval + " hours ago";

    interval = Math.floor(secondsAgo / 60); // 1 minute
    if (interval >= 1) return interval === 1 ? "1 minute ago" : interval + " minutes ago";

    return "Just now"; // Less than a minute ago
}