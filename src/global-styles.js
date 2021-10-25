import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        --clr-neon: hsl(187, 62%, 58%);
        --clr-bg: hsl(232 21% 16%);
    }
    *,
        ::after,
        ::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: #eee;
    }

    html, body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: "HelveticaNeue-CondensedBold", "Helvetica Neue", "Helvetica",
        sans-serif;
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

    h1 {
        font-size: 2.5rem;
        margin: 0 0 0.5rem 0;
    }

    h1 span {
        display: inline-block;
    }

    h2 {
        margin: 0.5rem auto;
    }

    h3 {
        font-size: 1rem;
        margin: 0 auto;
    }

    @media (min-width: 800px) {
    h1 {
            font-size: 2.5rem;
    }
    h3 {
            font-size: 1rem;
        }
    }

    @media (max-width: 400px) {
    h1 {
            font-size: 1.5rem;
    }
    h2 {
        font-size: 1.25rem;
        margin: 0.2rem 0;
    }
    h3 {
            font-size: 0.85rem;
        }
    }

`;
