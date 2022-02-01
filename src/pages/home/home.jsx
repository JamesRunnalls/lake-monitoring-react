import React, { Component } from "react";
import L from "leaflet";
import metadata from "./../../metadata.json";
import "./css/leaflet.css";
import "../../App.css";
import List from "../../components/list/list";

class Home extends Component {
  state = {
    text: {
      DE: {
        title: "Pilotprojekt Temperaturmonitoring in Kleinseen",
        subtitle: "See auswählen",
        intro: (
          <div>
            <p>
              Das Wasserforschungsinstitut Eawag betreibt von 2021 bis 2023
              Pilot-Stationen für Temperaturmessungen in verschiedenen Schweizer
              Kleinseen. Die Messketten bestehen aus einem Metallgewicht am
              Grund, einer Boje an der Wasseroberfläche und Sensoren in
              verschiedenen Wassertiefen.
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
        job1: "Wissenschaftlicher Betreuer des Projekts",
        job2: "Verantwortlicher Techniker",
        operator: "Betreiber",
        client: "Auftraggeber",
        contact: "Kontact",
      },
      EN: {
        title: "Temperature Monitoring Pilot Project in Small Lakes",
        subtitle: "Select lake",
        intro: (
          <div>
            <p>
              The water research institute Eawag will operate pilot stations for
              temperature measurements in various small Swiss lakes from 2021 to
              2023. The measuring chains consist of a metal weight on the
              bottom, a buoy on the water surface and sensors at different water
              depths.
            </p>
            <p>
              The aim of the measurements is to test the suitability of the
              sensors and the installation in order to observe the
              climate-related temperature dynamics in small lakes and ponds in
              the future. The results serve to clarify the development of a
              Switzerland-wide measuring network for lake temperatures.
            </p>
          </div>
        ),
        job1: "Scientific Supervisor of the Project",
        job2: "Responsible technician",
        operator: "Operator",
        client: "Client",
        contact: "Contact",
      },
      IT: {
        title:
          "Progetto Pilota di Monitoraggio della Temperatura nei Piccoli Laghi",
        subtitle: "Seleziona il Lago",
        intro: (
          <div>
            <p>
              L'istituto di ricerca sull'acqua Eawag gestirà stazioni pilota per
              misurazioni della temperatura in vari laghetti svizzeri dal 2021
              al 2023. Le catene di misurazione sono costituite da un peso in
              metallo sul fondo, una boa sulla superficie dell'acqua e sensori a
              diverse acque profondità.
            </p>
            <p>
              Lo scopo delle misurazioni è di verificare l'adeguatezza del
              sensori e l'installazione per osservare il dinamica della
              temperatura legata al clima in laghetti e stagni in il futuro. I
              risultati servono a chiarire lo sviluppo di a Rete di misurazione
              della temperatura dei laghi su scala svizzera.
            </p>
          </div>
        ),
        job1: "Responsabile Scientifico del Progetto",
        job2: "Tecnico Responsabile",
        operator: "Operatore",
        client: "Cliente",
        contact: "Contatto",
      },
      FR: {
        title:
          "Projet Pilote de Surveillance de la Température dans les Petits Lacs",
        subtitle: "Sélectionner le Lac",
        intro: (
          <div>
            <p>
              L'institut de recherche sur l'eau Eawag exploitera des stations
              pilotes pour mesures de température dans divers petits lacs
              suisses de 2021 à 2023. Les chaînes de mesure sont constituées
              d'un poids métallique sur en bas, une bouée à la surface de l'eau
              et des capteurs à différentes eaux profondeurs.
            </p>
            <p>
              Le but des mesures est de tester l'adéquation des capteurs et
              l'installation afin d'observer les dynamique de la température
              liée au climat dans les petits lacs et étangs l'avenir. Les
              résultats servent à clarifier le développement d'un Réseau de
              mesure de la température des lacs dans toute la Suisse.
            </p>
          </div>
        ),
        job1: "Superviseur Scientifique du Projet",
        job2: "Technicien Responsable",
        operator: "Opérateur",
        client: "Client",
        contact: "Contact",
      },
    },
  };

  plotMarkers = () => {
    var { lang } = this.props;
    if (this.markers) {
      this.markers.clearLayers();
    } else {
      this.markers = L.layerGroup();
      this.markers.addTo(this.map);
    }
    for (var lake of Object.keys(metadata)) {
      var location = L.latLng(metadata[lake].lat, metadata[lake].lng);
      var marker = new L.marker(location, {
        id: lake,
        icon: L.divIcon({
          className: "map-marker",
          html:
            `<div style="padding:10px;transform:translate(2px, -21px);position: absolute;">` +
            `<div class="pin bounce" id="${
              "pin-" + lake
            }" style="background-color:#044E54" />` +
            `</div> `,
        }),
      }).addTo(this.markers);
      marker.bindTooltip(metadata[lake].name);
      marker.on("click", (event) => {
        window.location.href =
          `/${lang.toLowerCase()}/data?` + event.target.options.id;
      });
    }
  };

  plotMap = () => {
    var southWest = L.latLng(45.4, 5.14);
    var northEast = L.latLng(48.23, 11.48);
    var bounds = L.latLngBounds(southWest, northEast);
    var lat = [];
    var lng = [];
    for (let lake of Object.keys(metadata)) {
      lat.push(metadata[lake].lat);
      lng.push(metadata[lake].lng);
    }
    var points = L.latLngBounds(
      L.latLng(Math.min(...lat), Math.min(...lng)),
      L.latLng(Math.max(...lat), Math.max(...lng))
    );

    this.map = L.map("map", {
      preferCanvas: true,
      zoomControl: false,
      center: bounds.getCenter(),
      zoom: 9,
      minZoom: 8,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    });
    this.map.fitBounds(points);
    L.tileLayer(
      "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
      {
        attribution:
          '<a title="Swiss Federal Office of Topography" href="https://www.swisstopo.admin.ch/">swisstopo</a>',
      }
    ).addTo(this.map);
    this.plotMarkers();
  };

  onMouseOver = (event) => {
    try {
      document.getElementById(
        "pin-" + event.target.id.split("-")[1]
      ).style.backgroundColor = "#54D1DB";
    } catch (e) {}
  };

  onMouseOut = (event) => {
    try {
      document.getElementById(
        "pin-" + event.target.id.split("-")[1]
      ).style.backgroundColor = "#044E54";
    } catch (e) {}
  };

  updateMap = () => {
    this.map.invalidateSize();
  };

  async componentDidMount() {
    this.plotMap();
    window.addEventListener("resize", this.updateMap, false);
  }

  componentDidUpdate() {
    this.plotMarkers();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMap, false);
  }

  render() {
    var { text } = this.state;
    var { lang } = this.props;
    document.title = text[lang].title;
    var items = Object.keys(metadata).map((lake) => {
      return {
        value: metadata[lake].name,
        link: `/${lang.toLowerCase()}/data?` + lake,
        key: lake,
      };
    });
    return (
      <div className="home">
        <div className="content">
          <div className="title">
            {text[lang].title}
            <div className="subtitle">{text[lang].subtitle}</div>
          </div>
          <div className="select">
            <List
              items={items}
              onMouseOver={this.onMouseOver}
              onMouseOut={this.onMouseOut}
            />
          </div>
          <div className="text">{text[lang].intro}</div>
          <div className="people">
            <table>
              <tbody>
                <tr>
                  <th>{text[lang].operator}</th>
                  <td>Eawag, Wasserforschungsinstitut des ETH-Bereichs</td>
                </tr>
                <tr>
                  <th>{text[lang].client}</th>
                  <td>Bundesamt für Umwelt</td>
                </tr>
                <tr>
                  <th>{text[lang].contact}</th>
                  <td>
                    <b>Fabian Bärenbold</b> <br />
                    {text[lang].job1}
                    <br />
                    058 765 21 77
                    <br /> fabian.baerenbold@eawag.ch
                    <p>
                      {" "}
                      <b>Michael Plüss</b>
                      <br />
                      {text[lang].job2}
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
