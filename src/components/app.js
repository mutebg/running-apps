import { h, Component } from "preact";
import { Router } from "preact-router";

import Header from "./header";
import data from "../../data/list.json";

// Code-splitting is automated for routes
import Home from "../routes/home";
import View from "../routes/view";
import Compare from "../routes/compare";

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
    if (window) {
      window.scrollTo(0, 0);
    }
  };

  render() {
    return (
      <div id="app">
        <Header />
        <div class="container">
          <Router onChange={this.handleRoute}>
            <Home path="/" data={data} />
            <View path="/view/:appSlug" data={data} />
            <Compare path="/compare/:slugs" data={data} />
          </Router>
        </div>
      </div>
    );
  }
}
