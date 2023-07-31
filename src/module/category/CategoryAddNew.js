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
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CategoryAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      status: categoryStatus.APPROVED,
    },
  });
  const navigate = useNavigate();
  const watchStatus = watch("status");
  const handleAddCategory = async (values) => {
    if (!isValid) return;
    try {
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        name: values.name,
        slug: slugify(values.name || values.slug, {
          lower: true,
        }),
        status: Number(values.status),
        createdAt: serverTimestamp(),
      });
      reset({
        name: "",
        slug: "",
        status: categoryStatus.APPROVED,
      });
      toast.success("Create new category successfully!!!");
      navigate("/manage/category");
    } catch (error) {
      toast.error("Create new category fail!!!");
    }
  };
  return (
    <div className="flex-1">
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddCategory)} autoComplete="off">
        <FieldFormLayout>
          <Field>
            <Label>Name</Label>
            <Input
              name="name"
              control={control}
              placeholder="Enter your category"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              name="slug"
              control={control}
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </FieldFormLayout>
        <div className="mb-[100px]">
          <Field>
            <Label>Status</Label>
            <FieldRadio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldRadio>
          </Field>
        </div>
        <Button
          kind="primary"
          style={{
            maxWidth: "250px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
