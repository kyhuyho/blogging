import React from "react";
import slugify from "slugify";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";

const PostFeatureItem = ({ data }) => {
  const { category, user } = data;
  const date = data?.createdAt ? data.createdAt?.seconds * 1000 : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="h-[272px] relative">
      <PostImage
        url={data?.image}
        alt=""
        borderRadius="rounded-[15px]"
        height="h-full"
      ></PostImage>
      <div className="absolute inset-0 bg-black opacity-20 rounded-[15px]"></div>
      <div className="absolute top-0 w-full p-5 font-semibold text-white">
        <div className="flex items-center justify-between mb-5 font-semibold">
          <PostCategory to={`/category/${category?.slug}`}>
            {category?.name}
          </PostCategory>
          <PostMeta
            type="secondary"
            authorName={user?.fullname}
            to={slugify(user?.fullname || "", { lower: true })}
            date={formatDate}
          ></PostMeta>
        </div>
        <PostTitle lineHeight="leading-7" size="big" to={data?.slug}>
          {data?.title}
        </PostTitle>
      </div>
    </div>
  );
};

export default PostFeatureItem;
