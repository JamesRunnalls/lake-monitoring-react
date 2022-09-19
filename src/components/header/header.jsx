import React, { Component } from "react";
import eawag from "./img/eawag.png";
import bafu from "./img/bafu.png";
import "../../App.css";

class Header extends Component {
  render() {
    var { lang, langs, updateLangs } = this.props;
    return (
      <div className="header">
        <div className="header-content">
          <div className="header-logos">
            <a
              href="https://www.eawag.ch/en/department/surf/projects/temperature-monitoring-of-swiss-lakes"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={eawag} alt="eawag" />
            </a>
            <a
              href="https://www.bafu.admin.ch/bafu/de/home/themen/wasser/fachinformationen/zustand-der-gewaesser/zustand-der-seen/wassertemperatur-seen.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={bafu} alt="bafu" />
            </a>
          </div>
          <div className="header-lang">
            <select value={lang} onChange={updateLangs}>
              {langs.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
