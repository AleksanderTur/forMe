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

  onValueChange = e => {
    this.setState(
      {
        text: e.target.value,
      },
      () => {
        this.checkText(this.state.text);
      }
    );
  };

  checkText(text) {
    const lessThenEightCharacters = text.length > 0;
    const easyVerification = text.length > 7;
    const mediumVerification =
      (/\W+/g.test(text) && /[A-ZА-ЯЁ]+/i.test(text)) ||
      (/\W+/g.test(text) && /\d/g.test(text)) ||
      (/[A-ZА-ЯЁ]+/i.test(text) && /\d/g.test(text));
    const strongVerification =
      /\W+/g.test(text) && /[A-ZА-ЯЁ]+/i.test(text) && /\d/g.test(text);

    if (lessThenEightCharacters) {
      this.setState({
        lessThenEightCharacters: true,
        color: 'a',
      });
    }

    if (easyVerification) {
      this.setState({
        lessThenEightCharacters: false,
        passwordEasy: true,
        color: 'a',
      });
    }
    if (easyVerification && mediumVerification) {
      this.setState({
        lessThenEightCharacters: false,
        passwordMedium: true,
        color: 'b',
      });
    }
    if (easyVerification && strongVerification) {
      this.setState({
        lessThenEightCharacters: false,
        passwordStrong: true,
        color: 'c',
      });
    }
  }

  changeColor() {
    return `diagram-bar ${this.state.color}`;
  }

  render() {
    return (
      <div className="container">
        <input
          type="text"
          placeholder="PASSWORD"
          value={this.state.text}
          onChange={this.onValueChange}
        />
        <div className="container-diagram">
          <div
            className={
              !(this.state.passwordEasy || this.state.lessThenEightCharacters)
                ? 'diagram-bar'
                : this.changeColor()
            }
          ></div>
          <div
            className={
              !(this.state.passwordMedium || this.state.lessThenEightCharacters)
                ? 'diagram-bar'
                : this.changeColor()
            }
          ></div>
          <div
            className={
              !(this.state.passwordStrong || this.state.lessThenEightCharacters)
                ? 'diagram-bar'
                : this.changeColor()
            }
          ></div>
        </div>
      </div>
    );
  }
}

export default AddPassword;
