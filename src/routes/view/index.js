import { h } from "preact";
import { useEffect } from "preact/hooks";
import get from "just-safe-get";
import Gallery from "../../components/gallery";
import appStoreLogo from "../../assets/ios-store-badge-1.svg";
import playStoreLogo from "../../assets/android-store-badge-1.svg";
import { formatPrice } from "../../utils";

import "./style.scss";

const View = ({ data, appSlug }) => {
  const {
    name,
    apple,
    google,
    googleurl,
    appleurl,
    free,
    submonthly,
    subyearly,
    website,
    color,
  } = getAppData(data, appSlug);

  useEffect(() => {
    document.body.style.setProperty("--accent-color", color);
    return () => {
      document.body.style.removeProperty("--accent-color");
    };
  }, [color]);

  const logo = get(apple, "logo");

  return (
    <div class="view-page">
      <div class="view-overview">
        {logo && <img src={logo} alt={name} class="logo" />}
        <div class="view-summary">
          <h1 class="page-heading">{name}</h1>
          {apple && <p>Apple rating {apple.rating}</p>}
          {google && <p>Google rating {google.rating}</p>}
          {free && <p>Free version: {free}</p>}
          {submonthly && <p>Monthly subscription: {formatPrice(submonthly)}</p>}
          {subyearly && <p>Yearly subscription: {formatPrice(subyearly)}</p>}
          {website && (
            <p>
              <a href={website} target="_blank" rel="noopener noreferrer">
                Official website
              </a>
            </p>
          )}
        </div>
        <div class="view-download">
          {appleurl && (
            <a href={appleurl}>
              <img src={appStoreLogo} alt="" height="50" class="mr-m" />
            </a>
          )}
          {googleurl && (
            <a href={googleurl}>
              <img src={playStoreLogo} alt="" height="50" />
            </a>
          )}
        </div>
      </div>

      {apple && (
        <>
          <h2 class="section-heading mt-xl mb-m">Screenshots Android</h2>
          <Gallery images={apple.screenshots} />
        </>
      )}
      {google && (
        <>
          <h2 class="section-heading mt-xl mb-m">Screenshots iOS</h2>
          <Gallery images={google.screenshots} />
        </>
      )}
    </div>
  );
};

export default View;

const getAppData = (data, slug) => {
  const apps = data.filter((app) => app.slug === slug);
  if (apps.length) return apps[0];

  return null;
};
