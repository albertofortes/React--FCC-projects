import React, { Component } from 'react';
import './App.scss';

const ANIMATIONS = [
  'zoomIn',
  'zoomInLeft',
  'zoomInRight',
  'zoomInDown',
  'zoomInUp',
  'flipInY',
  'zoomInUp',
  'bounceInUp',
  'bounceInDown'
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootBg: 1,
      error: null,
      isLoaded: false,
      quotes: [],
      quotesLength: 1,
      randomQuote: 1
    };

    // This binding is necessary to make `this` work in the callback:
    this.newQuote = this.newQuote.bind(this);
  }

  getData() {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quotes: result.quotes,
            quotesLength: result.quotes.length,
            randomQuote: result.quotes[ Math.floor(Math.random() * result.quotes.length) + 1 ]
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.getData();
    this.changeBg(Math.floor(Math.random() * 8) + 1);
  }

  newQuote(e) {
    let box = document.getElementById('quote-box');
    box.className = '';
    box.classList.add('animated');
    box.className += " on";

    this.setState(state => ({
      rootBg: Math.floor(Math.random() * 9) + 1, //random number between 1 and 9
      randomQuote: this.state.quotes[ Math.floor(Math.random() * this.state.quotes.length - 1) + 1 ]
    }));

    this.changeBg(this.state.rootBg);

    setTimeout(() => {
      box.className = '';
      box.classList.add('animated');
      box.className += " " + ANIMATIONS[ Math.floor(Math.random() * ANIMATIONS.length - 1) + 1 ];
    }, 250);

    e.preventDefault();
    return false
  }

  changeBg(random) {
    let root = document.getElementById('root');
    root.className = '';
    root.classList.add('bg-' + random);
  }

  render() {
    if (this.state.error) {
      return (
        <div id="quote-box">
          <div>Error: {this.state.error.message}</div>
        </div>
      );
    } else if (!this.state.isLoaded) {
      return (
        <div>Loading</div>
        );
    } else {
      return (
        <div className="container">
          <div id="quote-box" className="animated zoomInUp">
            <div id="text">{this.state.randomQuote.quote}</div>
            <div id="author">{this.state.randomQuote.author}</div>
            <button id="new-quote" onClick={this.newQuote}><i className="fas fa-sync"></i></button>
            <a href="https://twitter.com/intent/tweet" title="Tweet this quote" id="tweet-quote" onClick={this.newQuote}><i className="fab fa-twitter"></i></a>
          </div>
          <p className="copy">Done with React and Sass.</p>
        </div>
      );
    }
  }
}

export default App;