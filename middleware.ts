import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile"];

export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const refreshToken = cookiesStore.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;

  const isProvateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProvateRoute) {
    if (!accessToken) {
      if (refreshToken) {
      }
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {};
