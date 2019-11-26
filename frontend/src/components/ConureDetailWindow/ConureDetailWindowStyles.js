import { css } from "emotion";

const Styles = {
    DetailWindowWrapperStyle: css `
        background-color: white;
        position: absolute;
        height: 90%;
        right: 0px;
        width: 60vw;
        padding: 15px;
        font-family: "Oxygen", sans-serif;
        font-weight: bold;
    `,
    TaskBodyStyle: css`
        outline: 0;
        display: inline-block;
        border-bottom: 1px solid gainsboro;
        background-color: #f3f3f3;
        padding: 20px; 
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        transition: all 0.5s;
        margin-bottom: 15px;

        font-family: 'Goudy Bookletter 1911', serif;
        font-size: 7mm;
        font-weight: normal;

        max-width: 100%;

        word-wrap: break-word;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;

        &:hover {
            border-bottom: 1px solid black;
        }
    `,
}

export default Styles;