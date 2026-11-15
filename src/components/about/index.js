import { AboutWrapper, AttributionLogoImg, LogoImg } from "./styles/about";

export default function About({ src, children, ...restProps }) {
  return (
    <AboutWrapper data-testid="about" {...restProps}>
      <LogoImg src={src} />
      <div>{children}</div>
    </AboutWrapper>
  );
}

About.AttributionLogo = function AboutAttributionLogo({
  src,
  alt,
  ...restProps
}) {
  return <AttributionLogoImg src={src} alt={alt} {...restProps} />;
};
