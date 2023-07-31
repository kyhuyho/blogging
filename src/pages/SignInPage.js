import React, { useEffect } from "react";
import Label from "../components/label/Label";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Input from "../components/input/Input";
import Field from "../components/field/Field";
import Button from "../components/button/Button";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const schema = yup.object({
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
const SignInPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    toast.success("Login successfully!!!");
    navigate("/");
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0)
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 100,
      });
  }, [errors]);
  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthenticationPage>
      <form
        className="mt-[50px] w-full max-w-[600px] mx-auto"
        autoComplete="off"
        onSubmit={handleSubmit(handleSignIn)}
      >
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
        <div className="mx-auto text-[15px] font-medium w-max">
          You have not had an account?{" "}
          <NavLink
            to={"/sign-up"}
            className="text-[#2EBAC1] font-semibold inline-block mb-8"
          >
            Register an account
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
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
