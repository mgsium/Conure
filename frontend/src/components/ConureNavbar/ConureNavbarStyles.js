import { css } from "emotion";

const Styles = {
    NavbarStyle: css `
        border-bottom: 1px solid lightgrey;
        font-family: 'Jost', sans-serif;
        font-weight: bold;
        width: 100%;
        height: calc(10vh - 2vw);
        min-height: 6.2vh;
        max-height: 7.0vh;
        z-index: 1000;
    `,
    PageTitleStyle: css `
        position: absolute;
    `,
    LogoStyle: css `
        width: 25px;
        margin-right: 10px;
    `,
    LogoAnchorStyle: css `
        position: relative;
        bottom: 2.8vh;
    `,
    LogoTextStyles: css `
        display: none;
        @media(min-width: 900px) {
            display: inline;
        }
    `,
    userKeyStyle: css `
        font-family: 'Cabin Sketch', sans-serif;
        position: absolute;
        font-weight: 700;
        left: 50%;
        transform: translate(-50%,0);
        transition: all 0.5s;
        font-size: 1.4em;

        &:hover {
            color: grey;
            font-size: 1.5em;
            cursor: pointer;
        }
    `,
    SettingsIconStyle: css `
        transition: all 0.5s;
        margin-left: 25px;

        &:hover {
            color: grey;
            cursor: pointer;
            font-size: 1.2em;
        }
    `,
    ColorSelector: css `
        border-radius: 50%;
        width: 25px;
        height: 25px;
        transition: all 0.5s;
        border: 0px;
        margin-right: 5px;
        margin-left: 5px;

        &:hover {
            width: 40px;
            height: 40px;
        }
    `,
    BgDefault: css `
        background-color: rgba(220, 255, 204, 0.5);
    `,
    BgRed: css `
        background-color: rgba(255, 0, 0, 0.5);
    `,
    ModalStyles: css `
        font-family: "Jost", sans-serif;
    `,
    ModalHeaderStyles: css `
        background-color: red;
    `,
    ModalHeaderStyles: css `
        text-align: center;
        width: 100%;
    `,
    LoginLinkWrapperStyle: css `
        text-decoration: none !important;

        &:hover {
            cursor: pointer;
        }
    `,
    LoginLinkStyle: css `
        margin-left: 5vw;
        font-family: 'Jost', sans-serif;
        font-weight: bold;
        transition: all 0.5s;
        position: relative;
        bottom: 0.1vh;

        &:hover {
            color: red;
            font-size: 1.1em;
        }
    `,
    LoginText: css `
        display: none;
        margin-right: 5px;
        position: relative;
        bottom: 1px;
        @media(min-width: 900px) {
            display: inline;
        }
    `,
    CopyToClipboardStyles: css `
        color: inherit;

        &:hover {
            color: inherit;
            text-decoration: none;
        }
    `
}

export default Styles;