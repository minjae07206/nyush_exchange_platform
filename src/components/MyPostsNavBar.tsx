import { Link, useLocation } from "react-router-dom"
export default function MyPostsNavBar() {
    const location = useLocation();
    const pathname = location.pathname;
    const selectedliClass:string = 'bg-purple-300'
    return (
        <nav className="sticky top-14 min-w-[280px] -z-50">
            <ul className="flex justify-around bg-purple-100 border-t-2 border-slate-700 h-12">
                <Link className={`${pathname === '/myposts/available' ? selectedliClass: ''} h-12 w-1/3 border-r-2 border-slate-700 text-center pt-2 hover:bg-purple-300`} to={'/myposts/available'}><li>Available</li></Link>
                <Link className={`${pathname === '/myposts/draft' ? selectedliClass: ''} h-12 w-1/3 border-r-2 border-slate-700 text-center pt-2 hover:bg-purple-300`} to={'/myposts/draft'}><li >Draft</li></Link>
                <Link className={`${pathname === '/myposts/archived' ? selectedliClass : ''} h-12 w-1/3 text-center pt-2 hover:bg-purple-300`} to={'/myposts/archived'}><li>Archived</li></Link>
            </ul>
        </nav>
    )
}