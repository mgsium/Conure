import { css } from "emotion";

const Styles = {
    DetailWindowWrapperStyle: css `
        background-color: white;
        position: absolute;
        height: 64.6vh;
        z-index: -1000;
        overflow-y: auto;
        right: 0px;
        width: 60vw;
        padding: 15px;
        font-family: "Jost", sans-sans-serif;
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
        margin-bottom: 8px;

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
    DetailWindowNavStyles: css `
        font-size: 10px;
        position: relative;
        bottom: 1vh;
    `,
    ControlPanelStyles: css `
        text-align: center;
        padding: 25px;
        height: 27.7vh;

        background-color: white;
        border: 1px solid lightgrey;
        border-radius: 2px;
    `,
    ButtonStyles: css `
        font-family: 'Jost', sans-serif;
        font-size: 18px;
        margin-left: 5px;
        margin-right: 5px;
    `,
    CircleButtonStyles: css `
        width: 27px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        padding: 0;
        border-radius: 50%;
        display: inline-block;
        float:right;
        position: relative;
        top: -5vh;
    `,
    DoneButtonStyles: css `
        right: 2vw;
    `,
    DeleteButtonStyles: css `
        right: 1vw;
    `,
    SettingsButtonStyles: css `

    `,
    ResetBtnStyles: css `
        color: white;
        margin-left: 40%;
    `,
    EditorStyles: css `
        min-height: 26vh;
    `
}

export default Styles;