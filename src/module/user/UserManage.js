import UserTable from "./UserTable";
import React from "react";
import lodash from "lodash";
import DashboardHeading from "../dasboard/DashboardHeading";
import Button from "../../components/button/Button";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
const USER_PER_PAGE = 1;

const UserManage = () => {
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleLoadMoreUser = async () => {
    const nextRef = query(
      collection(db, "users"),
      startAfter(lastDoc),
      limit(USER_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList([...userList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("username", ">=", filter),
            where("username", "<=", filter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  return (
    <div className="flex-1">
      <div className="flex items-start justify-between">
        <DashboardHeading title="Manage users informations"></DashboardHeading>
        <Button kind="third" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <div className="flex justify-end my-10">
        <input
          type="text"
          placeholder="Search user by username..."
          className="px-5 py-4 font-medium border border-gray-300 rounded-md focus:border-[#00B4AA] transition-all w-[300px]"
          onChange={lodash.debounce((e) => setFilter(e.target.value), 1000)}
        />
      </div>
      <UserTable userList={userList}></UserTable>
      {total > userList.length && (
        <div className="mt-10">
          <Button
            kind="primary"
            style={{
              width: "200px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={handleLoadMoreUser}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserManage;
