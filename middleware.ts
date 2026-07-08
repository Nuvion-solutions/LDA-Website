import { NextResponse, type NextRequest } from "next/server";

// Expose the request pathname to server components (the root layout reads it to
// decide the render language for "/es" routes). App-Router layouts can't read
// the pathname directly, so we pass it through a request header.
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Run on page routes only — skip API routes, Next internals, and static files.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
