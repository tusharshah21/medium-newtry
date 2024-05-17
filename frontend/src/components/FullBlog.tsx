import { Blog } from "../hooks";
import { AppBar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 pt-12 max-w-screen-xl">
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd Dec. 2023</div>
            <div className="pt-2">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600">
            Author
            </div>
            <div className="flex w-full">
                <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"}/>
                </div>
              <div>
              <div className="text-xl font-bold">
                {blog.author.name || "Anonymous"}
              </div>
              <div className="pt-2 text-slate-500">
                Random catch phase about the author's ability to grab the user's attention
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
