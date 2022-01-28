import React, { Component } from "react";
import WheelPicker from "react-wheelpicker";
import L from "leaflet";
import "./css/leaflet.css";
import "../../App.css";

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
    lakes: [
      { name: "Inkwilersee", lat: 47.198, lng: 7.663 },
      { name: "Geistsee", lat: 46.76138, lng: 7.53506 },
      { name: "Stockseewli", lat: 46.60024, lng: 8.32468 },
      { name: "Meiefallseeli", lat: 47.398, lng: 7.663 },
      { name: "Weiherhus", lat: 46.76138, lng: 7.43506 },
      { name: "Oberes Banzlouwiseeli", lat: 46.50024, lng: 8.12468 },
    ],
  };

  async componentDidMount() {
    var { lakes } = this.state;
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
    for (var lake of lakes) {
      var location = L.latLng(lake.lat, lake.lng);
      var marker = new L.marker(location, {
        icon: L.divIcon({
          className: "map-marker",
          html:
            `<div style="padding:10px;transform:translate(2px, -21px);position: absolute;">` +
            `<div style="position: absolute;top:-35px;left:-45px;font-size:20px;color:black;text-align:center;">${lake.name}</div>` +
            `<div class="pin bounce" style="background-color:black" />` +
            `<div class="pulse" id="${"pulse_" + lake.name}" /></div> `,
        }),
      }).addTo(this.map);

      marker.on("mouseover", () => {
        console.log(lake.name);
      });
      marker.on("click", () => {
        console.log("Link to lake");
      });
    }
    window.addEventListener("resize", this.updateMap, false);
  }

  updateMap = () => {
    this.map.invalidateSize();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMap, false);
  }

  render() {
    document.title = "Temperaturmonitoring in Kleinseen";
    var { title, subtitle, text, people, lakes } = this.state;
    var { lang } = this.props;
    var lakes_arr = lakes.map((lake) => lake.name);
    return (
      <div className="home">
        <div className="content">
          <div className="title">
            {title[lang]}
            <div className="subtitle">{subtitle[lang]}</div>
          </div>
          <div className="select">
            <WheelPicker
              animation="flat"
              data={lakes_arr}
              height={60}
              parentHeight={250}
              fontSize={22}
              defaultSelection={Math.round(lakes_arr.length / 2)}
              scrollerId="scroll-select-subject"
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
