import { css } from "emotion";

const GlobalStyles = {
    ShowOnFullScreen: css `
        display: none;
        @media(min-width: 700px) and (min-device-width: 700px){
            display: block;
        }
    `,
    ModalHeaderStyles: css `
        text-align: center;
        width: 100%;
        font-family: "Jost", sans-serif;
    `,
    LargeInputStyles: css `
        outline: 0;
        display: inline-block;
        border-bottom: 1px solid gainsboro;
        background-color: #f3f3f3;
        padding: 20px; 
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        transition: all 0.5s;

        font-family: 'Jost', sans-serif;
        font-size: 7mm;
        font-weight: normal;

        max-width: 100%;

        word-wrap: break-word;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;

        &:hover {
            border-bottom: 1px solid black;
        }

        &[placeholder]:empty::before {
            content: attr(placeholder);
            color: lightgrey;
            font-weight: 100;
        }
    `,
    Center: css `
        position: relative;
        left: 50%;
        transform: translate(-50%,0);
    `
};

export default GlobalStyles;
