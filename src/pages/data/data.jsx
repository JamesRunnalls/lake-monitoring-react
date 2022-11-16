import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import phone from "./img/phone.svg";
import download from "./img/download.svg";
import metadata from "./../../metadata.json";
import L from "leaflet";

class Data extends Component {
  state = {
    text: {
      DE: {
        title: "Temperaturmonitoring",
        titlebutton: "Andere Seen",
        interp: "Interpretation der Daten",
        linegraph: "Oberflächen und Grundtemperatur",
        heatmap: "Wassertemperatur",
        oxygen: "Sauerstoff",
        job1: "Wissenschaftlicher Betreuer des Projekts",
        job2: "Verantwortlicher Techniker",
        notfound: "See nicht gefunden!",
        graphinfo: "",
        depth: "Tiefe",
        area: "Fläche",
        elevation: "Höhe",
      },
      EN: {
        title: "Temperature Monitoring",
        titlebutton: "View Other Lakes",
        interp: "Data Interpretation",
        linegraph: "Surface and Bottom Temperature",
        heatmap: "Water Temperature",
        oxygen: "Oxygen",
        job1: "Scientific Supervisor of the Project",
        job2: "Responsible Technician",
        notfound: "Lake not found!",
        graphinfo:
          "Edit the display period using the slider or the datetime selector above.",
        depth: "Depth",
        area: "Area",
        elevation: "Elevation",
      },
      IT: {
        title: "Monitoraggio della Temperatura",
        titlebutton: "Altri Laghi",
        interp: "Interpretazione dei Dati",
        linegraph: "Temperatura Superficiale e Inferiore",
        heatmap: "Temperatura dell'Acqua",
        oxygen: "Ossigeno",
        job1: "Responsabile Scientifico del Progetto",
        job2: "Tecnico Responsabile",
        notfound: "Lago non trovato!",
        graphinfo: "",
        depth: "profondità",
        area: "superficie",
        elevation: "altezza",
      },
      FR: {
        title: "Surveillance de la Température",
        titlebutton: "Autres Lacs",
        interp: "Interprétation des Données",
        linegraph: "Température de Surface et de Fond",
        heatmap: "Température de l'Eau",
        oxygen: "Oxygène",
        job1: "Superviseur Scientifique du Projet",
        job2: "Technicien Responsable",
        notfound: "Lac introuvable!",
        graphinfo: "",
        depth: "profondeur",
        area: "superficie",
        elevation: "altitude",
      },
    },
  };

  updateMap = () => {
    this.map.invalidateSize();
  };

  extractLink = (iframe) => {
    var arr = iframe.split("?");
    var params = arr[1].split("&");
    var url = arr[0] + "?" + params.find((p) => p.includes("axis"));
    return url;
  };

  async componentDidMount() {
    var name = window.location.search.replace("?", "");
    if (Object.keys(metadata).includes(name)) {
      var location = L.latLng(metadata[name]["lat"], metadata[name]["lng"]);
      this.map = L.map("map", {
        preferCanvas: true,
        zoomControl: false,
        center: location,
        zoom: 13,
        minZoom: 8,
      });
      L.tileLayer(
        "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
        {
          attribution:
            '<a title="Swiss Federal Office of Topography" href="https://www.swisstopo.admin.ch/">swisstopo</a>',
        }
      ).addTo(this.map);
      L.marker(location, {
        id: name,
        icon: L.divIcon({
          className: "map-marker",
          html:
            `<div style="padding:10px;transform:translate(2px, -21px);position: absolute;">` +
            `<div class="pin bounce" id="${
              "pin-" + name
            }" style="background-color:#044E54" />` +
            `</div> `,
        }),
      })
        .addTo(this.map)
        .bindTooltip(metadata[name]["location"][0], {
          permanent: true,
          direction: "bottom",
        })
        .openTooltip();
      window.addEventListener("resize", this.updateMap, false);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMap, false);
  }
  render() {
    var { text } = this.state;
    var { lang } = this.props;
    var name = window.location.search.replace("?", "");
    if (Object.keys(metadata).includes(name)) {
      document.title = metadata[name]["name"] + " " + text[lang].title;
      return (
        <div className="data">
          <div className="title">
            {metadata[name]["name"]}{" "}
            <div className="extratitle">{text[lang].title}</div>
            <Link to={"/" + lang.toLowerCase()}>
              <div className="title-button">{text[lang].titlebutton}</div>
            </Link>
          </div>
          <div className="left">
            <div className="info-box-clear">
              <table>
                <tbody>
                  <tr>
                    <td>
                      {metadata[name]["depth"][0]}
                      <div className="unit">{metadata[name]["depth"][1]}</div>
                    </td>
                    <td>
                      {metadata[name]["area"][0]}
                      <div className="unit">{metadata[name]["area"][1]}</div>
                    </td>
                    <td>
                      {metadata[name]["elevation"][0]}
                      <div className="unit">
                        {metadata[name]["elevation"][1]}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>{text[lang].depth}</th>
                    <th>{text[lang].area}</th>
                    <th>{text[lang].elevation}</th>
                  </tr>
                </tbody>
              </table>
              <div id="map" />
              <img
                className="info-photo hide-mobile"
                src={metadata[name]["photo"]}
                alt="Lake"
              />
            </div>
            <div className="info-box hide-mobile">
              <div className="contact">
                <div className="contact-icon">
                  <img src={phone} alt="Phone" />
                </div>
                <div className="contact-text">
                  <div className="name">Fabian Bärenbold</div>
                  <div className="job">{text[lang].job1}</div>
                  <div className="phone">+41 58 765 21 77</div>
                  <div className="email">fabian.baerenbold@eawag.ch</div>
                </div>
              </div>
              <div className="contact">
                <div className="contact-icon">
                  <img src={phone} alt="Phone" />
                </div>
                <div className="contact-text">
                  <div className="name">Michael Plüss</div>
                  <div className="job">{text[lang].job2}</div>
                  <div className="phone">+41 58 765 22 55</div>
                  <div className="email">michael.pluess@eawag.ch</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {lang in metadata[name]["text"] && (
              <div className="info-box">
                <div className="info-box-header">{text[lang].interp}</div>
                <div className="info-box-content">
                  <div className="text">
                    {metadata[name]["text"][lang].split("<br>").map((p) => (
                      <React.Fragment key={p}>
                        {p}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {"linegraph" in metadata[name] && (
              <div className="info-box">
                <div className="info-box-header">
                  {text[lang].linegraph}
                  <a
                    href={this.extractLink(metadata[name]["linegraph"])}
                    target="_blank"
                    title="Datalakes"
                    rel="noopener noreferrer"
                  >
                    <img src={download} alt="Download" />
                  </a>
                </div>
                <div className="info-box-content">
                  <iframe
                    src={metadata[name]["linegraph"] + "&" + lang}
                    title="Datalakes"
                  />
                  <div className="info-box-footer">{text[lang].graphinfo}</div>
                </div>
              </div>
            )}
            {"heatmap" in metadata[name] && (
              <div className="info-box">
                <div className="info-box-header">
                  {text[lang].heatmap}
                  <a
                    href={this.extractLink(metadata[name]["heatmap"])}
                    target="_blank"
                    title="Datalakes"
                    rel="noopener noreferrer"
                  >
                    <img src={download} alt="Download" />
                  </a>
                </div>
                <div className="info-box-content">
                  <iframe
                    src={metadata[name]["heatmap"] + "&" + lang}
                    title="Datalakes"
                  />
                  <div className="info-box-footer">{text[lang].graphinfo}</div>
                </div>
              </div>
            )}
            {"oxygen" in metadata[name] && (
              <div className="info-box">
                <div className="info-box-header">
                  {text[lang].oxygen}
                  {"oxygen-depth" in metadata[name] &&
                    ` (${metadata[name]["oxygen-depth"]} ${text[lang].depth})`}
                  <a
                    href={this.extractLink(metadata[name]["oxygen"])}
                    target="_blank"
                    title="Datalakes"
                    rel="noopener noreferrer"
                  >
                    <img src={download} alt="Download" />
                  </a>
                </div>
                <div className="info-box-content">
                  <iframe
                    src={metadata[name]["oxygen"] + "&" + lang}
                    title="Datalakes"
                  />
                  <div className="info-box-footer">{text[lang].graphinfo}</div>
                </div>
              </div>
            )}
            <div className="info-box show-mobile">
              <div className="contact">
                <div className="contact-icon">
                  <img src={phone} alt="Phone" />
                </div>
                <div className="contact-text">
                  <div className="name">Fabian Bärenbold</div>
                  <div className="job">{text[lang].job1}</div>
                  <div className="phone">+41 58 765 21 77</div>
                  <div className="email">fabian.baerenbold@eawag.ch</div>
                </div>
              </div>
              <div className="contact">
                <div className="contact-icon">
                  <img src={phone} alt="Phone" />
                </div>
                <div className="contact-text">
                  <div className="name">Michael Plüss</div>
                  <div className="job">{text[lang].job2}</div>
                  <div className="phone">+41 58 765 22 55</div>
                  <div className="email">michael.pluess@eawag.ch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      document.title = text[lang].notfound;
      return (
        <div className="notfound">
          {text[lang].notfound}
          <Link to={"/" + lang.toLowerCase()}>
            <div className="notfound-button">{text[lang].titlebutton}</div>
          </Link>
        </div>
      );
    }
  }
}

export default Data;
