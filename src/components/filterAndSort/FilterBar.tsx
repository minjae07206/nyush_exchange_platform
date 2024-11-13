import { useFilterStore } from "stores/useFilterStore";
import DropDownMenu from "./DropDownMenu";

export default function FilterBar() {
    const postStatusOptions = ['All post statuses', 'Available', 'In progress', 'Archived'];
    const categoryOptions = ['All categories', 'Books', 'Kitchenware', 'Food' ,'Others'];
    const negotiabilityOptions = ['Select negotiability', "Open to negotiate", "Not open to negotiate"];
    const sortOptions = ['Latest first', 'Oldest first', 'Lowest price', 'Highest price', 'Most saved', 'Least saved', 'Earliest expiration', 'Latest expiration']
    const DropDownMenuClass = 'w-full text-[8px] larger-phones:text-[9px] sm:text-sm md:text-base border-solid border-stone-800 rounded-md border-2 m-[1px] h-6 md:h-8';

    const postStatusOption = useFilterStore((state)=>state.postStatusOption);
    const setPostStatusOption = useFilterStore((state)=>state.setPostStatusOption);
    const postCategoryOption = useFilterStore((state)=>state.postCategoryOption);
    const setPostCategoryOption = useFilterStore((state)=>state.setPostCategoryOption);
    const negotiabilityOption = useFilterStore((state)=>state.negotiabilityOption);
    const setNegotiabilityOption = useFilterStore((state)=>state.setNegotiabilityOption);
    const orderOption = useFilterStore((state)=>state.orderOption);
    const setOrderOption = useFilterStore((state)=>state.setOrderOption);

    return (
        <div className="flex justify-start mt-1 mb-1 min-w-[280px]">
            <DropDownMenu name="postStatusOption" className={DropDownMenuClass} options={postStatusOptions} value={postStatusOption} handleSelectChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{setPostStatusOption(e.target.value);}}></DropDownMenu>
            <DropDownMenu name="categoryOption" className={DropDownMenuClass} options={categoryOptions} value={postCategoryOption} handleSelectChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{setPostCategoryOption(e.target.value);}}></DropDownMenu>
            <DropDownMenu name="negotiabilityOption" className={DropDownMenuClass} options={negotiabilityOptions} value={negotiabilityOption} handleSelectChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{setNegotiabilityOption(e.target.value);}}></DropDownMenu>
            <DropDownMenu name="sortOption" className={DropDownMenuClass} options={sortOptions} value={orderOption} handleSelectChange={(e: React.ChangeEvent<HTMLSelectElement>)=>{setOrderOption(e.target.value);}}></DropDownMenu>

        </div>
    )
}