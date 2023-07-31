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
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const watchStatus = watch("status");
  useEffect(() => {
    const singleDoc = doc(db, "categories", categoryId);
    onSnapshot(singleDoc, (doc) => {
      reset(doc.data());
    });
  }, [categoryId, reset]);
  const handleUpdateCategory = async (values) => {
    try {
      const singleDoc = doc(db, "categories", categoryId);
      await updateDoc(singleDoc, {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: Number(values.status),
      });
      toast.success("Update category successfully!!!");
      navigate("/manage/category");
    } catch (error) {
      toast.error("Error: " + error);
    }
  };
  return (
    <div className="flex-1">
      <DashboardHeading
        title="Update category"
        desc={`Update category with categoryId: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
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
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
