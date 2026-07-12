import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import "../styles/Home.css";

function Products() {
const [products, setProducts] = useState([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");

const categories = [
  ...new Set(products.map((product) => product.category))
];

  useEffect(() => {
    fetchProducts();
  }, []);


  async function fetchProducts() {
    try {

      const response = await api.get("/api/products");

      setProducts(response.data);

    } catch (error) {
      console.log(error);
    }
  }


  const filteredProducts = products.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());


    const matchesCategory =
      category === "" ||
      product.category === category;


    return matchesSearch && matchesCategory;

  });


  return (

    <div>

      <h1 style={{textAlign:"center"}}>
        All Products
      </h1>


      <div style={{
        display:"flex",
        justifyContent:"center",
        gap:"20px",
        margin:"30px"
      }}>


        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />


        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        >
<option value="">
 All Categories
</option>

{categories.map((cat)=>(
  <option key={cat} value={cat}>
    {cat}
  </option>
))}

        </select>


      </div>


      <div className="products-grid">

        {filteredProducts.map((product)=>(

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>


    </div>

  );

}


export default Products;