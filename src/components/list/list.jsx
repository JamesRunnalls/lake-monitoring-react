import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./list.css";

class List extends Component {
  state = {};
  render() {
    var { items, onMouseOver, onMouseOut } = this.props;
    return (
      <div className="react-list">
        {items.map((i) => (
          <Link to={i.link} key={i.key}>
            <div
              id={"list-" + i.key}
              className="react-list-inner"
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

export default List;
