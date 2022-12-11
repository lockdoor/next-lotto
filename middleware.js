import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({req, token}) => {
      const path = req.nextUrl.pathname
      if(path.startsWith("/admin")) {
        return token?.role === "admin"
      }  else if (path.startsWith('/subadmin')){
        return token?.role === "subadmin"
      } else if (path.startsWith('/user')){
        return token?.role === "customer"
      } else {
        return false
      }
    }
  }
})

export const config = { matcher: ["/admin", "/user"] }