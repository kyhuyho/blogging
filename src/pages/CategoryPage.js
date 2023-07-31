import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { db } from "../firebase/firebase-config";
import PostItem from "../module/post/PostItem";

const CategoryPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState(null);
  const colRef = collection(db, "posts");
  const q = query(colRef, where("category.slug", "==", slug));
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Layout></Layout>
      <div className="container">
        <h1 className="text-3xl font-semibold">Danh mục {slug}</h1>
        <div className="mt-5 grid-layout">
          {posts?.length > 0 &&
            posts.map((post) => (
              <PostItem key={post.id} data={post}></PostItem>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
