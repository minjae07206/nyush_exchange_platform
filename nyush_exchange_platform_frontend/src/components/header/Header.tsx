import NavigationBar from "components/header/NavigationBar";
import Logo from "components/header/Logo";
import LogoutButton from "components/header/LogoutButton";
import SearchBar from "components/search/SearchBar";
import LoginButton from "components/header/LoginButton";
import { useLocation } from "react-router-dom";
import { useSessionStore } from "stores/useSessionStore";
export default function Header () {
    const location = useLocation();
    const currentPath = location.pathname;
    const {isLoggedIn} = useSessionStore();
    const LoginOutClassname:string = "w-2/12 sm:w-1/12 text-center content-center text-xs bg-purple-600 hover:bg-purple-700 sm:text-base mr-2 my-2";
    return (
        // The z-10 z-index is so that the header comes on top of the myposts navbar below the header.
        // Setting the z-index of the SearchBar causes a problem where the myposts navbar comes on top of the grey background when search icon is clicked.
        // This is because SearchBar is under the header context, and MyPostsNavBar is in another context. 
        // We need to adjust the hierachy between the contexts.
        <header className="sticky top-0 flex bg-purple-200 w-full min-w-[280px] h-14 justify-around font-sans z-10">
            <Logo className="w-2/12 sm:w-1/12 text-center content-center text-sm sm:text-base"></Logo>
            <NavigationBar className="w-8/12 text-center content-center hidden sm:block"></NavigationBar>
            <SearchBar className="w-6/12 sm:w-1/12 text-center content-center sm:ml-3 md:ml-10"></SearchBar>
            {
                isLoggedIn ? <LogoutButton className={LoginOutClassname}/> : <LoginButton className={LoginOutClassname}/>
            }
        </header>
    )
}