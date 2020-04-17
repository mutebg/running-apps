import { h } from "preact";

const Home = ({ data }) => (
  <div class="home">
    <h1>Home</h1>
    <p>This is the Home component.</p>

    {data.map((app) => (
      <AppBox {...app} />
    ))}
  </div>
);

export default Home;

const AppBox = ({ name, apple, slug }) => (
  <div class="box">
    <h1>{name}</h1>
    {apple && <img src={apple.logo} />}

    <a href={`/view/${slug}`}>view more</a>
  </div>
);
