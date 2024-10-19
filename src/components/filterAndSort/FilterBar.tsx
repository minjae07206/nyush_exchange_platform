import DropDownMenu from "./DropDownMenu";

export default function FilterBar() {
    const postStatusOptions = ['All post statuses', 'Available', 'In progress', 'Completed'];
    const categoryOptions = ['All categories', 'Books', 'Kitchen', 'Others'];
    const negotiabilityOptions = ['Select negotiability', "Open to negotiate", "Not open to negotiate"];
    const sortOptions = ['Latest first', 'Oldest first', 'Lowest price', 'Highest price', 'Most saved', 'Least saved', 'Earliest expiration', 'Latest expiration']
    const DropDownMenuClass = 'w-full text-[8px] larger-phones:text-[9px] sm:text-sm md:text-base border-solid border-stone-800 rounded-md border-2 m-[1px] h-6 md:h-8';
    return (
        <div className="flex justify-start mt-1 mb-1 min-w-[280px]">
            <DropDownMenu name="postStatusOption" className={DropDownMenuClass} options={postStatusOptions}></DropDownMenu>
            <DropDownMenu name="categoryOption" className={DropDownMenuClass} options={categoryOptions}></DropDownMenu>
            <DropDownMenu name="negotiabilityOption" className={DropDownMenuClass} options={negotiabilityOptions}></DropDownMenu>
            <DropDownMenu name="sortOption" className={DropDownMenuClass} options={sortOptions}></DropDownMenu>

        </div>
    )
}