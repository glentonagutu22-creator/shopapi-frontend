import Hero from "../components/Hero";


function Home() {
  return (
    <main className="bg-slate-50">

      <Hero />

      

      {/* Why ShopSphere */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Why ShopSphere
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Shopping made simple
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Everything you need to get the technology you want,
              without making the shopping experience complicated.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-lg ">


              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Quality Products
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Browse a growing collection of phones, TVs,
                laptops, speakers and other electronics.
              </p>

            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-lg">

         

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Affordable Prices
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Find products at competitive prices designed
                to make modern technology more accessible.
              </p>

            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-lg">

          

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Easy M-Pesa Checkout
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Place your order and pay conveniently using
                M-Pesa from your phone.
              </p>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;