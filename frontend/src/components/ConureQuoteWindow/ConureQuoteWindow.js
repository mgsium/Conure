import React, { Component } from "react";

import Container from "react-bootstrap/Container";

import { cx } from "emotion";
import Styles from "./ConureQuoteWindowStyles.js";


class ConureQuoteWindow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const quote = (
            <blockquote cite="Author">
                <p className={ cx(Styles.QuoteBody) }>Some weeks take decades to happen. Some decades happen in weeks.</p>
                <footer className={ cx(Styles.QuoteFooter, "text-muted") }>
                    <small>
                        Vladimir Ilyitch Lenin,<cite>The Chief Tasks of Our Day</cite>
                    </small>
                </footer>
            </blockquote>
        )

        return (
            <div id={this.props.id} className={ cx(Styles.QuoteWindowWrapper) }>
                <h6 className={ cx("text-muted") }>
                    <small><i>Quote</i></small>
                </h6>
                <Container>
                    {quote}
                </Container>
            </div>
        )
    }
}

export default ConureQuoteWindow;