import { css } from "emotion";

const Styles = {
    TaskWindowWrapperStyle: css `
        width: 40vw;
    `,
    TaskWindowContainerStyle: css `
        position: absolute;
        height: 90%;
        width: 40vw;
        border-right: 1px solid gainsboro;

        padding: 0px;
    `,
    TaskListStyle: css `
        width: 100%;
        margin: 0px;
        padding: 0px;
        border-bottom: 1px solid gainsboro;
    `,
    TaskStyle: css `
        width: 39.9vw;
        font-family: "Jost", sans-serif;
        font-weight: bold;
        font-size: 4mm;
        max-width: 39.9vw;
        min-height: 50px;

        word-wrap: break-word;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;

        transition: all 0.5s;

        &:hover {
            cursor: pointer;
            background: rgba(0,0,0,0.05);
            font-size: 0.9em;
            border-left: 0.5vw solid red;
        }

        &:active {
            background: rgba(0, 123, 255, 0.1);
        }
    `,
    ActiveTaskStyle: css `
        width: 39.4vw;
        font-family: "Jost", sans-serif;
        font-weight: bold;
        font-size: 4mm;
        max-width: 39.9vw;
        min-height: 50px;

        word-wrap: break-word;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;

        transition: all 0.5s;

        cursor: pointer;
        background: rgba(0,0,0,0.05);
        font-size: 0.9em;
        border-left: 5px solid red;
    `,
    TaskWrapperStyle: css `
        width: 100%;
        border-top: 1px solid gainsboro;
    `,
    AddTaskBtnStyle: css `
        width: 40vw;
        max-width: 40vw;
        text-align: center;
        font-weight: bold;
        font-family: "Jost", sans-serif;
        transition: all 0.2s;

        &:hover {
            cursor: pointer;
            background: rgba(217, 83, 79, 8);
            font-size: 1.1em;
        }
    `,
    AddTaskBtnDisabledStyle: css `
        text-align: center;
        font-weight: bold;
        font-family: "Jost", sans-serif;
        transition: all 1s;

        &:hover {
            cursor:pointer;
            background: rgba(40, 40, 20, 0.7);
        }
    `,
    DeleteIconStyle: css `
        display: absolute;
        float: right;
        margin-top: 3px;
        transition: all 0.5s;
        &:hover{
            color: rgba(217, 83, 79, 8);
            transition: all 0.5s;
        }
    `
}

export default Styles;