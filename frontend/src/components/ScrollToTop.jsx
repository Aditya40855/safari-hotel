import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // NOT smooth (important for UX)
    });
  }, [pathname]);

  return null;
}