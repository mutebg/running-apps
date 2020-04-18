import { h } from "preact";
import "./style.scss";
import { getRating } from "../../utils/index";

const Home = ({ data }) => (
  <div class="home">
    <div class="app-grid">
      {data.map((app) => (
        <AppBox {...app} />
      ))}
    </div>
  </div>
);

export default Home;

const AppBox = (props) => {
  const { name, apple, slug } = props;
  return (
    <a href={`/view/${slug}`} class="card app-card">
      {apple && <img src={apple.logo} alt={name} />}
      <div class="card__body">
        <h2 class="card-heading mb-m">{name}</h2>

        <span class="btn">rating: {getRating(props)}</span>
      </div>
    </a>
  );
};
