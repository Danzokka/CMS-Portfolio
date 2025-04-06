import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <Image
      src={"/logo/logo.svg"}
      alt="Logo"
      width={200}
      height={100}
      className="h-12 w-auto -mt-2"
      priority
    />
  );
};

export default Logo;
