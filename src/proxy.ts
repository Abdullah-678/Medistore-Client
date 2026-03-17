import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let role: string | null = null;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    role = data.user.role;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ADMIN
  if (role === Roles.admin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // SELLER
  if (role === Roles.seller && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  // CUSTOMER trying to access admin or seller dashboard
  if (
    role === Roles.customer &&
    (pathName.startsWith("/admin-dashboard") ||
      pathName.startsWith("/seller-dashboard"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // SELLER trying to access admin dashboard
  if (role === Roles.seller && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/seller-dashboard", request.url));
  }

  console.log(data);
  console.log(pathName);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
  ],
};