import {Avatar} from "./BlogCard"

export const AppBar=()=>{
    return <>
    <div className="border-b py-4 flex justify-between px-10">
        <div className="flex flex-col justify-center"> Medium</div>
        <div>
            <Avatar size={"big"} name="Tushar"/>
        </div>
    </div>
    </>
}