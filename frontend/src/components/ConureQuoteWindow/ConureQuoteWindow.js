import React, { Component } from "react";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";

import { cx } from "emotion";
import Styles from "./ConureQuoteWindowStyles.js";


class ConureQuoteWindow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const quotes = [
            ["Some weeks take decades to happen. Some decades happen in weeks.", "Vladimir Ilyitch Lenin", "The Chief Tasks of Our Day"],
            ["He who cannnot lie does not know what the truth is.", "Friedrich Nietzsche", "Thus Spoke Zarathustra"]
        ]

        const quotesElements = quotes.map(elem => (
            <Carousel.Item>
                <h6 className={ cx("text-muted") }>
                    <small><i>Quote</i></small>
                </h6>
                <Container>
                    <blockquote cite="Author">
                        <p className={ cx(Styles.QuoteBody) }>{elem[0]}</p>
                        <footer className={ cx(Styles.QuoteFooter, "text-muted") }>
                            <small>
                                {elem[1]},<cite>{elem[2]}</cite>
                            </small>
                        </footer>
                    </blockquote>
                </Container>
            </Carousel.Item>
        ))

        return (
            <div id={this.props.id} className={ cx(Styles.QuoteWindowWrapper) }>
                <Carousel>
                    {quotesElements}
                </Carousel>
            </div>
        )
    }
}

export default ConureQuoteWindow;