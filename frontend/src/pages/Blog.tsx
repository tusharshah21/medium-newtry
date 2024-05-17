import { useBlog } from "../hooks/index"
import {useParams} from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { AppBar } from "../components/Appbar";
export const Blog=()=>{
    const {id}=useParams();
    const {loading,blog}=useBlog({
        id: id||" "
    });
    if(loading|| !blog){
        return (<>
        <AppBar/>
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
            <Spinner/>
            </div>
        </div>
        </>)
    }
    return(
        <div>
            <FullBlog blog={blog}/>
        </div>
    )
}