import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>
        <AppBar /> 
        <div  className="flex justify-center">
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
    </div>
}
  return (
    <>
      <AppBar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
            id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishDate={"17th May 2024"}
            />
          ))}

          {/* <BlogCard
            authorName={"Tushar"}
            title={
              "How an Ugly Single-Page Website Makres $5000 a Month with Afiliate Marketing"
            }
            content={
              "No need to create a fancy and modern website with hundreds of pages to make money online. -Making money online is the dream for man no more"
            }
            publishDate={"10th May 2024"}
          /> */}
        </div>
      </div>
    </>
  );
};
