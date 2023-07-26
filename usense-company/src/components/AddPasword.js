import { Component } from 'react';
import './addPasword.css';

class AddPasword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      paswordEasy: false,
      paswordMedium: false,
      paswordStrong: false,
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
        paswordEasy: true,
        color: 'a',
      });
    }
    if (easyVerification && mediumVerification) {
      this.setState({
        paswordMedium: true,
        color: 'b',
      });
    }
    if (easyVerification && strongVerification) {
      this.setState({
        paswordStrong: true,
        color: 'c',
      });
    }
  }

  changeColor() {
    return `diagram-bar ${this.state.color}`;
  }

  render() {
    return (
      <div class="container">
        <input
          type="text"
          placeholder="PASWORD"
          value={this.state.text}
          onChange={this.onValueChange}
        />
        <div
          className={
            !this.state.paswordEasy ? 'diagram-bar' : this.changeColor()
          }
        ></div>
        <div
          className={
            !this.state.paswordMedium ? 'diagram-bar' : this.changeColor()
          }
        ></div>
        <div
          className={
            !this.state.paswordStrong ? 'diagram-bar' : this.changeColor()
          }
        ></div>
      </div>
    );
  }
}

export default AddPasword;
