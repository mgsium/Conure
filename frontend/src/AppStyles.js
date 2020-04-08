import { css } from "emotion";

const Styles = {
    LoadingScreen: css `
        position:fixed;
        z-index: 9999;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background:rgba(0,0,0,.5);
    `,
    AppWrapperStyle: css `
        background-color: rgba(220, 255, 204, 0.5);
    `,
    CenterScreen: css `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
    `
}

export default Styles;