import NavigationBar from "components/header/NavigationBar";
import Logo from "components/header/Logo";
import LogoutButton from "components/header/LogoutButton";
export default function Header () {
    return (
        <header className="flex bg-purple-500 w-full h-12 justify-around">
            <Logo className="border w-1/12 text-center content-center"></Logo>
            <NavigationBar className="w-9/12 text-center content-center"></NavigationBar>
            <LogoutButton className="border w-1/12 text-center content-center"></LogoutButton>
        </header>
    )
}