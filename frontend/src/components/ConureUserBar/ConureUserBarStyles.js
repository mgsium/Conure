import { css } from "emotion";

const Styles = {
    UserBarStyle: css `
        border-top: 1px solid lightgrey;
        height: 6vh;
    `,
    HelpDiv: css `
        position: relative;
        left: 35.5%;
        transform: translate(-50%,0);
        bottom: 0.2vh;
        transition: all 0.5s;

        &:hover {
            cursor: pointer;
            font-size: 1.1em;
        }

        @media(max-width: 600px) {
            display: none;
        }
    `,
    HelpText: css `
        font-family: "Jost", sans-serif;
        display: none;
        margin-right: 5px;
        margin-bottom: 0.2vh;

        @media(min-width: 700px) {
            display: inline;
        }
    `,
    HelpIcon: css `
        
    `,
    ProgressBarWrapperStyle: css `
        width: 55.06vw;
        position: absolute;
        right: 5vw;
        bottom: -4vh;
        height: 12.9vh;
        border-left: 1px solid gainsboro;

        @media(max-width: 700px) {
            width: 80vw;
            border: none;
        }
    `,
    ProgressBarStyle: css `
        position: relative;
        bottom: -3.5vh;
        width: 37vw;
        float: right;
        right: -2vw;
        margin-top: 1.45vh;
        height: 1.7vh;

        @media(max-width: 700px) {
            width: 60vw;
        }
    `,
    LevelImage: css `
        height: 5vh;
        max-height: 4vh;
    `,
    LevelData: css `
        font-family: "Jost", sans-serif;
        font-weight: bold;
        display: inline-block;
        position: absolute;
        right: 40vw;
        bottom: 4.25vh;

        @media(max-width: 700px) {
            position: absolute;
            left: -10vw;
        }
    `,
    NavbarTextStyles: css `
        position: absolute;
        bottom: 3px;
        font-family: "Jost", sans-serif;

        @media(max-width: 700px) {
            display: none;
        }
    `
}

export default Styles;