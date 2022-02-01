import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Home from "./pages/home/home";
import Data from "./pages/data/data";

class App extends Component {
  state = {
    lang: "DE",
    langs: ["DE", "EN", "IT", "FR"],
    redirect: false,
    navigate: false,
  };
  updateLangs = (event) => {
    this.setState({ lang: event.target.value, navigate: true });
  };
  renderNavigate = () => {
    if (this.state.navigate) {
      var { lang, langs } = this.state;
      var path = window.location.pathname;
      var link = "/" + lang.toLowerCase();
      var links = langs.map((l) => "/" + l.toLowerCase());
      for (let l of links) {
        path = path.replace(l, link);
      }
      path = path + window.location.search;
      this.setState({ navigate: false });
      return <Navigate to={path} />;
    }
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      var url = window.location.href;
      if (url.includes("seetemperaturen")) {
        this.setState({ lang: "DE", redirect: false });
        return <Navigate to="/de" />;
      } else if (url.includes("lake-monitoring")) {
        this.setState({ lang: "EN", redirect: false });
        return <Navigate to="/en" />;
      } else if (url.includes("temperature-di-laghi")) {
        this.setState({ lang: "IT", redirect: false });
        return <Navigate to="/it" />;
      } else if (url.includes("temperature-des-lacs")) {
        this.setState({ lang: "FR", redirect: false });
        return <Navigate to="/fr" />;
      } else {
        this.setState({ lang: "DE", redirect: false });
        return <Navigate to="/de" />;
      }
    }
  };
  componentDidMount() {
    var url = window.location.href;
    var { langs } = this.state;
    for (let lang of langs) {
      if (url.includes("/" + lang.toLowerCase())) {
        this.setState({ lang });
        return;
      }
    }
    this.setState({ redirect: true });
  }
  render() {
    var { lang, langs } = this.state;
    return (
      <React.Fragment>
        <Header lang={lang} langs={langs} updateLangs={this.updateLangs} />
        <BrowserRouter>
          {this.renderRedirect()}
          {this.renderNavigate()}
          <Routes>
            <Route path="/:lang" exact element={<Home lang={lang} />} />
            <Route path="/:lang/data" element={<Data lang={lang} />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
