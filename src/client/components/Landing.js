import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="landing">
        <div className="landing__content">
          <h1 className="landing__title">Axolotl</h1>
          <Link to="/signup" className="landing__signup">
            Get Started
          </Link>
          <Link to="/login" className="landing__login">
            Log In
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
