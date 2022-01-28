import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Home from "./pages/home/home";
import NotFound from "./pages/notfound/notfound";

class App extends Component {
  state = {
    lang: "DE",
    langs: ["DE", "EN"],
  };
  updateLangs = (event) => {
    this.setState({ lang: event.target.value });
  };
  render() {
    var { lang, langs } = this.state;
    return (
      <React.Fragment>
        <Header lang={lang} langs={langs} updateLangs={this.updateLangs} />
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound lang={lang} />} />
            <Route path="/" exact element={<Home lang={lang} />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
