import { Component } from 'react';
import './addPassword.css';

class AddPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
    const easyVerification = text.length > 7;
    const mediumVerification =
      (/\W+/g.test(text) && /[A-ZА-ЯЁ]+/i.test(text)) ||
      (/\W+/g.test(text) && /\d/g.test(text)) ||
      (/[A-ZА-ЯЁ]+/i.test(text) && /\d/g.test(text));
    const strongVerification =
      /\W+/g.test(text) && /[A-ZА-ЯЁ]+/i.test(text) && /\d/g.test(text);

    if (easyVerification) {
      this.setState({
        passwordEasy: true,
        color: 'a',
      });
    }
    if (easyVerification && mediumVerification) {
      this.setState({
        passwordMedium: true,
        color: 'b',
      });
    }
    if (easyVerification && strongVerification) {
      this.setState({
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
              !this.state.passwordEasy ? 'diagram-bar' : this.changeColor()
            }
          ></div>
          <div
            className={
              !this.state.passwordMedium ? 'diagram-bar' : this.changeColor()
            }
          ></div>
          <div
            className={
              !this.state.passwordStrong ? 'diagram-bar' : this.changeColor()
            }
          ></div>
        </div>
      </div>
    );
  }
}

export default AddPassword;
