import { Component } from 'react';
import './addPassword.css';

class AddPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      lessThenEightCharacters: false,
      passwordEasy: false,
      passwordMedium: false,
      passwordStrong: false,
      color: '',
    };
  }

  componentDidUpdate(_, prevState) {
    if (prevState.text !== this.state.text) {
      this.checkText(this.state.text);
    }
  }

  onValueChange = e => {
    const text = e.target.value;
    this.setState({ text });
  };

  checkText(text) {
    const lessThenEightCharacters = text.length > 0 && text.length < 8;
    const easyVerification = text.length > 7;
    const mediumVerification =
      (/\W+/g.test(text) && /[A-ZА-ЯЁ]+/i.test(text)) ||
      (/\W+/g.test(text) && /\d/g.test(text)) ||
      (/[A-ZА-ЯЁ]+/i.test(text) && /\d/g.test(text));
    const strongVerification =
      /\W+/g.test(text) && /[A-ZА-ЯЁ]+/i.test(text) && /\d/g.test(text);

    const passwordMedium = easyVerification && mediumVerification;
    const passwordStrong = easyVerification && strongVerification;

    let newState = {
      ...this.state,
      text,
      lessThenEightCharacters,
      passwordEasy: easyVerification,
      passwordMedium,
      passwordStrong,
    };

    if (lessThenEightCharacters || easyVerification) {
      newState.color = 'a';
    }
    if (passwordMedium) {
      newState.color = 'b';
    }
    if (passwordStrong) {
      newState.color = 'c';
    }

    this.setState({ ...newState });
  }

  render() {
    const {
      text,
      passwordEasy,
      lessThenEightCharacters,
      passwordMedium,
      passwordStrong,
      color,
    } = this.state;

    return (
      <div className="container">
        <input
          type="text"
          placeholder="PASSWORD"
          value={text}
          onChange={this.onValueChange}
        />
        <div className="container-diagram">
          <div
            className={`diagram-bar${
              passwordEasy || lessThenEightCharacters ? ` ${color}` : ''
            }`}
          />
          <div
            className={`diagram-bar${
              passwordMedium || lessThenEightCharacters ? ` ${color}` : ''
            }`}
          />
          <div
            className={`diagram-bar${
              passwordStrong || lessThenEightCharacters ? ` ${color}` : ''
            }`}
          />
        </div>
      </div>
    );
  }
}

export default AddPassword;
