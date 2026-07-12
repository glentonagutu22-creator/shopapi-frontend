import "../styles/Categories.css";

function Categories() {

  const categories = [
    {
      name: "Phones",
      icon: "📱"
    },
    {
      name: "Televisions",
      icon: "📺"
    },
    {
      name: "Speakers",
      icon: "🔊"
    },
    {
      name: "Laptops",
      icon: "💻"
    }
  ];


  return (
    <section>

      <h2 style={{textAlign:"center"}}>
        Shop By Category
      </h2>


      <div className="category-grid">

        {categories.map((category)=>(
          <div 
            className="category-card"
            key={category.name}
          >

            <h1>
              {category.icon}
            </h1>

            <h3>
              {category.name}
            </h3>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;