import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import location from "./img/location.svg";
import area from "./img/area.svg";
import depth from "./img/depth.svg";
import elevation from "./img/elevation.svg";
import metadata from "./../../metadata.json";
import home from "./img/home.svg";

class Data extends Component {
  state = {
    people: {
      DE: [
        "Betreiber",
        "Auftraggeber",
        "Kontact",
        "Wissenschaftlicher Betreuer des Projekts",
        "Verantwortlicher Techniker",
      ],
      EN: [
        "Operator",
        "Client",
        "Contact",
        "Scientific supervisor of the project",
        "Responsible technician",
      ],
    },
  };
  render() {
    var { people } = this.state;
    var { lang } = this.props;
    var name = window.location.search.replace("?", "");
    if (Object.keys(metadata).includes(name)) {
      return (
        <div className="data">
          <div className="title">
            <Link to="/">
              <img src={home} title="Go to homepage" alt="home" />
            </Link>
            {metadata[name]["name"]}
          </div>
          <div className="infobar">
            <div className="info">
              <img src={location} alt="location" /> {metadata[name]["location"]}
            </div>
            <div className="info">
              <img src={depth} alt="depth" /> {metadata[name]["depth"][0]}
              <div className="unit">{metadata[name]["depth"][1]}</div>
            </div>
            <div className="info">
              <img src={area} alt="area" /> {metadata[name]["area"][0]}
              <div className="unit">{metadata[name]["area"][1]}</div>
            </div>
            <div className="info">
              <img src={elevation} alt="elevation" />{" "}
              {metadata[name]["elevation"][0]}
              <div className="unit">{metadata[name]["elevation"][1]}</div>
            </div>
          </div>
          <div className="content">
            <div className="content-box">
              <iframe src={metadata[name]["linegraph"]} title="Datalakes" />
            </div>
            <div className="content-box">
              <div className="text">{metadata[name]["text"][lang]}</div>
            </div>
            <div className="content-box">
              <iframe src={metadata[name]["heatmap"]} title="Datalakes" />
            </div>
            <div className="content-box">
              <table>
                <tbody>
                  <tr>
                    <th>{people[lang][0]}</th>
                    <td>Eawag, Wasserforschungsinstitut des ETH-Bereichs</td>
                  </tr>
                  <tr>
                    <th>{people[lang][1]}</th>
                    <td>Bundesamt für Umwelt</td>
                  </tr>
                  <tr>
                    <th>{people[lang][2]}</th>
                    <td>
                      <b>Fabian Bärenbold</b> <br />
                      {people[lang][3]}
                      <br />
                      058 765 21 77
                      <br /> fabian.baerenbold@eawag.ch
                      <p>
                        {" "}
                        <b>Michael Plüss </b>
                        <br />
                        {people[lang][4]}
                        <br /> 058 765 22 55
                        <br />
                        michael.pluess@eawag.ch
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Lake not found</div>;
    }
  }
}

export default Data;
