import { useSearchBarPopUpStore } from "stores/useSearchBarPopUpStore";
import { useNavigate } from "react-router-dom";
interface SearchBarProps {
    className?: string; // Optional prop
}

export default function SearchBar({ className }: SearchBarProps) {
    const navigate = useNavigate();
    const isSearchBarPopUpVisible: boolean = useSearchBarPopUpStore((state) => state.isSearchBarPopUpVisible);
    const showSearchBarPopUp = useSearchBarPopUpStore((state) => state.showSearchBarPopUp);
    const hideSearchBarPopUp = useSearchBarPopUpStore((state) => state.hideSearchBarPopUp);
    const searchText: string = useSearchBarPopUpStore((state) => state.searchText);
    const setSearchText = useSearchBarPopUpStore((state) => state.setSearchText);
    const handleSearchClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        hideSearchBarPopUp();
        navigate(`/search?search=${searchText}`)
    }
    return (
        <div className={className}>
            {isSearchBarPopUpVisible && (
                <>
                    {/* Grey translucent background */}
                    <div className="fixed top-14 inset-0 bg-gray-900 opacity-50" onClick={hideSearchBarPopUp}></div>

                    <div className="absolute min-w-[280px] top-0 left-0 w-full h-14 bg-purple-800">
                        <form action="search" method="get" className='flex justify-end'>
                            <div className="w-11/12 h-14">
                                <input className="w-11/12 h-14 text-2xl pl-4 mr-14" type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setSearchText(e.target.value);
                                }} />
                            </div>
                            <div className="mr-10 mt-3 ml-2">
                                <button type="submit" onClick={handleSearchClick}><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </form>
                    </div>
                </>
            )}
            <button className="hidden sm:block hover:bg-purple-800 w-10 h-10 rounded-md" onClick={showSearchBarPopUp}>
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <form action="search" method="get" className='flex justify-end sm:hidden'>
                <div className="w-full mr-2">
                    <input className="w-full pl-2" type="text" />
                </div>
                <div>
                    <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </form>
        </div>
    )
} 