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
              Das Wasserforschungsinstitut Eawag betreibt im Auftrag des
              Bundesamt für Umwelt (BAFU) von 2021 bis 2023 Pilot-Stationen für
              Temperaturmessungen in verschiedenen Schweizer Kleinseen. Die
              Messketten bestehen aus einem Metallgewicht am Grund, einer Boje
              an der Wasseroberfläche und Sensoren in verschiedenen
              Wassertiefen. Die Temperaturdaten werden zweimal pro Jahr manuell
              ausgelesen und auf der Webseite aufgeschaltet.
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
        job1: "Daten und Interpretationen",
        job2: "Messgeräte und Installation",
        job3: "Projektleitung",
        operator: "Betreiber",
        client: "Auftraggeber",
        contact: "Kontakt",
        eawag: "Eawag: Das Wasserforschungsinstitut des ETH-Bereichs",
        bafu: "Bundesamt für Umwelt (BAFU)",
      },
      EN: {
        title: "Temperature Monitoring Pilot Project in Small Lakes",
        subtitle: "Select lake",
        intro: (
          <div>
            <p>
              On behalf of the Swiss Federal Office for the Environment (FOEN),
              the water research institute Eawag will operate pilot stations for
              temperature measurements in various small Swiss lakes from 2021 to
              2023. The measuring chains consist of a metal weight on the
              bottom, a buoy on the water surface and sensors at different water
              depths. The temperature data is read out manually twice per year
              and will be added to this website subsequently.
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
        job1: "Data and interpretation",
        job2: "Sensors and installation",
        job3: "Project leader",
        operator: "Operator",
        client: "Client",
        contact: "Contact",
        eawag:
          "Eawag: Swiss Federal Institute of Aquatic Science and Technology",
        bafu: "Swiss Federal Office for the Environment (FOEN)",
      },
      IT: {
        title:
          "Progetto Pilota di Monitoraggio della Temperatura nei Piccoli Laghi",
        subtitle: "Seleziona il Lago",
        intro: (
          <div>
            <p>
              L'istituto di ricerca sull'acqua Eawag, per conto dell'Ufficio
              federale dell'ambiente (UFAM), opera con stazioni pilota dedicate
              a misurazioni della temperatura in vari piccoli laghi svizzeri per
              un periodo che va dal 2021 al 2023. Le catene di misurazione sono
              costituite da un peso in metallo posizionato sul fondo, da una boa
              sulla superficie dell'acqua e da sensori a diverse profondità. La
              raccolta dati della temperatura viene effettuata due volte
              all’anno, in seguito la base dati viene aggiunta a questo sito.
            </p>
            <p>
              Lo scopo delle misurazioni è di verificare l'adeguatezza dei
              sensori e l'installazione al fine di poter osservare in futuro le
              dinamiche della temperatura, legate al clima, in stagni e piccoli
              laghi. I risultati servono a fare luce sullo sviluppo di una rete
              di misurazioni della temperatura nei laghi, su scala nazionale.
            </p>
          </div>
        ),
        job1: "Dati e interpretazione",
        job2: "Sensori e installazione",
        job3: "Capiprogetto",
        operator: "Operatore",
        client: "Cliente",
        contact: "Contatto",
        eawag:
          "Eawag: L'Istituto per la Ricerca sulle Acque nel Settore dei Politecnici Federali",
        bafu: "Ufficio federale dell’ambiente (UFAM)",
      },
      FR: {
        title:
          "Projet Pilote de Surveillance de la Température dans les Petits Lacs",
        subtitle: "Sélectionner un Lac",
        intro: (
          <div>
            <p>
              Dans le cadre d'un projet pour l'office fédérale de
              l'environnement (OFEV), l'institut de recherche sur l'eau Eawag
              exploitera des stations pilotes pour des mesures de température
              dans divers petits lacs suisses de 2021 à 2023. Les chaînes de
              mesure sont constituées d'un poids métallique en bas, une bouée à
              la surface de l'eau et des capteurs à différentes profondeurs. Les
              données de température sont téléchargées manuellement deux fois
              par an et seront ensuite ajoutées à ce site Web.
            </p>
            <p>
              Le but des mesures est de tester ces installations pour quantifier
              les effets du climat sur la dynamique de la température des petits
              lacs et étangs. Les résultats serviront au futur développement
              d'un réseau de mesure de la température des lacs dans toute la
              Suisse.
            </p>
          </div>
        ),
        job1: "Données et interprétations",
        job2: "Capteurs et installation",
        job3: "Gestion de projet",
        operator: "Opérateur",
        client: "Client",
        contact: "Contact",
        eawag:
          "Eawag: Institut Fédéral Suisse des Sciences et Technologies de l’Eau",
        bafu: "Office fédéral de l’environnement (OFEV)",
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
      marker.on("click", (event) => {
        window.location.href =
          `/${lang.toLowerCase()}/data?` + event.target.options.id;
      });
      marker.on("mouseover", (event) => {
        try {
          document.getElementById(
            "pin-" + event.target.options.id
          ).style.backgroundColor = "#54D1DB";
        } catch (e) {}
        try {
          document
            .getElementById("list-" + event.target.options.id)
            .classList.add("hover");
        } catch (e) {}
      });
      marker.on("mouseout", (event) => {
        try {
          document.getElementById(
            "pin-" + event.target.options.id
          ).style.backgroundColor = "#044E54";
        } catch (e) {}
        try {
          document
            .getElementById("list-" + event.target.options.id)
            .classList.remove("hover");
        } catch (e) {}
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
          <div className="content-inner">
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
                    <td>{text[lang].eawag}</td>
                  </tr>
                  <tr>
                    <th>{text[lang].client}</th>
                    <td>{text[lang].bafu}</td>
                  </tr>
                  <tr>
                    <th>{text[lang].contact}</th>
                    <td>
                      <div className="person">
                        <div className="job">{text[lang].job1}</div>
                        <div className="name">Fabian Bärenbold</div>
                        <div className="no">058 765 21 77</div>
                        <div className="email">fabian.baerenbold@eawag.ch</div>
                      </div>

                      <div className="person">
                        <div className="job">{text[lang].job2}</div>
                        <div className="name">Michael Plüss</div>
                        <div className="no">058 765 22 55</div>
                        <div className="email">michael.pluess@eawag.ch</div>
                      </div>
                      <div className="person">
                        <div className="job">{text[lang].job3}</div>
                        <div className="name">Martin Schmid</div>
                        <div className="no">058 765 21 93</div>
                        <div className="email">martin.schmid@eawag.ch</div>
                      </div>
                      <div className="person">
                        <div className="name">Damien Bouffard</div>
                        <div className="no">058 765 22 73</div>
                        <div className="email">damien.bouffard@eawag.ch</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div id="map" />
      </div>
    );
  }
}

export default Home;
