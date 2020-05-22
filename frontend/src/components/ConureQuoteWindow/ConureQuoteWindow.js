import React, { Component } from "react";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";

import { cx } from "emotion";
import Styles from "./ConureQuoteWindowStyles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";


class ConureQuoteWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quotes: []
        };

        fetch("https://type.fit/api/quotes")
        .then(response => {
            return response.json();
        })
        .then(data => {
            let q = [];
            for (let i=0;i < 10; i++) {
                q.push(data[Math.floor(Math.random()*data.length)]);
            }
            this.setState({quotes: q});
        })
    }

    render() {   
        /*
        const quotes = [
            ["There are decades where nothing happens - there are weeks where decades happen.", "Vladimir Ilyitch Lenin", "The Chief Tasks of Our Day"],
            ["He who cannnot lie does not know what the truth is.", "Friedrich Nietzsche", "Thus Spoke Zarathustra"],
            ["In the face of ambiguity, refuse the temptation to guess.", "Tim Peters","The Zen of Python"],
            ["Keep your eyes on the stars and your feet on the ground.", "Teddy Roosevelt", ""],
            ["The eye with which one looks at reality must constantly change.", "Søren Kierkegaard", "Either/Or"]
        ]
        */

        const quotesElements = this.state.quotes.map(elem => (
            <Carousel.Item>
                <Container>
                    <blockquote cite="Author">
                        <p className={ cx(Styles.QuoteBody) }>{elem[0]}</p>
                        <footer className={ cx(Styles.QuoteFooter, "text-muted") }>
                            <small>
                                {elem.text}<br/><cite>{elem.author}</cite>
                            </small>
                        </footer>
                    </blockquote>
                </Container>
            </Carousel.Item>
        ))

        return (
            <div id={this.props.id} className={ cx(Styles.QuoteWindowWrapper) }>
                <h6 className={ cx("text-muted") }>
                    <small><i>Quote</i></small>
                </h6>
                <Carousel controls={false} indicators={false} slide={true}>
                    {quotesElements}
                </Carousel>
                <div className={ cx(Styles.CopyrightStyles, "text-muted") }>
                    <FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon>
                    <span style={{"paddingLeft": "2mm"}}>2020 Musab Guma'a</span>
                    &nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faGithubAlt}></FontAwesomeIcon>
                    <a href="https://github.com/mgsium/Conure" style={{"paddingLeft": "2mm"}}>mgsium</a>
                </div>
            </div>
        )
    }
}

export default ConureQuoteWindow;