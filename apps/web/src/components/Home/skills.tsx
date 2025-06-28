/* eslint-disable @next/next/no-img-element */
import { getSkills } from "@/server/actions/skills";
import React from "react";

const SkillIcon = ({ icon }: { icon: string }) => (
  console.log(icon),
  <img src={icon} alt="Skill Icon" width={32} height={32} className="size-8" />
);

const Skills = async () => {

  const skills = await getSkills();

  return (
    <>
      <SkillIcon icon={skills[0]?.icon} />
      <SkillIcon icon={skills[1]?.icon} />
    </>
  );
};

export default Skills;
