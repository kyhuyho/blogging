import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/button/Button";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebase/firebase-config";

const DashboardHeader = () => {
  const [user, setUser] = useState(null);
  const { userInfo } = useAuth();
  const singleRef = doc(db, "users", userInfo.uid);
  useEffect(() => {
    onSnapshot(singleRef, (doc) => setUser(doc.data()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex items-center gap-x-5 justify-end p-5 border-b border-b-[#ccc]">
      <Button to="/manage/add-post" kind="primary" height="h-[55px]">
        Write new post
      </Button>
      <div className="w-[50px] h-[50px]">
        <img
          src={user?.avatar}
          alt=""
          className="object-cover w-full h-full rounded-full"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
