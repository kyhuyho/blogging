import useFirebaseImage from "../../hooks/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import slugify from "slugify";
import React from "react";
import Radio from "../../components/radio/Radio";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import ImageUpload from "../../components/image/ImageUpload";
import FieldFormLayout from "../../components/field/FieldFormLayout";
import Field from "../../components/field/Field";
import Dropdown from "../../components/dropdown/Dropdown";
import DashboardHeading from "../dasboard/DashboardHeading";
import Button from "../../components/button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { postStatus } from "../../utils/constants";
import { db } from "../../firebase/firebase-config";
import {
  serverTimestamp,
  onSnapshot,
  collection,
  addDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import Textarea from "../../components/textarea/Textarea";

const PostAddNew = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      status: postStatus.PENDING,
      hot: false,
      category: {},
    },
  });
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState("Please select category");
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const { userInfo } = useAuth();
  const {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetImage,
  } = useFirebaseImage(setValue, getValues);
  const handleAddPost = async (values) => {
    if (!isValid) return;
    try {
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        title: values.title,
        slug: slugify(values.slug || values.title, {
          lower: true,
        }),
        hot: values.hot,
        image_name: values.image_name,
        status: Number(values.status),
        category: values.category,
        content: values.content,
        createdAt: serverTimestamp(),
        image,
        user: values.user,
      });
      reset({
        title: "",
        slug: "",
        status: postStatus.PENDING,
        hot: false,
        image: "",
        content: "",
        user: {},
        category: {},
      });
      handleResetImage();
      toast.success("Create new post successfully!!!");
    } catch (error) {
      toast.error("Create new post fail!!!");
    }
  };
  useEffect(() => {
    const colRef = collection(db, "categories");
    const q = query(colRef, where("status", "==", 1));
    onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    });
  }, []);
  useEffect(() => {
    const singleDoc = doc(db, "users", userInfo?.uid);
    onSnapshot(singleDoc, (doc) => {
      setValue("user", {
        id: doc.id,
        ...doc.data(),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.uid]);
  const handleSelectDropdownOption = (item) => {
    const singleDoc = doc(db, "categories", item?.id);
    onSnapshot(singleDoc, (doc) => {
      setValue("category", {
        id: doc.id,
        ...doc.data(),
      });
    });
    setLabel(item.name);
  };
  return (
    <div className="flex-1">
      <DashboardHeading title="New post" desc="Add new post"></DashboardHeading>
      <form
        className="mb-[80px]"
        onSubmit={handleSubmit(handleAddPost)}
        autoComplete="off"
      >
        <FieldFormLayout>
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              control={control}
              placeholder="Enter your title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              name="slug"
              control={control}
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </FieldFormLayout>
        <FieldFormLayout>
          <div className="flex flex-col gap-y-10">
            <Field>
              <Label>Category</Label>
              <Dropdown label={label}>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="p-5 font-semibold border-b cursor-pointer last:border-b-0 border-b-[#ccc] transition-all hover:bg-gray-100 rounded-lg"
                      onClick={() => {
                        handleSelectDropdownOption(category);
                      }}
                    >
                      {category.name}
                    </div>
                  ))}
              </Dropdown>
            </Field>
            <Field>
              <Label>Status</Label>
              <div className="flex items-center gap-x-6">
                <Radio
                  name="status"
                  control={control}
                  value={postStatus.APPROVED}
                  checked={Number(watchStatus) === postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  value={postStatus.PENDING}
                  checked={Number(watchStatus) === postStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  value={postStatus.REJECTED}
                  checked={Number(watchStatus) === postStatus.REJECTED}
                >
                  Reject
                </Radio>
              </div>
            </Field>
            <Field>
              <Label>Feature post</Label>
              <Toggle
                on={watchHot === true}
                onClick={() => setValue("hot", !watchHot)}
              ></Toggle>
            </Field>
          </div>
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              image={image}
              progress={progress}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
        </FieldFormLayout>
        <Field>
          <Label>Content</Label>
          <Textarea
            name="content"
            control={control}
            placeholder="Enter your content"
          ></Textarea>
        </Field>
        <Button
          kind="primary"
          style={{
            maxWidth: "200px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new post
        </Button>
      </form>
    </div>
  );
};

export default PostAddNew;
