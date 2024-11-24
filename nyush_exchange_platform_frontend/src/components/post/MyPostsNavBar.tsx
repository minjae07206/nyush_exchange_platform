import { Link, useLocation } from "react-router-dom"
export default function MyPostsNavBar() {
    const location = useLocation();
    const pathname = location.pathname;
    const selectedliClass:string = 'bg-purple-300'
    return (
        // the reason for setting the z-index to z-10 is because In the post section I set the position:relative in order to have the absolute saved icon position.
        // Because there is sticky and relative and the postThumbnail gets rendered after the myPostNavBar, we need to z-index to pull the nav bar back up to cover up the text as it gets scrolled.
        // Otherwise, the text in the postThumbnail will cover the nav bar.
        <nav className="sticky top-14 min-w-[280px] z-10">
            <ul className="flex justify-around bg-purple-100 border-t-2 border-slate-700 h-12">
                <Link className={`${pathname === '/myposts/available' ? selectedliClass: ''} h-12 w-1/3 border-r-2 border-slate-700 text-center pt-2 hover:bg-purple-300`} to={'/myposts/available'}><li>Available</li></Link>
                <Link className={`${pathname === '/myposts/draft-denied' ? selectedliClass: ''} h-12 w-1/3 border-r-2 border-slate-700 text-center pt-3 align-middle hover:bg-purple-300 text-sm`} to={'/myposts/draft-denied'}><li>Draft & Denied</li></Link>
                <Link className={`${pathname === '/myposts/archived' ? selectedliClass : ''} h-12 w-1/3 text-center pt-2 hover:bg-purple-300`} to={'/myposts/archived'}><li>Archived</li></Link>
            </ul>
        </nav>
    )
}