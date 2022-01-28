import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./wheel.css";

class Wheel extends Component {
  state = {};
  render() {
    var { items, onMouseOver, onMouseOut } = this.props;
    return (
      <div className="react-wheel">
        {items.map((i) => (
          <Link to={i.link} key={i.key}>
            <div
              id={"wheel-" + i.key}
              className="react-wheel-spoke"
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
            >
              {i.value}
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default Wheel;
