/* eslint-disable @next/next/no-img-element */
import { getSkills } from "@/server/actions/skills";
import { Skill as SkillType } from "@/server/types/skills";
import React from "react";

const SkillIcon = ({ icon }: { icon: string }) => (
  console.log(icon), (<img src={icon} alt="Skill Icon" className="size-18" />)
);

const Skill = ({ skill }: { skill: SkillType }) => (
  <div
    key={skill.id}
    className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <SkillIcon icon={skill.icon} />
    <h3 className="text-xl font-semibold">{skill.name}</h3>
    <p className="text-sm text-gray-600">{skill.description}</p>
  </div>
);

const Skills = async () => {
  const skills = await getSkills();

  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center">
      <h2 className="text-3xl font-bold tracking-wide">Minhas habilidades</h2>
      <div className="w-full grid grid-cols-5 gap-4 items-center justify-center">
        {skills.map((skill) => (
          <Skill key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
