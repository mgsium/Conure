import { css } from "emotion";

const Styles = {
    TaskWindowWrapperStyle: css `
        width: 40vw;
        font-family: "Jost", sans-serif;

        @media(max-width: 700px) {
            width: 100vw;
        }
    `,
    TaskWindowContainerStyle: css `
        position: absolute;
        height: 90%;
        width: 40vw;
        border-right: 1px solid gainsboro;
        overflow-y: hidden;
        direction: rtl;
        padding: 0px;

        &::-webkit-scrollbar {
            width: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: lightgrey;
            border-radius: 5px;
        }

        &:hover {
            overflow-y: auto;
        }

        @media(max-width: 700px) {
            width: 100vw;
        }
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
            border-left: 0.5vw solid #0074d9;
        }

        &:active {
            background: rgba(0, 123, 255, 0.1);
        }

        @media(max-width: 700px) {
            max-width: 100vw;
            width: 100vw;
            height: 8vh;
            font-size: calc((2.8vw + 1vh)*0.8);

            &:hover {
                font-size: calc((2.8vw + 1vh)*0.7);
            }
        }
    `,
    FolderReturnStyle: css `
        width: 39.9vw;
        font-family: "Jost", sans-serif;
        font-weight: bold;
        font-size: 4mm;
        max-width: 39.9vw;
        min-height: 50px;
        background: rgb(236,248,127, 0.7);
        color: rgba(20, 20, 0, 0.6);

        word-wrap: break-word;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;

        transition: all 0.5s;

        &:hover {
            cursor: pointer;
            background: rgba(0,0,0,0.05);
            font-size: 0.9em;
            border-left: 0.5vw solid green;
        }

        &:active {
            background: rgba(123, 123, 0, 0.1);
        }

        @media(max-width: 700px) {
            max-width: 100vw;
            width: 100vw;
            height: 8vh;
            font-size: calc((2.8vw + 1vh)*0.8);

            &:hover {
                font-size: calc((2.8vw + 1vh)*0.7);
            }
        }
    `,
    FolderReturnIconStyle: css `
        float: left;
        position: relative;
        top: 3px;
        margin-right: 5px;
    `,
    NavDividerStyles: css `
        width: 39.9vw;
        height: 10px;
        background: rgba(0, 0, 0, 0.05);
        borderBottom: 1px solid gainsboro;
        @media(max-width: 700px) {
            width: 100vw;
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

        @media(max-width: 700px) {
            max-width: 100vw;
            width: 100vw;
            height: 8vh;
            font-size: calc((2.8vw + 1vh)*0.8);

            &:hover {
                font-size: calc((2.8vw + 1vh)*0.7);
            }
        }
    `,
    TaskWrapperStyle: css `
        width: 100%;
        border-top: 1px solid gainsboro;
        
        @media(max-width: 700px) {
            max-width: 100vw;
            width: 100vw;
            height: 8vh;
            font-size: calc(2.8vw + 1vh);;

            &:hover {
                font-size: calc(2.8vw + 1vh);*0.9);
            }
        }
    `,
    FolderWrapperStyle: css `
        width: 100%;
        border-top: 1px solid gainsboro;
    `,
    FolderIconStyles: css `
        float: left;
        position: relative;
        top: 0px;
        margin-right: 10px;
        color: rgba(50, 50, 0, 0.4);
    `,
    FolderStyle: css `
        width: 39.9vw;
        font-family: "Jost", sans-serif;
        font-weight: bold;
        font-size: 4mm;
        max-width: 39.9vw;
        min-height: 50px;
        max-height: 50px;
        background: #FFF4BD;
        color: rgba(20, 20, 0, 0.6);

        word-wrap: break-word;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;

        transition: all 0.5s;

        &:hover {
            cursor: pointer;
            background: rgba(0,0,0,0.05);
            font-size: 0.9em;
            border-left: 0.5vw solid yellow;
        }

        &:active {
            background: rgba(123, 123, 0, 0.1);
        }

        @media(max-width: 700px) {
            max-width: 100vw;
            width: 100vw;
            height: 8vh;
            max-height: 8vh;
            font-size: calc((2.8vw + 1vh) * 0.9);

            &:hover {
                font-size: calc((2.8vw + 1vh)*0.8);
            }
        }
    `,
    FolderBannerStyle: css `
        width: 39.9vw;
        font-family: "Jost", sans-serif;
        font-weight: bold;
        font-size: 4mm;
        max-width: 39.9vw;
        min-height: 40px;
        background: #FFF4BD;
        color: rgba(20, 20, 0, 0.6);

        word-wrap: break-word;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;

        transition: all 0.5s;

        &:hover {
            cursor: pointer;
            background: rgba(0,0,0,0.05);
            font-size: 0.9em;
        }

        @media(max-width: 700px) {
            max-width: 100vw;
            width: 100vw;
            height: 8vh;
            font-size: calc(2.8vw + 1vh);;

            &:hover {
                font-size: calc(2.8vw + 1vh);*0.9);
            }
        }
    `,
    SwitchButtonIconStyles: css `
        float: right;
        position: absolute;
        right: -0.1vw;
        top: 0vh;
        transition: all 0.2s;
        min-width: 50px;
        width: 4.2vw;
        height: 50px;
        border-radius: 0px;
        margin-top: 0px;
        margin-bottom: 0px;
        color: black;
        
        &:hover {
            color: white;
        }

        @media(max-width: 700px) {
            height: 8vh;
            width: 8vh;
        } 
    `,
    DeleteFolderButtonIconStyles: css `
        float: right;
        margin-top: 0px;
        margin-bottom: 0px;
        position: absolute;
        right: -0.1vw;
        bottom: 0vh;
        min-width: 50px;
        width: 4.2vw;
        height: 50px;
        border-radius: 0px;

        &:hover {
            color: white;
        }

        @media(max-width: 700px) {
            height: 8vh;
            width: 8vh;
        }
    `,
    TaskCheckButtonIconStyles: css `
        float: right;
        margin-top: 0px;
        margin-bottom: 0px;
        position: absolute;
        right: -0.1vw;
        bottom: 0;
        min-width: 50px;
        width: 4.2vw;
        min-height: 51px;
        height: 100%;
        border-radius: 0px;
        color: black;

        &:hover {
            color: white;;
        }

        @media(max-width: 700px) {
            height: 8vh;
            width: 8vh;
        }
    `,
    AddTaskBtnStyle: css `
        width: 40vw;
        max-width: 40vw;
        text-align: center;
        font-weight: bold;
        font-family: "Jost", sans-serif;
        transition: all 0.2s;
        margin-bottom: 60px;
        max-height: 50px;
        height: 50px;

        &:hover {
            cursor: pointer;
            background: rgba(217, 83, 79, 0.7);
            font-size: 1.1em;
        }

        @media(max-width: 700px) {
            max-width: 100vw;
            width: 100vw;
            height: 8vh;
            max-height: 8vh;
            font-size: calc((2.8vw + 1vh));

            &:hover {
                font-size: calc((2.8vw + 1vh)*1.1);
            }
        }
    `,
    AddFolderBtnStyle: css `
        width: 40vw;
        max-width: 40vw;
        text-align: center;
        font-weight: bold;
        font-family: "Jost", sans-serif;
        transition: all 0.2s;
        margin-bottom: 60px;
        max-height: 50px;
        height: 50px;
        background: rgba(133,210,208, 0.7);

        &:hover {
            cursor: pointer;
            background: rgb(133,210,208);
            font-size: 1.1em;
        }

        @media(max-width: 700px) {
            max-width: 100vw;
            width: 100vw;
            height: 8vh;
            max-height: 8vh;
            font-size: calc(2.8vw + 1vh);;

            &:hover {
                font-size: calc(2.8vw + 1vh);*0.9);
            }
        }
    `,
    AddItemText: css `
        display: inline-block;
        @media(min-width: 700px) {
            position: relative;
            top: 0vh;
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
    `,
    ModalSubmitBtnStyles: css `
        font-family: "Jost", sans-serif;
    `,
}

export default Styles;