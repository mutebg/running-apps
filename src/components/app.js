import { h, Component } from "preact";
import { Router } from "preact-router";

import Header from "./header";
import data from "../../data/list.json";

// Code-splitting is automated for routes
import Home from "../routes/home";
import View from "../routes/view";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      platform: "apple",
    };
  }

  changePlatform = () => {
    this.setState({
      platform: this.state.platform === "google" ? "apple" : "google",
    });
  };

  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render(_, { platform }) {
    return (
      <div id="app">
        <Header changePlatform={this.changePlatform} platform={platform} />
        <div class="container">
          <Router onChange={this.handleRoute}>
            <Home path="/" data={data} platform={platform} />
            <View path="/view/:appSlug" data={data} platform={platform} />
          </Router>
        </div>
      </div>
    );
  }
}
