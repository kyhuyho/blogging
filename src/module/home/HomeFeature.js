import React, { useEffect } from "react";
import PostFeatureItem from "../post/PostFeatureItem";
import Heading from "../../components/heading/Heading";
import { useState } from "react";
import { db } from "../../firebase/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true)
    );
    onSnapshot(queries, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(posts);
    });
  }, []);
  if (posts.length <= 0) return null;
  return (
    <div className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {posts.length > 0 &&
            posts.map((post) => (
              <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFeature;
