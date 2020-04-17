import { h, Component } from "preact";
//import "./style.scss";
import get from "just-safe-get";

export default class View extends Component {
  render({ data, appSlug }) {
    const {
      name,
      apple,
      google,
      googleurl,
      appleurl,
      free,
      submonthly,
      subyearly,
    } = getAppData(data, appSlug);
    return (
      <div>
        <h1>{name}</h1>
        {apple && <p>Apple rating {apple.rating}</p>}
        {google && <p>Google rating {google.rating}</p>}
        {free && <p>Free version: {free}</p>}
        {submonthly && <p>Monthly subscription: {submonthly}$</p>}
        {subyearly && <p>Yearly subscription: {subyearly}$</p>}
        {appleurl && <a href={appleurl}>Download apple</a>}
        {googleurl && <a href={googleurl}>Download PlayStore</a>}

        {apple && (
          <div>
            {apple.screenshots.map((src) => (
              <img src={src} width="320" />
            ))}
          </div>
        )}
        {google && (
          <div>
            {google.screenshots.map((src) => (
              <img src={src} width="320" />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const getAppData = (data, slug) => {
  const apps = data.filter((app) => app.slug === slug);
  if (apps.length) return apps[0];

  return null;
};
