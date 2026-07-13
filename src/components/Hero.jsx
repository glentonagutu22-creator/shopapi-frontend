import { Link } from "react-router-dom";
import "../styles/Hero.css";
import heroBanner from "../assets/hero-banner.jpg";

function Hero() {

  return (

    <section
  className="hero"
  style={{
    backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url(${heroBanner})`,
  }}
>

      <div className="hero-content">

        <h1>
          Own Your Dream Device Today 
          At A Very Affordable Price With Us
        </h1>

        <p>
          Quality phones, TVs and electronics with affodable payment options
          
        </p>

        <Link to="/products">

          <button className="shop-button">
            Shop Now
          </button>

        </Link>

      </div>

    </section>

  );

}

export default Hero;