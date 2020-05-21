import { css } from "emotion";

const Styles = {
    UserBarStyle: css `
        border-top: 1px solid lightgrey;
        height: 6vh;
    `,
    ProgressBarWrapperStyle: css `
        width: 55.06vw;
        position: absolute;
        right: 5vw;
        bottom: -4vh;
        height: 12.9vh;
        border-left: 1px solid gainsboro;
    `,
    ProgressBarStyle: css `
        position: relative;
        bottom: -3.5vh;
        width: 37vw;
        float: right;
        right: -2vw;
        margin-top: 1.45vh;
        height: 1.7vh;
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
    `,
    NavbarTextStyles: css `
        position: absolute;
        bottom: 3px;
    `
}

export default Styles;