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
    LoginLinkWrapperStyle: css `
        text-decoration: none !important;
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