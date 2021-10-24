import { PageFooter } from "./styles/footer";

export default function Footer({ children, ...restProps }) {
  return <PageFooter {...restProps}>{children}</PageFooter>;
}
