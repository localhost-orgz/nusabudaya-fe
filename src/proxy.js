import { NextResponse } from "next/server";

export default function proxy(request) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Debug logs
  // console.log("=== [proxy debug] ===");
  // console.log("pathname:", pathname);
  // console.log("access_token:", token);

  const protectedPaths = [
    "/atlas",
    "/arena",
    "/lens",
    "/aksara",
    "/leaderboard",
  ];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  // console.log("isProtected:", isProtected);

  if (isProtected && !token) {
    console.log("Redirecting to /login because protected and no token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Access granted, proceeding");
  return NextResponse.next();
}
