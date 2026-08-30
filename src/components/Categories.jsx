import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Phones",
      description: "Smartphones for work, entertainment and everyday life.",
      icon: "📱",
      color: "bg-blue-100",
    },
    {
      name: "Televisions",
      description: "Upgrade your home entertainment experience.",
      icon: "📺",
      color: "bg-purple-100",
    },
    {
      name: "Speakers",
      description: "Bring powerful sound into your home.",
      icon: "🔊",
      color: "bg-orange-100",
    },
    {
      name: "Laptops",
      description: "Powerful devices for work, study and creativity.",
      icon: "💻",
      color: "bg-green-100",
    },
  ];

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Browse our collection
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-3 max-w-xl text-slate-600">
              Find the technology you need by browsing one of our
              popular product categories.
            </p>
          </div>

          <Link
            to="/products"
            className="font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all products →
          </Link>

        </div>

        {/* Categories */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl">

                {/* Icon */}
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color} text-3xl transition duration-300 group-hover:scale-110`}
                >
                  {category.icon}
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                {/* Link indicator */}
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
                  Browse {category.name}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;