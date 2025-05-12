import React from "react";
import { TypingAnimation } from "../magicui/typing-animation";
import { WordRotate } from "../magicui/word-rotate";
import { BoxReveal } from "../magicui/box-reveal";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col w-full justify-between gap-6 py-10 px-8">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2">
          <TypingAnimation className="text-4xl font-bold tracking-wide" duration={100}>
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
          <BoxReveal duration={2}>
            <div className="flex flex-col gap-4 text-lg">
              <p>
                Sou um desenvolvedor fullstack com experiência em criar soluções
                de ponta a ponta, sempre buscando combinar design intuitivo com
                código eficiente e escalável.
              </p>

              <p>
                Minha paixão está na criação de aplicações web modernas que
                oferecem experiências excepcionais aos usuários, sempre com foco
                em performance e acessibilidade.
              </p>
            </div>
          </BoxReveal>

          <BoxReveal>
            <div className="flex gap-4">
              <Button size={"lg"} className="bg-orange-800 text-white font-bold hover:bg-orange-700">
                Projetos
              </Button>
              <Button size={"lg"}>
                Contato
              </Button>
            </div>
          </BoxReveal>
        </div>
      </div>
    </div>
  );
};

export default Hero;
