"use client";

import { Sanchez } from "next/font/google";
import styles from "./header.module.scss";
import { c } from "@/lib/utils";
import { mediaQuery } from "@/lib/utils/client";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";

const sanchez = Sanchez({
  variable: "--font-sanchez",
  weight: "400",
});

const links = [
  <Link key="all" href="/">
    home
  </Link>,
  <Link key="recent" href="/recent">
    recent
  </Link>,
  <Link key="tags" href="/tags">
    tags
  </Link>,
  <Link key="sean" href="https://seanline.dev" className={styles.sean}>
    sean
  </Link>,
];

const LinksDropdown = ({
  navOpen,
  toggleNav,
}: {
  navOpen: boolean;
  toggleNav: () => void;
}) => {
  const onButtonClick: MouseEventHandler = () => {
    toggleNav();
  };
  return (
    <>
      <ul
        className={c(styles.links_dropdown, navOpen ? styles.open : "")}
        id="dropdown-ul"
      >
        {links.map((link) => (
          <li key={link.key}>{link}</li>
        ))}
      </ul>
      <button
        className={styles.menu_button}
        onClick={onButtonClick}
        id="dropdown-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </>
  );
};

const LinksInline = () => {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.key}>{link}</li>
      ))}
    </ul>
  );
};

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const toggleMenuFunc = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    const resizeListener: EventListener = () => {
      const queryResponse = mediaQuery("mobile");
      if (queryResponse?.matches) {
        setIsMobile(true);
        return;
      }
      setIsMobile(false);
    };

    const clickOutsideDropdownListener: EventListener = (e) => {
      const dropdownUl = document.getElementById("dropdown-ul");
      const dropdownButton = document.getElementById("dropdown-button");
      if (
        !dropdownButton?.contains(e.target as Node) &&
        !dropdownUl?.contains(e.target as Node)
      ) {
        setNavOpen(false);
      }
    };

    resizeListener({} as Event);

    window.addEventListener("resize", resizeListener);
    document.addEventListener("click", clickOutsideDropdownListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
      document.removeEventListener("click", clickOutsideDropdownListener);
    };
  }, []);

  return (
    <header className={styles.header}>
      <nav className={c(sanchez.className, styles.navbar)}>
        <Link href="/" className={styles.logo}>
          <h1>b</h1>
          <h1>l</h1>
          <h1>e</h1>
          <h1>rg</h1>
        </Link>
        {!isMobile ? (
          <LinksInline />
        ) : (
          <LinksDropdown navOpen={navOpen} toggleNav={toggleMenuFunc} />
        )}
      </nav>
    </header>
  );
};

export default Header;
