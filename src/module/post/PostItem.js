import React from "react";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItem = ({ data }) => {
  console.log(data);
  const date = data?.createdAt ? data?.createdAt?.seconds * 1000 : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="flex flex-col items-start">
      <PostImage
        url={data?.image}
        alt=""
        borderRadius="rounded-[15px]"
        height="h-[250px]"
        to={`/${data?.slug}`}
      ></PostImage>
      <div className="mt-[20px] font-semibold">
        <PostCategory to={`/category/${data?.category?.slug}`}>
          {data?.category?.name}
        </PostCategory>
        <PostTitle lineHeight="leading-6" to={`/${data?.slug}`}>
          {data?.title}
        </PostTitle>
        <PostMeta
          mt={true}
          authorName={data?.user?.fullname}
          date={formatDate}
        ></PostMeta>
      </div>
    </div>
  );
};

export default PostItem;
