import { useEffect } from "react";
import { PageFooter } from "./styles/footer";

export default function Footer({ children, ...restProps }) {
  let showFooter;
  useEffect(() => {
    showFooter = true;
    return () => {
      showFooter = false;
    };
  }, []);
  return (
    <>{showFooter && <PageFooter {...restProps}>{children}</PageFooter>}</>
  );
}
