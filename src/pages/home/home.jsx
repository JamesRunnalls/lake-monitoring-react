import React, { Component } from "react";
import L from "leaflet";
import metadata from "./../../metadata.json";
import "./css/leaflet.css";
import "../../App.css";
import Wheel from "../../components/wheel/wheel";

class Home extends Component {
  state = {
    title: {
      DE: "Pilotprojekt Temperaturmonitoring in Kleinseen",
      EN: "Temperature Monitoring Pilot Project in Small Lakes",
    },
    subtitle: {
      DE: "See auswählen",
      EN: "Select lake",
    },
    text: {
      DE: (
        <div>
          <p>
            Das Wasserforschungsinstitut Eawag betreibt von 2021 bis 2023
            Pilot-Stationen für Temperaturmessungen in verschiedenen Schweizer
            Kleinseen. Die Messketten bestehen aus einem Metallgewicht am Grund,
            einer Boje an der Wasseroberfläche und Sensoren in verschiedenen
            Wassertiefen.{" "}
          </p>
          <p>
            Ziel der Messungen ist es, die Eignung der Sensoren sowie der
            Installation zu testen, um in Zukunft die klimabedingte
            Temperaturdynamik in Kleinseen und Weihern zu beobachten. Die
            Resultate dienen der Abklärung zur Entwicklung eines schweizweiten
            Messnetzes für See-Temperaturen.
          </p>
        </div>
      ),
      EN: (
        <div>
          <p>
            The water research institute Eawag will operate pilot stations for
            temperature measurements in various small Swiss lakes from 2021 to
            2023. The measuring chains consist of a metal weight on the bottom,
            a buoy on the water surface and sensors at different water depths.
          </p>
          <p>
            The aim of the measurements is to test the suitability of the
            sensors and the installation in order to observe the climate-related
            temperature dynamics in small lakes and ponds in the future. The
            results serve to clarify the development of a Switzerland-wide
            measuring network for lake temperatures.
          </p>
        </div>
      ),
    },
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

  async componentDidMount() {
    var southWest = L.latLng(45.4, 5.14);
    var northEast = L.latLng(48.23, 11.48);
    var bounds = L.latLngBounds(southWest, northEast);
    this.map = L.map("map", {
      preferCanvas: true,
      zoomControl: false,
      center: bounds.getCenter(),
      zoom: 9,
      minZoom: 8,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    });
    L.tileLayer(
      "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
      {
        attribution:
          '<a title="Swiss Federal Office of Topography" href="https://www.swisstopo.admin.ch/">swisstopo</a>',
      }
    ).addTo(this.map);
    for (var lake of Object.keys(metadata)) {
      var location = L.latLng(metadata[lake].lat, metadata[lake].lng);
      var marker = new L.marker(location, {
        id: lake,
        icon: L.divIcon({
          className: "map-marker",
          html:
            `<div style="padding:10px;transform:translate(2px, -21px);position: absolute;">` +
            `<div class="pin bounce" style="background-color:black" />` +
            `<div class="pulse" id="${"pulse-" + lake}" /></div> `,
        }),
      }).addTo(this.map);

      marker.bindTooltip(metadata[lake].name);
      marker.on("click", (event) => {
        window.location.href = "/data?" + event.target.options.id;
      });
    }
    window.addEventListener("resize", this.updateMap, false);
  }

  onMouseOver = (event) => {
    try {
      document.getElementById(
        "pulse-" + event.target.id.split("-")[1]
      ).style.display = "block";
    } catch (e) {}
  };

  onMouseOut = (event) => {
    try {
      document.getElementById(
        "pulse-" + event.target.id.split("-")[1]
      ).style.display = "none";
    } catch (e) {}
  };

  updateMap = () => {
    this.map.invalidateSize();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMap, false);
  }

  render() {
    var { title, subtitle, text, people } = this.state;
    var { lang } = this.props;
    document.title = title[lang];
    var items = Object.keys(metadata).map((lake) => {
      return { value: metadata[lake].name, link: "/data?" + lake, key: lake };
    });
    return (
      <div className="home">
        <div className="content">
          <div className="title">
            {title[lang]}
            <div className="subtitle">{subtitle[lang]}</div>
          </div>
          <div className="select">
            <Wheel
              items={items}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
            />
          </div>
          <div className="text">{text[lang]}</div>
          <div className="people">
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
                    Fabian Bärenbold <br />
                    {people[lang][3]}
                    <br />
                    058 765 21 77
                    <br /> fabian.baerenbold@eawag.ch
                    <p>
                      {" "}
                      Michael Plüss
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
        <div id="map" />
      </div>
    );
  }
}

export default Home;
