import Toggle from "../../components/toggle/Toggle";
import Textarea from "../../components/textarea/Textarea";
import React, { useEffect } from "react";
import Radio from "../../components/radio/Radio";
import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import FieldFormLayout from "../../components/field/FieldFormLayout";
import Field from "../../components/field/Field";
import Dropdown from "../../components/dropdown/Dropdown";
import DashboardHeading from "../dasboard/DashboardHeading";
import Button from "../../components/button/Button";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postStatus } from "../../utils/constants";
import { db } from "../../firebase/firebase-config";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState("Please select category");
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
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
    const singleDoc = doc(db, "posts", postId);
    onSnapshot(singleDoc, (doc) => {
      reset(doc.data());
      setLabel(doc.data()?.category?.name);
    });
  }, [postId, reset]);
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
  const handleUpdatePost = async (values) => {
    console.log(values);
  };
  return (
    <div className="flex-1">
      <DashboardHeading
        title="Update post"
        desc="Update post content"
      ></DashboardHeading>
      <form
        className="mb-[80px]"
        onSubmit={handleSubmit(handleUpdatePost)}
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
                    {category?.name}
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
        </FieldFormLayout>
        <FieldFormLayout>
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
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
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
