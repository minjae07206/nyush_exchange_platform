import { Link, useLocation } from "react-router-dom";
interface NavigationBarProps {
    className?: string; // Optional prop
}

export default function NavigationBar ({className}:NavigationBarProps) {
    const location = useLocation();
    const pathname = location.pathname;
    const commonliClass:string = "hover:bg-purple-600 p-2"
    return (
        <nav className={className}>
            <ul className="flex justify-around">
                <li className={`${pathname === '/' ? "bg-purple-600" : ''} ${commonliClass}`}><Link to={'/'}><i className="fa-solid fa-house pr-2"></i>Home</Link></li>
                <li className={`${pathname === '/new-post' ? "bg-purple-600" : ''} ${commonliClass}`}><Link to={'/new-post'}><i className="fa-solid fa-square-plus pr-2"></i>Post</Link></li>
                <li className={`${pathname === '/saved' ? "bg-purple-600" : ''} ${commonliClass}`}><Link to={'/saved'}><i className="fa-solid fa-bookmark pr-2"></i>Saved</Link></li>
                <li className={`${pathname === '/myposts' ? "bg-purple-600" : ''} ${commonliClass}`}><Link to={'/myposts'}><i className="fa-solid fa-user pr-2"></i>My Posts</Link></li>
                <li className={`${pathname === '/settings' ? "bg-purple-600" : ''} ${commonliClass}`}><Link to={'/settings'}><i className="fa-solid fa-gear pr-2"></i>Settings</Link></li>
            </ul>
        </nav>
    )
}