import { AboutWrapper, LogoImg } from "./styles/about";

export default function About({ src, children, ...restProps }) {
  return (
    <AboutWrapper data-testid="about" {...restProps}>
      <LogoImg src={src} />
      <div>{children}</div>
    </AboutWrapper>
  );
}
