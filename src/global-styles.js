import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        /* Colour */
        --clr-neon: hsl(187, 62%, 58%);
        --clr-neon-soft: hsl(187 62% 58% / 0.35);
        --clr-neon-faint: hsl(187 62% 58% / 0.12);
        --clr-bg: hsl(232 21% 16%);
        --clr-text: #eee;
        --clr-text-muted: #aaa;
        --clr-text-dim: #777;
        --clr-on-neon: #0b1a1f;
        --clr-surface: hsl(200 30% 8% / 0.55);
        --clr-surface-solid: hsl(200 35% 7%);
        --clr-surface-raised: hsl(195 30% 14% / 0.7);
        --clr-border: hsl(0 0% 100% / 0.08);
        --clr-hover: #0f3030;
        --gradient-cta: linear-gradient(90deg, #51c7d6, #59d7b3 50%, #e3dc44);

        /* Effects */
        --glow-neon: 0 0 0.6em hsl(187 62% 58% / 0.55);
        --shadow-panel: 0 20px 40px hsl(0 0% 0% / 0.35);
        --blur-panel: blur(14px);

        /* Shape and space */
        --radius-sm: 6px;
        --radius-md: 10px;
        --radius-lg: 16px;
        --radius-pill: 999px;
        --space-1: 0.25rem;
        --space-2: 0.5rem;
        --space-3: 0.75rem;
        --space-4: 1rem;
        --space-6: 1.5rem;
        --space-8: 2rem;

        /* Type */
        --font-display: "Barlow Condensed", "HelveticaNeue-CondensedBold",
            "Arial Narrow", sans-serif;
        --font-body: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    *,
        ::after,
        ::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: var(--clr-text);
    }

    html, body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: var(--font-body);
        height: 100%;
    }

    body {
        width: 100vw;
        background-image: linear-gradient(
            155deg,
            #000,
            #000 10%,
            #00192d 25%,
            #164642 85%,
            #44bb9f 110%
        );
        background-attachment: fixed;

        @media screen and (min-width: 1000px) {
            background-image: linear-gradient(
            155deg,
            #000,
            #000 17%,
            #00192d 35%,
            #164642 85%,
            #44bb9f 110%
        );
        }
    }

    h1, h2 {
        font-family: var(--font-display);
        font-weight: 700;
        letter-spacing: 0.01em;
        line-height: 1.05;
    }

    h1 {
        font-size: clamp(2.25rem, 1.5rem + 3.5vw, 4rem);
        margin: 0 0 0.5rem 0;
    }

    h1 span {
        display: inline-block;
    }

    h2 {
        font-size: clamp(1.4rem, 1.2rem + 0.8vw, 1.75rem);
        margin: 0.5rem auto;
    }

    h3 {
        font-size: 1rem;
        font-weight: 500;
        margin: 0 auto;
    }

    @media (max-width: 400px) {
        h2 {
            margin: 0.2rem 0;
        }
        h3 {
            font-size: 0.9rem;
        }
    }

    :focus-visible {
        outline: 2px solid var(--clr-neon);
        outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
        *, ::before, ::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
        }
    }
`;
