import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const CheckAuth = ({ children }) => {
    const { pathname } = useLocation();
    const { user } = useContext(ShopContext);
    const [redirect, setRedirect] = useState(null); // To prevent immediate re-renders

    useEffect(() => {
        if (!user) {
            const isProtectedRoute = pathname.includes("order") || pathname.includes("admin");
            if (isProtectedRoute) {
                setRedirect("/login");
            }
        }

         if (user === "admin" && (!pathname.includes("admin") || pathname === "/")) {
          setRedirect("/admin/add-product");
      } else if (user === "user" && pathname.includes("admin")) {
          setRedirect("/");
      } else {
          setRedirect(null);
      }
    }, [user, pathname]);

    if (redirect) {
        return <Navigate to={redirect} replace />;
    }

    return <>{children}</>;
};

export default CheckAuth;
