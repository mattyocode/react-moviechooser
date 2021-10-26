import { useEffect, useRef } from "react";
import { PageFooter } from "./styles/footer";

export default function Footer({ children, ...restProps }) {
  const footerRef = useRef();
  useEffect(() => {
    footerRef.current = true;
    return () => {
      footerRef.current = false;
    };
  }, []);
  return (
    <>
      {footerRef.current && <PageFooter {...restProps}>{children}</PageFooter>}
    </>
  );
}
