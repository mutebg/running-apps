import { h } from "preact";
import { useState } from "preact/hooks";
import "./style.scss";
import { getRating } from "../../utils/index";
import { route } from "preact-router";

const isSelectedForCompare = (items, item) => items.indexOf(item) >= 0;

const Home = ({ data }) => {
  let [forCompare, setCompare] = useState([]);
  const [isCompareMode, setCompareMode] = useState(false);
  const setForCompare = (slug) => {
    if (isSelectedForCompare(forCompare, slug)) {
      forCompare = forCompare.filter((item) => item != slug);
    } else {
      forCompare = [...forCompare, slug];
    }

    setCompare(forCompare);
  };

  const cancelCompare = () => setCompareMode(false);

  return (
    <div class="home">
      <button class="btn mb-l" onClick={() => setCompareMode(!isCompareMode)}>
        Compare
      </button>
      <div class="app-grid">
        {data.map((app) => (
          <AppBox
            {...app}
            isCompareMode={isCompareMode}
            isSelected={isSelectedForCompare(forCompare, app.slug)}
            setForCompare={setForCompare}
          />
        ))}
      </div>
      {isCompareMode && (
        <CompareBar
          apps={data}
          forCompare={forCompare}
          cancelCompare={cancelCompare}
          removeCompare={setForCompare}
        />
      )}
    </div>
  );
};

export default Home;

const AppBox = (props) => {
  const { name, apple, slug, isCompareMode, setForCompare, isSelected } = props;
  const elProps = !isCompareMode
    ? { href: `/view/${slug}` }
    : {
        onClick: (e) => {
          e.preventDefault();
          setForCompare(slug);
        },
      };
  return (
    <a {...elProps} class="card app-card" key={slug}>
      {apple && <img src={apple.logo} alt={name} />}
      {isCompareMode && (
        <div class="app-card__compare">{isSelected ? "-" : "+"}</div>
      )}
      <div class="card__body">
        <h2 class="card-heading mb-m">{name}</h2>

        <span>rating: {getRating(props)}</span>
      </div>
    </a>
  );
};

const CompareBar = ({ apps, forCompare, removeCompare, cancelCompare }) => {
  const appsData = apps.filter(({ slug }) =>
    isSelectedForCompare(forCompare, slug)
  );

  const onCompare = () => route("/compare/" + forCompare.join(","));

  return (
    <div class="compare-bar">
      <div class="compare-bar__list">
        {appsData.map(({ apple, name, slug }) => (
          <button onClick={() => removeCompare(slug)}>
            {apple && <img src={apple.logo} alt={name} width="80" />}
          </button>
        ))}
      </div>
      <div class="compare-bar__action">
        <button class="btn btn--large" onClick={onCompare}>
          Compare
        </button>
        <button
          class="btn btn--large btn--cancel"
          onClick={() => cancelCompare()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
