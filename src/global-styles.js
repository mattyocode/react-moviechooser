import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        /* Colour: accent */
        --clr-neon: hsl(187 62% 58%);
        --clr-neon-soft: hsl(187 62% 58% / 0.35);
        --clr-neon-faint: hsl(187 62% 58% / 0.12);
        --clr-on-neon: hsl(195 47% 8%);
        --gradient-cta: linear-gradient(
            90deg,
            hsl(187 62% 58%),
            hsl(163 62% 60%) 50%,
            hsl(58 74% 58%)
        );

        /* Colour: text, from brightest to faintest. Dim stays above 4.5:1 on
           the darkest surface. */
        --clr-text: hsl(190 20% 93%);
        --clr-text-muted: hsl(195 10% 70%);
        --clr-text-dim: hsl(195 8% 56%);

        /* Colour: background gradient stops, darkest first */
        --clr-bg-0: hsl(0 0% 0%);
        --clr-bg-1: hsl(206 100% 9%);
        --clr-bg-2: hsl(175 52% 18%);
        --clr-bg-3: hsl(166 46% 50%);
        --clr-bg: var(--clr-bg-1);

        /* Colour: surfaces over the background */
        --clr-surface: hsl(200 30% 8% / 0.55);
        --clr-surface-solid: hsl(200 35% 7%);
        --clr-surface-raised: hsl(195 30% 14% / 0.7);
        --clr-scrim: hsl(200 35% 6% / 0.8);
        --clr-field: hsl(0 0% 100% / 0.04);
        --clr-disabled: hsl(0 0% 100% / 0.08);
        --clr-border: hsl(0 0% 100% / 0.08);
        --clr-hover: hsl(180 52% 12%);

        /* Colour: ratings */
        --clr-star: hsl(48 100% 50%);
        --clr-star-empty: hsl(0 0% 27%);

        /* Colour: status */
        --clr-danger: hsl(344 71% 47%);
        --clr-warning: hsl(26 65% 54%);

        /* Effects */
        --glow-neon: 0 0 0.6em hsl(187 62% 58% / 0.55);
        --glow-cta: 0 0 1.5rem hsl(170 60% 55% / 0.35);
        --shadow-panel: 0 20px 40px hsl(0 0% 0% / 0.35);
        --blur-panel: blur(14px);

        /* Shape */
        --radius-sm: 6px;
        --radius-md: 10px;
        --radius-lg: 16px;
        --radius-pill: 999px;

        /* Space: a 4px base */
        --space-1: 0.25rem;
        --space-2: 0.5rem;
        --space-3: 0.75rem;
        --space-4: 1rem;
        --space-5: 1.25rem;
        --space-6: 1.5rem;
        --space-8: 2rem;
        --space-10: 2.5rem;
        --space-12: 3rem;
        --space-16: 4rem;

        /* Type: families */
        --font-display: "Barlow Condensed", "HelveticaNeue-CondensedBold",
            "Arial Narrow", sans-serif;
        --font-body: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;

        /* Type: scale. Nothing smaller than --fs-2xs (12px), so text stays
           readable at phone width. The top two steps grow with the viewport. */
        --fs-2xs: 0.75rem;
        --fs-xs: 0.8125rem;
        --fs-sm: 0.875rem;
        --fs-base: 1rem;
        --fs-md: 1.125rem;
        --fs-lg: 1.25rem;
        --fs-xl: 1.5rem;
        --fs-2xl: clamp(1.4rem, 1.2rem + 0.8vw, 1.75rem);
        --fs-3xl: clamp(2.25rem, 1.5rem + 3.5vw, 4rem);
        --lh-tight: 1.05;
        --lh-snug: 1.25;
        --lh-body: 1.5;
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
        /* Shows before the gradient paints, and wherever it doesn't reach. */
        background-color: var(--clr-bg);
        background-image: linear-gradient(
            155deg,
            var(--clr-bg-0),
            var(--clr-bg-0) 10%,
            var(--clr-bg-1) 25%,
            var(--clr-bg-2) 85%,
            var(--clr-bg-3) 110%
        );
        background-attachment: fixed;

        @media screen and (min-width: 1000px) {
            background-image: linear-gradient(
            155deg,
            var(--clr-bg-0),
            var(--clr-bg-0) 17%,
            var(--clr-bg-1) 35%,
            var(--clr-bg-2) 85%,
            var(--clr-bg-3) 110%
        );
        }
    }

    h1, h2 {
        font-family: var(--font-display);
        font-weight: 700;
        letter-spacing: 0.01em;
        line-height: var(--lh-tight);
    }

    h1 {
        font-size: var(--fs-3xl);
        margin: 0 0 var(--space-2) 0;
    }

    h1 span {
        display: inline-block;
    }

    h2 {
        font-size: var(--fs-2xl);
        margin: var(--space-2) auto;
    }

    h3 {
        font-size: var(--fs-base);
        font-weight: 500;
        margin: 0 auto;
    }

    @media (max-width: 400px) {
        h2 {
            margin: var(--space-1) 0;
        }
        h3 {
            font-size: var(--fs-sm);
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
