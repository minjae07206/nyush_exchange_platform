import { Link, useLocation } from "react-router-dom";
interface NavigationBarProps {
    className?: string; // Optional prop
}

export default function NavigationBar ({className}:NavigationBarProps) {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <nav className={className}>
            <ul className="flex justify-around">
                <li className={`${pathname === '/' ? "bg-purple-600" : ''} hover:bg-purple-600 border`}><Link to={'/'}>Home</Link></li>
                <li className={`${pathname === '/new-post' ? "bg-purple-600" : ''} hover:bg-purple-600 border`}><Link to={'/new-post'}>Post</Link></li>
                <li className={`${pathname === '/saved' ? "bg-purple-600" : ''} hover:bg-purple-600 border`}><Link to={'/saved'}>Saved</Link></li>
                <li className={`${pathname === '/myposts' ? "bg-purple-600" : ''} hover:bg-purple-600 border`}><Link to={'/myposts'}>My Posts</Link></li>
                <li className={`${pathname === '/settings' ? "bg-purple-600" : ''} hover:bg-purple-600 border`}><Link to={'/settings'}>Settings</Link></li>
            </ul>
        </nav>
    )
}