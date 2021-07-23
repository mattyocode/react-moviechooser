import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
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
            135deg,
            #000,
            #00192d 65%,
            #164642 85%,
            #44bb9f 110%
        );
        background-attachment: fixed;
    }

    h1 {
        font-size: 1.5rem;
        margin: 0 0 0.5rem 0;
    }

    h1 span {
        display: inline-block;
    }

    h2 {
        margin: 0.5rem auto;
    }

    h3 {
        font-size: 0.6em;
        margin: 0 auto;
    }

    @media (min-width: 768px) {
    h1 {
            font-size: 2.5rem;
    }
    h3 {
            font-size: 1rem;
    }
}

`;
