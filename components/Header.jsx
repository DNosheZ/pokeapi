"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { clearToken } from "@/utils/authClient";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hideSignUp = pathname === "/auth/signup";
  const hideLogin = pathname === "/auth/login";
  const hideProfile = pathname === "/auth/profile";
  const hidePokecatalog = pathname === "/auth/catalog";

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-[var(--purple-1)]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img src="/images/9 (1).png" className="mr-3 h-6 sm:h-9" alt="PokeAPI Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              PokeAPI
            </span>
          </a>

          <div className="flex items-center lg:order-2">
            {!session?.user ? (
              <>
                {!hideSignUp && (
                  <a
                    href="/auth/signup"
                    className="text-[var(--white)] bg-[var(--green-1)] hover:bg-[var(--green-1)] active:bg-[var(--green-3)]
                               focus:ring-4 focus:ring-[color:var(--green-1)]/40
                               font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2
                               shadow-[0_2px_4px_0_var(--grey-3)]
                               focus:outline-none"
                  >
                    Sign Up
                  </a>
                )}

                {!hideLogin && (
                  <a
                    href="/auth/login"
                    className="text-[var(--white)] bg-[var(--grey-1)] hover:bg-[var(--grey-1)] active:bg-[var(--grey-3)]
                               focus:ring-4 focus:ring-[color:var(--grey-2)]/40
                               font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2
                               shadow-[0_2px_4px_0_var(--grey-3)]
                               focus:outline-none"
                  >
                    Login
                  </a>
                )}
              </>
            ) : (
              <>
                {!hidePokecatalog && (
                  <a
                    href="/auth/catalog"
                    className="text-[var(--white)] bg-[var(--green-1)] hover:bg-[var(--green-1)] active:bg-[var(--green-3)]
                               focus:ring-4 focus:ring-[color:var(--green-1)]/40
                               font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2
                               shadow-[0_2px_4px_0_var(--grey-3)]
                               focus:outline-none"
                  >
                    Poke Catalog
                  </a>
                )}

                {!hideProfile && (
                  <a
                    href="/auth/profile"
                    className="text-[var(--white)] bg-[var(--green-1)] hover:bg-[var(--green-1)] active:bg-[var(--green-3)]
                               focus:ring-4 focus:ring-[color:var(--green-1)]/40
                               font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2
                               shadow-[0_2px_4px_0_var(--grey-3)]
                               focus:outline-none"
                  >
                    Profile
                  </a>
                )}

                <button
                  onClick={() => { clearToken(); signOut({ callbackUrl: "/" }) }}
                  className="text-[var(--white)] bg-[var(--grey-1)] hover:bg-[var(--grey-1)] active:bg-[var(--grey-3)]
                             focus:ring-4 focus:ring-[color:var(--grey-2)]/40
                             font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2
                             shadow-[0_2px_4px_0_var(--grey-3)]
                             focus:outline-none"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
