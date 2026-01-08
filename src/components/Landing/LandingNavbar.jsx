import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const backdropRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  useGSAP(() => {
    if (isMenuOpen) {
      const tl = gsap.timeline();

      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      tl.fromTo(
        menuRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.2)" },
        "-=0.2"
      );

      tl.fromTo(
        menuItemsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }
  }, [isMenuOpen]);

  useGSAP(() => {
    gsap.from(navbarRef.current, {
      opacity: 0,
      y: "-100%",
      ease: "power4.out",
      duration: 1,
    });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsMenuOpen(false),
    });

    tl.to(menuItemsRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in",
    });

    tl.to(
      menuRef.current,
      {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.1"
    );

    tl.to(
      backdropRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.2"
    );
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className="w-[90%] md:w-[95%] lg:w-5xl px-4 md:pl-4 md:pr-2.5 h-16 border border-(--color-secondary)/50 fixed bg-(--color-primary) rounded-xl top-2 lg:top-5 z-1000 left-1/2 -translate-x-1/2 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <img src={"/logo.svg"} className="w-6" />
          <p className="font-bold text-(--color-secondary) mt-1 text-lg">
            NusaBudaya
          </p>
        </div>

        <div className="hidden md:flex items-center space-x-10 font-medium text-white">
          <a
            href="#home"
            className="relative group hover:text-(--color-secondary) transition-colors"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-(--color-secondary) transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="#fitur"
            className="relative group hover:text-(--color-secondary) transition-colors"
          >
            Fitur
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-(--color-secondary) transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="#faq"
            className="relative group hover:text-(--color-secondary) transition-colors"
          >
            FAQ
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-(--color-secondary) transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <Link
          href={"/login"}
          className="hidden md:block bg-(--color-secondary) font-semibold text-white py-2.5 px-5 rounded-lg hover:bg-[#d4b876] transition-colors"
        >
          Coba Nusabudaya
        </Link>

        {/* hamburger */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-white hover:text-(--color-secondary) transition-colors relative z-10"
        >
          <div className="relative w-6 h-6">
            <Menu
              className={`w-6 h-6 absolute transition-all duration-300 ${
                isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              }`}
            />
            <X
              className={`w-6 h-6 absolute transition-all duration-300 ${
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
            />
          </div>
        </button>
      </nav>
      {isMenuOpen && (
        <>
          {/* backdrop */}
          <div
            ref={backdropRef}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/60 z-15 backdrop-blur-sm md:hidden"
          >
            <div
              ref={menuRef}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] md:w-[95%] bg-(--color-primary) border border-(--color-secondary)/50 rounded-xl z-50 md:hidden overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 space-y-4">
                <a
                  ref={(el) => (menuItemsRef.current[0] = el)}
                  onClick={closeMenu}
                  href="#home"
                  className="text-white text-lg font-medium py-2 hover:text-(--color-secondary) transition-colors"
                >
                  Home
                </a>
                <a
                  ref={(el) => (menuItemsRef.current[1] = el)}
                  onClick={closeMenu}
                  href="#home"
                  className="text-white text-lg font-medium py-2 hover:text-(--color-secondary) transition-colors"
                >
                  Fitur
                </a>
                <a
                  ref={(el) => (menuItemsRef.current[2] = el)}
                  onClick={closeMenu}
                  href="#home"
                  className="text-white text-lg font-medium py-2 hover:text-(--color-secondary) transition-colors"
                >
                  FAQ
                </a>

                {/* Mobile CTA Button */}
                <Link
                  ref={(el) => (menuItemsRef.current[3] = el)}
                  onClick={closeMenu}
                  href={"/login"}
                  // onClick={closeMenu}
                  className="bg-(--color-secondary) font-semibold text-white py-3 px-5 rounded-lg text-center hover:bg-[#d4b876] transition-colors mt-4"
                >
                  Coba Nusabudaya
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LandingNavbar;
