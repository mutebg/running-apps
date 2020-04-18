import { h } from "preact";
import { Link } from "preact-router/match";
import "./style.scss";

const Header = ({ platform, changePlatform }) => (
  <header class="header">
    <h1>
      <Link href="/">MyRunning.app</Link>
    </h1>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
    <button onClick={changePlatform}>{platform}</button>
  </header>
);

export default Header;
