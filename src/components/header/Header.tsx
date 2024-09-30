import NavigationBar from "components/header/NavigationBar";
import Logo from "components/header/Logo";
import LogoutButton from "components/header/LogoutButton";
import SearchBar from "components/search_page/SearchBar";
export default function Header () {
    return (
        <header className="flex bg-purple-100 w-full min-w-[280px] h-14 justify-around font-sans">
            <Logo className="border w-2/12 sm:w-1/12 text-center content-center text-sm sm:text-base"></Logo>
            <NavigationBar className="w-8/12 text-center content-center hidden sm:block"></NavigationBar>
            <SearchBar className="w-6/12 sm:w-1/12 text-center content-center sm:ml-3"></SearchBar>
            <LogoutButton className="w-2/12 sm:w-1/12 text-center content-center text-xs sm:text-base mr-2 my-2 border-8"></LogoutButton>
        </header>
    )
}