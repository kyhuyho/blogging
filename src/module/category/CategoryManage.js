import Table from "../../components/table/Table";
import Swal from "sweetalert2";
import React from "react";
import lodash from "lodash";
import LabelStatus from "../../components/label/LabelStatus";
import DashboardHeading from "../dasboard/DashboardHeading";
import Button from "../../components/button/Button";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import {
  where,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  collection,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
const CATEGORY_PER_PAGE = 1;

const CategoryManage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc),
      limit(CATEGORY_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList([...categoryList, ...results]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  useEffect(() => {
    async function fecthData() {
      const colRef = collection(db, "categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
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
        setCategoryList(results);
      });
      setLastDoc(lastVisible);
    }
    fecthData();
  }, [filter]);
  const handleDeleteCategory = async (docId) => {
    const singleDoc = doc(db, "categories", docId);
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
      <div className="flex items-start justify-between mb-10">
        <DashboardHeading title="Manage categories"></DashboardHeading>
        <Button kind="third" to="/manage/add-category">
          Create category
        </Button>
      </div>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 font-medium border border-gray-300 rounded-md focus:border-[#00B4AA] transition-all"
          onChange={lodash.debounce((e) => setFilter(e.target.value), 1000)}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td></td>
                <td title={category.id}>{category.id.slice(0, 5) + "..."}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic opacity-60">{category.slug}</span>
                </td>
                <td>
                  {category.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > categoryList.length && (
        <div className="mt-10">
          <Button
            kind="primary"
            style={{
              width: "200px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={handleLoadMoreCategory}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
