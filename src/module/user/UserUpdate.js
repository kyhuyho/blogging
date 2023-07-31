import slugify from "slugify";
import React from "react";
import Radio from "../../components/radio/Radio";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import FieldRadio from "../../components/field/FieldRadio";
import FieldFormLayout from "../../components/field/FieldFormLayout";
import Field from "../../components/field/Field";
import DashboardHeading from "../dasboard/DashboardHeading";
import Button from "../../components/button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userRole, userStatus } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";
import {
  updateDoc,
  serverTimestamp,
  onSnapshot,
  doc,
} from "firebase/firestore";

const UserUpdate = () => {
  const [params] = useSearchParams();
  const userId = params.get("id");
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  useEffect(() => {
    const singleDoc = doc(db, "users", userId);
    onSnapshot(singleDoc, (doc) => {
      reset(doc.data());
    });
  }, [userId, reset]);
  const handleUpdateUser = async (values) => {
    const singleDoc = doc(db, "users", userId);
    await updateDoc(singleDoc, {
      fullname: values.fullname,
      username: slugify(values.username || values.fullname, { lower: true }),
      email: values.email,
      password: values.password,
      status: Number(values.status),
      role: Number(values.role),
      createdAt: serverTimestamp(),
    });
    toast.success("Update user informations successfully!!!");
    navigate("/manage/user");
  };
  return (
    <div className="flex-1">
      <DashboardHeading
        title="Update user informations"
        desc={`Update user informations with userId: ${userId}`}
      ></DashboardHeading>
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateUser)}>
        <FieldFormLayout>
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              control={control}
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              control={control}
              placeholder="Enter your username"
            ></Input>
          </Field>
        </FieldFormLayout>
        <FieldFormLayout>
          <Field>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              control={control}
              placeholder="Enter your email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              control={control}
              placeholder="Enter your password"
            ></Input>
          </Field>
        </FieldFormLayout>
        <FieldFormLayout>
          <Field>
            <Label>Status</Label>
            <FieldRadio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldRadio>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldRadio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldRadio>
          </Field>
        </FieldFormLayout>
        <Button
          kind="primary"
          style={{
            maxWidth: "250px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
