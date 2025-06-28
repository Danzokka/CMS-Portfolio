import Hero from "@/components/Home/hero";
import Skills from "@/components/Home/skills";
import { getServerSession } from "next-auth";
import React from "react";

const Home = async () => {
  const session =  await getServerSession();

  console.log("[Home] Session:", session);
  
  return (
    <div className="w-full h-full flex-col items-center justify-center">
      <Hero />
      <Skills />
    </div>
  );
};

export default Home;
