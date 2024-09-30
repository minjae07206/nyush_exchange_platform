import { Link } from "react-router-dom"

export default function Footer() {
    const spanCommonClass = 'm-4 flex larger-phones:inline text-[12px] sm:text-base'
    return (
        <footer className="bg-purple-800 text-white p-3 w-full min-w-[280px]">
            <div className="flex">
                <span className={spanCommonClass}>Developer: Minjae Lee</span>
                <span className={spanCommonClass}>Class of 2025</span>
                <span className={spanCommonClass}>Email: ml6722@nyu.edu</span>
            </div>
            <div className="">
                <span className={spanCommonClass}>Hosted on: Amazon Web Services Example</span>
            </div>
            <div className="">
                <a href="https://shanghai.nyu.edu/campuslife/community-standards" target="_blank"><span className={spanCommonClass}><b>Community guidelines</b></span></a>
            </div>
        </footer>
    )
}