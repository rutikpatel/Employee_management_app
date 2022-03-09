import React from 'react'
import { Link } from 'react-router-dom'

import { Component } from 'react'
import axios from 'axios'

import './login.css'

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
      errors: {},

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validate()) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json"
          }
        };

        const { data } = await axios.post(`http://localhost:9090/users`,
          {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
          },
          config).then(response => {
            if (response.status === 200) {
              alert('User has been created successfully');
            }
          });
      } catch (e) {
        alert(e.response)
      }
    }
    else {
      alert(this.state.errors)
    }
  };

  validate() {
    let name= this.state.name;
    let email = this.state.email;
    let password = this.state.password;
    let confirm_password = this.state.confirm_password;

    console.log('errors', this.state.errors);
    let errors = {};
    let isValid = true;

    if (!name) {
      isValid = false;
      errors["name"] = "Please enter your Name.";
    }

    
    if (!email) {
      this.setState({ isValid: false });
      errors["email"] = "Please enter your email Address.";
    }


    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (!confirm_password) {
      isValid = false;
      errors["confirm_password"] = "Please enter your confirm password.";
    }

    if (password && password.length < 6) {
      isValid = false;
      errors["password"] = "Please add at least 6 characters.";
    }

    if (password && confirm_password) {
      if (password !== confirm_password) {
        isValid = false;
        errors["confirm_password"] = "Passwords don't match.";
      }
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }
  render() {
    return (
      <div className="text-center m-5-auto"  >
        <h1>Registration window</h1>
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label >Name:</label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter your name"
              id="name" required />

            <div className="text-danger">{this.state.errors.name}</div>
          </div>
          <br />
          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter email"
              id="email" required />

            <div className="text-danger">{this.state.errors.email}</div>
          </div>
          <br/>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter password"
              id="password" required />

            <div className="text-danger">{this.state.errors.password}</div>
          </div>
          <br />
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirm_password"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter confirm password"
              id="confirm_password" required />

            <div className="text-danger">{this.state.errors.confirm_password}</div>
          </div>
          <br />

          <button id='sub_btn'  >Submit</button>
          {/* <input type="submit" value="Submit"  /> */}
        </form>
        <footer>
          <p><Link to="/">Back to Homepage</Link>.</p>
        </footer>
      </div>
    );
  }
}

export default RegisterPage
