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
        width: 100%;
        font-family: "Goudy Bookletter 1911", serif;
        font-weight: bold;
        font-size: 4mm;
        max-width: 100%;
        min-height: 50px;

        word-wrap: break-word;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;
        &:hover {
            cursor: pointer;
            background: whitesmoke;
        }
    `,
    TaskWrapperStyle: css `
        width: 100%;
        border-top: 1px solid gainsboro;
    `,
    AddTaskBtnStyle: css `
        text-align: center;
        font-weight: bold;
        font-family: "Goudy Bookletter 1911", serif;
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
        font-family: "Goudy Bookletter 1911", serif;
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