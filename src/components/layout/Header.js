import React from "react";
import Button from "../button/Button";
import { useAuth } from "../../context/authContext";
import { NavLink } from "react-router-dom";

const menuLinks = [
  {
    id: 1,
    url: "/",
    title: "Home",
  },
];
function getLastName(name) {
  if (!name) return;
  const length = name.split(" ")?.length;
  return name.split(" ")[length - 1];
}
const Header = () => {
  const { userInfo } = useAuth();
  return (
    <header className="p-10">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="" className="w-14" />
          </NavLink>
          <ul className="flex items-center">
            {menuLinks.length > 0 &&
              menuLinks.map((item) => (
                <li key={item.id} className="ml-10 text-lg font-semibold">
                  <NavLink to={`${item.url}`}>{item.title}</NavLink>
                </li>
              ))}
          </ul>
        </div>
        <div className="flex items-center gap-x-5">
          {!userInfo ? (
            <Button
              type="button"
              kind="primary"
              height="h-[58px]"
              to="/sign-up"
              style={{
                width: "200px",
              }}
            >
              Sign Up
            </Button>
          ) : (
            <div>
              <span>Welcome back, </span>
              <strong className="text-[#00A7B4]">
                {getLastName(userInfo?.displayName)}
              </strong>
            </div>
          )}
          {userInfo && (
            <Button kind="primary" to="/dashboard" height="h-[60px]">
              Dashboard
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
