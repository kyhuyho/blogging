import Table from "../../components/table/Table";
import React from "react";
import LabelStatus from "../../components/label/LabelStatus";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";
import { userRole, userStatus } from "../../utils/constants";
import { db } from "../../firebase/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UserTable = ({ userList }) => {
  const navigate = useNavigate();
  const handleDeleteUser = (user) => {
    const singleDoc = doc(db, "users", user.id);
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
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Emaill address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user?.id}>
                <td title={user?.id}>{user.id.slice(0, 5) + "..."}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={user?.avatar}
                      alt=""
                      className="w-10 h-10 rounded-md"
                    />
                    <div>
                      <h3>{user?.fullname}</h3>
                      <span className="inline-block mt-1 text-sm text-gray-400">
                        {new Date(
                          user?.createdAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </span>
                    </div>
                  </div>
                </td>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>
                  {Number(user?.status) === userStatus.ACTIVE && (
                    <LabelStatus type="success">Active</LabelStatus>
                  )}
                  {Number(user?.status) === userStatus.PENDING && (
                    <LabelStatus type="warning">Pending</LabelStatus>
                  )}
                  {Number(user?.status) === userStatus.BAN && (
                    <LabelStatus type="danger">Rejected</LabelStatus>
                  )}
                </td>
                <td>
                  {Number(user?.role) === userRole.ADMIN && <span>Admin</span>}
                  {Number(user?.role) === userRole.MOD && (
                    <span>Moderator</span>
                  )}
                  {Number(user?.role) === userRole.USER && <span>User</span>}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-user?id=${user.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteUser(user)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
