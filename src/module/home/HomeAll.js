import React from "react";
import Heading from "../../components/heading/Heading";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useEffect } from "react";
import { useState } from "react";
import PostAllItem from "../post/PostAllItem";

const HomeAll = () => {
  const [posts, setPosts] = useState(null);
  const colRef = collection(db, "posts");
  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
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
    <div className="home-block">
      <div className="container">
        <Heading>Tất cả bài viết</Heading>
        <div className="grid-layout">
          {posts?.length > 0 &&
            posts.map((post) => (
              <PostAllItem key={post.id} data={post}></PostAllItem>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAll;
