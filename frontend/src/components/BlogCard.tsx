import {Link} from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id:number
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
  id
}: BlogCardProps) => {
  return (
    <>
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
          <div className="flex justify-center flex-col">
            <Avatar size={"small"} name={authorName} />
          </div>
          <div className="font-extralight pl-2 flex justify-center flex-col">{authorName}</div>
          <div className="flex flex-col justify-center pl-2">
            <div className="h-1 w-1 rounded-full bg-slate-500"/>
          </div>
          <div className="pl-2 font-thin text-slate-500 flex justify-center flex-col">{publishDate}</div>
        </div>
      <div className="text-xl font-semibold pt-2">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-sm font-thin text-slate-400 pt-4">{`${Math.ceil(content.length / 100)} minute(s)`}</div>
      {/* <div className="text-slate-400 bg-slate-200 h-1 w-full"></div> */}
      </div>
      </Link>
    </>
  );
};

export function Avatar({ name,size="small" }: { name: string, size: "small"|"big" }) {
  // console.log("Rendering Avatar with name:", name);

  return (
    <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span className={`${size==="small"?"text-xs":"text-md"} font-xs text-gray-600 dark:text-gray-300`}>
        {name[0]} 
      </span>
    </div>
  );
}
