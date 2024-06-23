import { JwtPayload, jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("middleware");

  const session = req.cookies.get("jwt")?.value || "";
  console.log("middleware pages");
  console.log("path url ", req.nextUrl.pathname);

  if (!session) {
    // Redirect to login if no token is present
    return NextResponse.redirect(new URL("/login", req.url));
  }

    try {
        const decodedAccessToken: JwtPayload = jwtDecode(session);
        const role = decodedAccessToken.role;
        const userId = decodedAccessToken.userId;

    // Additional role-based logic can be added here if needed
    console.log("role", role);

    if (role !== "admin" && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (!role && req.nextUrl.pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow the request to proceed if the token is valid
    return NextResponse.next();
  } catch (error) {
    console.log("Error decoding token:", error);
    // Redirect to login if token decoding fails
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
