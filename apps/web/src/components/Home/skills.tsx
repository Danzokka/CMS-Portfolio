/* eslint-disable @next/next/no-img-element */
import { getSkills } from "@/server/actions/skills";
import React from "react";

const SkillIcon = ({ icon }: { icon: string }) => (
  console.log(icon),
  <img src={icon} alt="Skill Icon" className="size-18" />
);

const Skills = async () => {

  const skills = await getSkills();

  return (
    <div className="flex gap-4">
      <SkillIcon icon={skills[0]?.icon} />
      <SkillIcon icon={skills[1]?.icon} />
    </div>
  );
};

export default Skills;
