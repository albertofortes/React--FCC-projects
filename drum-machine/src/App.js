import React, { Component } from 'react';
import './App.scss';

const bank = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: "Cowbell",
    url: 'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587867/fcc-drum-machine/cowbells/cowbell1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Tom-Tom',
    url: 'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532588185/fcc-drum-machine/tom-toms/tomtomdrum3.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "kick-drum",
    url: 'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587165/fcc-drum-machine/kick-drums/kick-drum-7.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Snare',
    url: 'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587362/fcc-drum-machine/snare-drums/snaredrum1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];


class PadButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      padLabel: this.props.keyTrigger
    };

    // This binding is necessary to make `this` work in the callback:
    this.padClicked = this.padClicked.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.padStyles = this.padStyles.bind(this);
  }

  componentDidMount(){
    document.addEventListener('keydown', this.keyPress);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.keyPress);
  }

  keyPress(e) {
    if (e.keyCode === this.props.keyCode) this.padClicked();
  }

  padStyles(e) {
    e.className = '';
    e.classList.add('drum-pad');
    e.className += " on";

    this.setState({
      padLabel: this.props.id
    });

    setTimeout(() => {
      e.className = '';
      e.classList.add('drum-pad');
      this.setState({
        padLabel: this.props.keyTrigger
      });
    }, 200);
  }

  padClicked(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();

    this.props.updateDisplay( this.props.id );

    this.padStyles( document.getElementById("drum-pad-" + this.props.keyTrigger) );
  }

  render() {
    return (
      <div id={"drum-pad-" + this.props.keyTrigger} key={this.props.keyCode} className="drum-pad" onClick={this.padClicked}>
        {this.state.padLabel}
        <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
      </div>
    )
  }
}


class Pads extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let padButtons =  this.props.bank.map((el, i, elemProp) => {
        return (
          <PadButton key={i} id={elemProp[i].id} clip={elemProp[i].url} keyTrigger={elemProp[i].keyTrigger} keyCode={elemProp[i].keyCode} updateDisplay={this.props.updateDisplay}  />
        )
    });

    return (
      <div className="pads">{padButtons}</div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bank: bank,
      display: "Ready..."
    };

    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(name) {
    const display = document.getElementById("display");

    display.className = '';
    display.classList.add('on');

    this.setState({
      display: name
    });

    setTimeout(() => {
      display.className = '';
    }, 1000);
  }

  render() {
    return (
      <div id="drum-machine">
        <Pads bank={this.state.bank} updateDisplay={this.updateDisplay} />
        <div id="display">{this.state.display}</div>
      </div>
    );
  }
}

export default App;
