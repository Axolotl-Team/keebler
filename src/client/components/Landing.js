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
          <h1 className="landing__title">Awesome Axolotl Chat App</h1>
          <iframe src="https://giphy.com/embed/RE5iREBNhI0Ok" width="200" height="200" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/weird-RE5iREBNhI0Ok"></a></p>
          <div className="wrapper">
            <div className="landing__signup">
              <Link to="/signup">
                Get Started
              </Link>
            </div>
            <div>
              <Link to="/login" className="landing__login">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
