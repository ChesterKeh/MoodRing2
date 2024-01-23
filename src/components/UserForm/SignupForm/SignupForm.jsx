import { Component } from "react";
import "./SignupForm.css";
import { signUp } from "../../../utilities/user-service";
import "./SignupForm.css";

export default class SignUpForm extends Component {
  state = {
    name: "asc",
    email: "asc@asc",
    password: "asc",
    confirm: "asc",
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
      const { name, email, password } = this.state;
      const formData = { name, email, password };
      const user = await signUp(formData);
      console.log(user);
    } catch {
      this.setState({ error: "Signup failed" });
    }

    // try {
    //   // await postData("/api/users", formData);
    //   const token = await signUp(this.state);

    //   if (token.error) {
    //     this.setState({ error: token.error });
    //   } else {
    //     localStorage.setItem("token", token.token);
    //   }
    // } catch (e) {
    //   const error = JSON.stringify(e);
    //   console.log("error", typeof error);
    //   this.setState({ error });
    // }
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
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}
