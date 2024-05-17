import { BlogCard } from "../components/BlogCard";
import { AppBar } from "../components/Appbar";
export const Blogs = () => {
  return (
    <>
        <AppBar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          <BlogCard
            authorName={"Tushar"}
            title={
              "How an Ugly Single-Page Website Makres $5000 a Month with Afiliate Marketing"
            }
            content={
              "No need to create a fancy and modern website with hundreds of pages to make money online. -Making money online is the dream for man no more"
            }
            publishDate={"17th May 2024"}
          />

          <BlogCard
            authorName={"Tushar"}
            title={
              "How an Ugly Single-Page Website Makres $5000 a Month with Afiliate Marketing"
            }
            content={
              "No need to create a fancy and modern website with hundreds of pages to make money online. -Making money online is the dream for man no more"
            }
            publishDate={"10th May 2024"}
          />
        </div>
      </div>
    </>
  );
};
