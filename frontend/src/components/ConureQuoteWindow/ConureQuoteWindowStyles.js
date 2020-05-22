import { css } from "emotion";

const Styles = {
    QuoteWindowWrapper: css `
        background-color: white;
        position: absolute;
        height: 31vh;
        right: 0px;
        bottom: 18px;
        width: 60vw;
        padding: 15px;
        font-family: "Jost", sans-serif;
        border-top: 1px solid gainsboro;
        border-bottom: 1px solid gainsboro;
        text-align: center;
    `,
    QuoteBody: css `
        margin-top: 3vh;
        font-weight: 300;
        transition: all 1s;

        &:hover {
            font-size: 1.2em;
            color: grey;
            cursor: pointer;
        }
    `,
    QuoteFooter: css `

    `,
    CopyrightStyles: css `
        position: absolute;
        bottom: 5vh;
        font-size: 3mm;
        width: 95%;
        text-align: center;
    `
}

export default Styles;