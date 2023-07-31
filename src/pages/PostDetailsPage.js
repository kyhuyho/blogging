import React from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useState } from "react";
import PostCategory from "../module/post/PostCategory";
import PostTitle from "../module/post/PostTitle";
import PostMeta from "../module/post/PostMeta";
import PostImage from "../module/post/PostImage";
import { useEffect } from "react";

const PostDetailsPage = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const singleRef = doc(db, "posts", postId);
  useEffect(() => {
    onSnapshot(singleRef, (doc) => setPost(doc.data()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const date = post?.createdAt ? post?.createdAt?.seconds * 1000 : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  const colRef = query(collection(db, "posts"));
  const q = query(colRef, where("slug", "==", postId));
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        setPost(doc.data());
      });
    });
  }, [postId, q]);
  return (
    <div>
      <Layout></Layout>
      <div className="container flex items-center gap-x-10">
        <div className="w-[600px] flex-shrink-0">
          <PostImage
            url={post?.image}
            borderRadius="rounded-xl"
            height="h-[450px]"
          ></PostImage>
        </div>
        <div className="flex flex-col gap-y-3">
          <PostCategory to={`/category/${post?.category?.slug}`}>
            {post?.category?.name}
          </PostCategory>
          <PostTitle size="bigger">{post?.title}</PostTitle>
          <PostMeta
            date={formatDate}
            authorName={post?.user?.fullname}
          ></PostMeta>
        </div>
      </div>
      <div className="w-[1000px] mx-auto mt-[50px]">
        <p className="font-medium leading-6 text-center">{post?.content}</p>
      </div>
    </div>
  );
};

export default PostDetailsPage;
