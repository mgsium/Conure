import { css } from "emotion";

const Styles = {
    QuoteWindowWrapper: css `
        background-color: white;
        position: absolute;
        height: 38vh;
        right: 0px;
        bottom: 17.5px;
        width: 60vw;
        padding: 15px;
        font-family: "Playfair Display", serif;
        border-bottom: 1px solid gainsboro;
        text-align: center;
    `,
    QuoteBody: css `
        margin-top: 35px;
        font-weight: 300;
        transition: all 1s;

        &:hover {
            font-size: 1.2em;
            color: grey;
        }
    `,
    QuoteFooter: css `

    `
}

export default Styles;