import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  const items = [
    { name: "Sobre", href: "/#about" },
    { name: "Servicos", href: "/#services" },
    { name: "Projetos", href: "/#projects" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className="h-24">
      <div className="flex h-full w-full items-center justify-around gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-teal-600 dark:text-teal-300" href="/">
          <span className="sr-only">Home</span>
          <Logo />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {items.map((item) => (
                <li key={item.name}>
                  <Button variant="ghost" asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant={"default"} asChild className="font-bold">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
