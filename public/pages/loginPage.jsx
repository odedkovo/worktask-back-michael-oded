import { userService } from '../js/services/user.service.js';

export class LoginPage extends React.Component {
  state = {
    userName: '',
    password: '',
    isLoggedIn: false,
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    console.log(field, value);
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  onLoginUser = () => {
    const { userName, password } = this.state;
    userService.logIn(userName, password).then(() => {
      this.setState({ userName: '', password: '', isLoggedIn: true });
      this.props.history.push('/')
    });
  };

  onSignup = () => {
    const username = prompt('username?');
    const nickname = prompt('nickname?');
    const password = prompt('password?');
    userService.signUp({ username, nickname, password }).then(() => {
      this.setState({ userName: '', password: '', isLoggedIn: true });
      this.props.history.push('/')
    })
  }

  render() {
    const { userName, password, isLoggedIn } = this.state;
    return (
      <section><div><h1>Log in:</h1>
        <label>
          Enter Username:
          <input
            onChange={this.handleChange}
            value={userName}
            name='userName'
            type='text'
          />
        </label>
        <label>
          Enter Password:
          <input
            onChange={this.handleChange}
            value={password}
            name='password'
            type='text'
          />
        </label>
        <button onClick={this.onLoginUser}>Log In</button>
      </div>
        <div> <h1>New to Bug-App? Sign-Up here!:</h1>
          <button onClick={this.onSignup}>Sign-Up!</button>
        </div>
      </section>
    );
  }
}