import slugify from "slugify";
import React from "react";
import Label from "../components/label/Label";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Input from "../components/input/Input";
import Field from "../components/field/Field";
import Button from "../components/button/Button";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRole, userStatus } from "../utils/constants";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";

const schema = yup.object({
  fullname: yup.string().required("Please enter your full name"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters or greater")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
      }
    ),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const hanleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1682687220208-22d7a2543e88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });
    toast.success("Register successfully!!!");
    navigate("/");
  };
  useEffect(() => {
    document.title = "Register Page";
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0)
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 100,
      });
  }, [errors]);
  return (
    <AuthenticationPage>
      <form
        className="mt-[50px] w-full max-w-[600px] mx-auto"
        autoComplete="off"
        onSubmit={handleSubmit(hanleSignUp)}
      >
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            name="fullname"
            type="text"
            control={control}
            placeholder="Please enter your fullname"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            name="email"
            type="email"
            control={control}
            placeholder="Please enter your email address"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="mx-auto font-medium text-[15px] w-max">
          You already have an account?{" "}
          <NavLink
            to={"/sign-in"}
            className="text-[#2EBAC1] font-semibold inline-block mb-8"
          >
            Login
          </NavLink>
        </div>
        <Button
          type="submit"
          kind="primary"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          style={{
            maxWidth: "300px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
