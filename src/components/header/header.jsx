import React, { Component } from "react";
import eawag from "./img/eawag.png";
import bafu from "./img/bafu.png";
import "../../App.css";

class Header extends Component {
  render() {
    var { lang, langs, updateLangs } = this.props;
    return (
      <div className="header">
        <div className="header-bar"></div>
        <div className="header-content">
          <div className="header-home">
            
          </div>
          <div className="header-logos">
            <img src={eawag} alt="eawag" />
            <img src={bafu} alt="bafu"/>
          </div>
          <div className="header-lang">
            <select value={lang} onChange={updateLangs}>
              {langs.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
