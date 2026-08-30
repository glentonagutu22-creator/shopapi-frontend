import { Link } from "react-router-dom";
import heroBanner from "../assets/hero-banner.jpg";

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBanner}
          alt="ShopSphere electronics"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      {/* Hero Content */}
      <div className="mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
             Quality electronics. Flexible payments.
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Own the technology you want.
            <span className="block text-blue-400">
              Pay your way.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
            Shop quality phones, televisions, laptops, speakers and
            other electronics at affordable prices with flexible
            payment options.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-600/30"
            >
              Shop Now
              <span className="ml-2 text-lg">→</span>
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Explore Products
            </Link>

          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/20 pt-6 text-sm text-slate-300">

            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Quality Products
            </div>

            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Affordable Prices
            </div>

            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              M-Pesa Payments
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;