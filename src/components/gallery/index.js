import { h } from "preact";
import "./style.scss";

const Gallery = ({ images }) => (
  <section class="gallery">
    <ul class="gallery__list">
      {images.map((src) => (
        <li class="gallery__list-item card card--nohover">
          <img src={src} />
        </li>
      ))}
    </ul>
  </section>
);

export default Gallery;
