import { signOut } from "firebase/auth";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";

const sidebardLinks = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Post",
    url: "/manage/post",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Category",
    url: "/manage/category",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "User",
    url: "/manage/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Logout",
    url: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth);
    navigate("/");
    setTimeout(() => window.location.reload(), 200);
  };
  return (
    <div className="bg-white shadow-xl w-[350px] rounded-lg py-6">
      <div className="flex items-center px-6 mb-7 gap-x-5">
        <img
          srcSet="/logo.png 2x"
          alt=""
          className="w-[50px] h-[60px] flex-shrink-0"
        />
        <h1 className="text-lg font-semibold">Monkey Blogging</h1>
      </div>
      {sidebardLinks.length > 0 &&
        sidebardLinks.map((item) => {
          if (item.title === "Logout")
            return (
              <div
                key={item.id}
                className="flex items-center px-6 py-4 text-lg font-semibold gap-x-6 hover:bg-[#2EBAC1] hover:bg-opacity-10 transition-all hover:text-[#2EBAC1] mb-4 last:mb-0 rounded-lg cursor-pointer"
                onClick={handleSignOut}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </div>
            );
          return (
            <NavLink
              key={item.id}
              to={item.url}
              className={({ isActive }) =>
                isActive
                  ? "text-[#2EBAC1] bg-[#f1fbf9] flex items-center px-6 py-4 text-lg font-semibold gap-x-6 hover:bg-[#2EBAC1] hover:bg-opacity-10 transition-all hover:text-[#2EBAC1] mb-4 last:mb-0 rounded-lg"
                  : "flex items-center px-6 py-4 text-lg font-semibold gap-x-6 hover:bg-[#2EBAC1] hover:bg-opacity-10 transition-all hover:text-[#2EBAC1] mb-4 last:mb-0 rounded-lg"
              }
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </NavLink>
          );
        })}
    </div>
  );
};

export default Sidebar;
