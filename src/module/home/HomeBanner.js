import React from "react";
import Button from "../../components/button/Button";

const HomeBanner = () => {
  return (
    <div className="min-h-[520px] bg-gradient-to-r from-[#00B4AA] to-[#A4D96C] py-10">
      <div className="container flex items-center justify-between">
        <div className="text-white max-w-[600px]">
          <h1 className="font-semibold text-[50px] mb-5">Monkey Blogging</h1>
          <p className="leading-7 mb-7">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            incidunt inventore magni exercitationem aliquid esse facilis sunt
            provident, libero beatae necessitatibus repudiandae minus vitae
            architecto. Molestiae aperiam laboriosam nesciunt tempora.
          </p>
          <Button
            type="button"
            to="/sign-in"
            kind="secondary"
            style={{
              width: "200px",
            }}
          >
            Get started
          </Button>
        </div>
        <div>
          <img srcSet="/img-banner.png 2x" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
