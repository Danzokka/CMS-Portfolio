import React from "react";
import { TypingAnimation } from "../magicui/typing-animation";
import { WordRotate } from "../magicui/word-rotate";
import { BoxReveal } from "../magicui/box-reveal";

const Hero = () => {
  return (
    <div className="flex flex-col w-full justify-between gap-6 py-10">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2">
          <TypingAnimation
            className="text-4xl font-bold tracking-wide"
            duration={100}
          >
            Olá, eu sou
          </TypingAnimation>
          <TypingAnimation
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-800 tracking-wide"
            delay={1500}
            duration={100}
          >
            Rafael Dantas
          </TypingAnimation>
        </div>

        <BoxReveal duration={2} boxColor="transparent">
          <WordRotate
            className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-2 tracking-wider"
            words={[
              "Desenvolvedor Fullstack",
              "Web Developer",
              "DevOps",
              "Arquiteto de Software",
            ]}
          />
        </BoxReveal>

        <div className="mt-2 space-y-4 text-lg text-gray-700 dark:text-gray-300">
          <div className="flex flex-col gap-4 text-lg">
            <TypingAnimation
              className="text-lg font-medium"
              duration={30}
              delay={1500}
            >
              Sou um desenvolvedor fullstack com experiência em criar soluções
              de ponta a ponta, sempre buscando combinar design intuitivo com
              código eficiente e escalável.
            </TypingAnimation>

            <TypingAnimation
              className="text-lg font-medium"
              duration={30}
              delay={7 * 1000}
            >
              Minha paixão está na criação de aplicações web modernas que
              oferecem experiências excepcionais aos usuários, sempre com foco
              em performance e acessibilidade.
            </TypingAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
