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
    `,
    CenterScreen: css `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
        margin-bottom: 5wh;
    `
}

export default Styles;