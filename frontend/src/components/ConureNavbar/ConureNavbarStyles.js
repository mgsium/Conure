import { css } from "emotion";

const Styles = {
    NavbarStyle: css `
        border-bottom: 1px solid lightgrey;
        font-family: 'Oxygen', sans-serif;
        font-weight: bold;
        width: 100%;
    `,
    LogoStyle: css `
        width: 8%;
        margin-right: 4%;
    `,
    userKeyStyle: css `
        font-family: 'Goudy Bookletter 1911', serif;
        font-weight: bold;
        position: absolute;
        left: 50%;
        transform: translate(-50%,0);
        transition: all 0.5s;

        &:hover {
            color: grey;
            font-size: 1.1em;
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
    LoginLinkWrapperStyle: css `
        text-decoration: none !important;

        &:hover {
            cursor: pointer;
        }
    `,
    LoginLinkStyle: css `
        margin-left: 5vw;
        font-family: 'Goudy Bookletter 1911', serif;
        font-weight: bold;
        transition: all 0.5s;

        &:hover {
            color: red;
            font-size: 1.1em;
        }
    `,
}

export default Styles;