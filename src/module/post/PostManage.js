import Table from "../../components/table/Table";
import Swal from "sweetalert2";
import React from "react";
import loadash from "lodash";
import LabelStatus from "../../components/label/LabelStatus";
import DashboardHeading from "../dasboard/DashboardHeading";
import Button from "../../components/button/Button";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { useState } from "react";
import { useEffect } from "react";
import { postStatus } from "../../utils/constants";
import { db } from "../../firebase/firebase-config";
import {
  where,
  startAfter,
  query,
  onSnapshot,
  limit,
  getDocs,
  doc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const POST_PER_PAGE = 1;

const PostManage = () => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState("");
  const [total, setTotal] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
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
        setPostList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc),
      limit(POST_PER_PAGE)
    );
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...results]);
    });
    setLastDoc(lastVisible);
  };
  const handleDeletePost = (docId) => {
    const singleDoc = doc(db, "posts", docId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(singleDoc);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div className="flex-1">
      <div className="flex items-start justify-between">
        <DashboardHeading title="Manage posts"></DashboardHeading>
        <Button kind="third" to="/manage/add-post">
          Add new post
        </Button>
      </div>
      <div className="mt-[50px] flex justify-end">
        <input
          type="text"
          className="border border-[#ccc] p-4 rounded-md focus:border-[#2EBAC1] transition-all block w-[300px] font-medium"
          placeholder="Search post by title..."
          onChange={loadash.debounce((e) => setFilter(e.target.value), 500)}
        />
      </div>
      <div className="mt-[50px]">
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Post</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postList.length > 0 &&
              postList.map((post) => (
                <tr key={post.id}>
                  <td></td>
                  <td title={post.id}>{post.id.slice(0, 5) + "..."}</td>
                  <td>
                    <div className="flex items-center gap-x-5">
                      <img
                        src={post.image}
                        alt=""
                        className="w-[65px] h-[55px] object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <span>{post.title}</span>
                        <span className="inline-block mt-1 text-base text-gray-400">
                          Date:{" "}
                          {new Date(
                            post.createdAt?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{post?.category?.name}</td>
                  <td>{post?.user?.fullname}</td>
                  <td>
                    {Number(post.status) === postStatus.APPROVED && (
                      <LabelStatus type="success">Approved</LabelStatus>
                    )}
                    {Number(post.status) === postStatus.PENDING && (
                      <LabelStatus type="warning">Pending</LabelStatus>
                    )}
                    {Number(post.status) === postStatus.REJECTED && (
                      <LabelStatus type="danger">Rejected</LabelStatus>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <ActionView
                        onClick={() => navigate(`/${post.id}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-post?id=${post.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeletePost(post?.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {total > postList.length && (
        <div className="mt-10">
          <Button
            kind="primary"
            style={{
              width: "200px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={handleLoadMorePost}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostManage;
