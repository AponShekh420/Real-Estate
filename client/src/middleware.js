
const middleware = (req) => {
  const token = req.cookies.get('token').value;
}

export default middleware;

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
