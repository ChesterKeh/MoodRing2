import { Component } from "react";
import { signUp } from "../../../utilities/user-service";
import "./SignupForm.css";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await signUp(this.state);
      if (user) {
        this.props.setUser(user);
        this.props.navigate("/calendar");
      } else {
        this.setState({ error: "Email already in use" });
      }
    } catch (e) {
      const error = JSON.stringify(e);
      this.setState({ error, msg: "Email already in use" });
      console.log(error);
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label>Confirm</label>
            <input
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button
              type="submit"
              disabled={disable}
            >
              SIGN UP
            </button>
            <div>{this.state.msg && <p>{this.state.msg}</p>}</div>
          </form>
        </div>
      </div>
    );
  }
}
