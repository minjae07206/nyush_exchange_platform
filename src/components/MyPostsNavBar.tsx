import { Link } from "react-router-dom"
export default function MyPostsNavBar() {
    return (
        <nav className="min-w-[280px]">
            <ul className="flex justify-around bg-purple-100 border-t-2 border-slate-700 h-12">
                <Link className="h-12 w-1/3 border-r-2 border-slate-700 text-center pt-2" to={'/myposts/available'}><li>Available</li></Link>
                <Link className="h-12 w-1/3 border-r-2 border-slate-700 text-center pt-2" to={'/myposts/draft'}><li >Draft</li></Link>
                <Link className="h-12 w-1/3 text-center pt-2" to={'/myposts/archived'}><li>Archived</li></Link>
            </ul>
        </nav>
    )
}