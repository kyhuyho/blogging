import useFirebaseImage from "../../hooks/useFirebaseImage";
import slugify from "slugify";
import React from "react";
import Radio from "../../components/radio/Radio";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import ImageUpload from "../../components/image/ImageUpload";
import FieldRadio from "../../components/field/FieldRadio";
import FieldFormLayout from "../../components/field/FieldFormLayout";
import Field from "../../components/field/Field";
import DashboardHeading from "../dasboard/DashboardHeading";
import Button from "../../components/button/Button";
import { userRole, userStatus } from "../../utils/constants";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      status: userStatus.ACTIVE,
      role: userRole.ADMIN,
    },
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const { image, handleSelectImage, handleDeleteImage, handleResetImage } =
    useFirebaseImage(setValue, getValues);
  const handleAddUser = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        username: slugify(values.username || values.fullname, { lower: true }),
        email: values.email,
        password: values.password,
        status: Number(values.status),
        role: Number(values.role),
        avatar: image,
        createdAt: serverTimestamp(),
      });
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: userStatus.ACTIVE,
        role: userRole.ADMIN,
        avatar: "",
        createdAt: serverTimestamp(),
      });
      handleResetImage();
      toast.success("Add new user successfully!!!");
    } catch (error) {
      toast.error("Add new user fail!!!");
    }
  };
  return (
    <div className="flex-1">
      <DashboardHeading title="User" desc="Add new user"></DashboardHeading>
      <form autoComplete="off" onSubmit={handleSubmit(handleAddUser)}>
        <div className="mb-10">
          <ImageUpload
            size={true}
            image={image}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
