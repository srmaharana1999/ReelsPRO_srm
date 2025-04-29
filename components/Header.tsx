"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Header() {
  const { data: session } = useSession();
  console.log(session);
  const handleSignout = async () => {
    try {
      await signOut();
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          ReelsPro
        </Link>
      </div>
      <div className="flex gap-6">
        {session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <div className="h-full w-full bg-amber-700"></div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-md"
            >
              <li>
                <a className="justify-between">
                  {session.user.email?.slice(0, session.user.email.length - 10)}
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link href="/upload">Upload videos</Link>
              </li>
              <li className="my-2">
                <button
                  className="btn btn-sm btn-primary btn-outline mx-auto"
                  onClick={handleSignout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link className="btn btn-sm btn-success btn-outline" href="/login">
              Sign In
            </Link>
            <Link
              className="btn btn-sm btn-secondary btn-outline"
              href="/register"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
