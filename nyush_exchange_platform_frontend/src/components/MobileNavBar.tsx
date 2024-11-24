import NavigationBar from "./header/NavigationBar";

export default function MobileNavBar() {
    return (
        <section className="sticky inset-x-0 bottom-0 flex bg-purple-100 w-full min-w-[280px] h-14 justify-around font-sans sm:hidden">
            <NavigationBar className="w-full text-center content-center"></NavigationBar>
        </section>
    )
}