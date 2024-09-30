import { Link, useLocation } from "react-router-dom";
interface NavigationBarProps {
    className?: string; // Optional prop
}

export default function NavigationBar ({className}:NavigationBarProps) {
    const location = useLocation();
    const pathname = location.pathname;
    const commonliClass:string = "hover:bg-purple-300 p-2 rounded-md w-14 larger-phones:w-20 sm:w-22 md:w-28";
    const commonspanClass:string = "hidden md:inline";
    const colorClassForSelectedli = "bg-purple-300"
    return (
        <nav className={className}>
            <ul className="flex justify-around">
                <Link to={'/market'}>
                <li className={`${pathname === '/market' ? colorClassForSelectedli : ''} ${commonliClass}`}>
                    
                        <i className="fa-solid fa-store md:pr-2"></i>
                        <span className={commonspanClass}>Market</span>
                </li>
                </Link>
                <Link to={'/new-post'}>
                <li className={`${pathname === '/new-post' ? colorClassForSelectedli : ''} ${commonliClass}`}>
                    
                        <i className="fa-solid fa-square-plus md:pr-2"></i>
                        <span className={commonspanClass}>Post</span>
                    
                </li>
                </Link>
                <Link to={'/saved'}>
                <li className={`${pathname === '/saved' ? colorClassForSelectedli : ''} ${commonliClass}`}>
                    
                        <i className="fa-solid fa-bookmark md:pr-2"></i>
                        <span className={commonspanClass}>Saved</span>
                </li>
                </Link>
                <Link to={'/myposts'}>
                <li className={`${pathname === '/myposts' ? colorClassForSelectedli : ''} ${commonliClass}`}>
                    
                        <i className="fa-solid fa-user md:pr-2"></i>
                        <span className={commonspanClass}>My Posts</span>
                    
                </li>
                </Link>
                <Link to={'/settings'}>
                <li className={`${pathname === '/settings' ? colorClassForSelectedli : ''} ${commonliClass}`}>
                    
                        <i className="fa-solid fa-gear md:pr-2"></i>
                        <span className={commonspanClass}>Settings</span>
                    
                </li>
                </Link>
            </ul>
        </nav>
    )
}
