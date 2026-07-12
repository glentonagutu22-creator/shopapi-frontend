import { useEffect, useState } from "react";
import api from "../services/api";

function Admin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
  name: "",
  description: "",
  brand: "",
  category: "",
  price: "",
  stock: "",
  image: "",
});

  useEffect(() => {
    fetchProducts();
  }, []);
  async function addProduct(e) {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/api/products",
      newProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Product added successfully");

    setNewProduct({
      name: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      stock: "",
      image: "",
    });

    fetchProducts();

  } catch (error) {
    console.log(error);
  }
}

  async function fetchProducts() {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  }


  async function updateProduct(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/api/products/${editingProduct._id}`,
        editingProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product updated successfully");

      setEditingProduct(null);

      fetchProducts();

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div style={{ padding: "30px" }}>

      <h1>Admin Dashboard</h1>
      <h2>Add Product</h2>

<form onSubmit={addProduct}>

<input
placeholder="Name"
value={newProduct.name}
onChange={(e)=>
setNewProduct({
...newProduct,
name:e.target.value
})
}
/>


<input
placeholder="Description"
value={newProduct.description}
onChange={(e)=>
setNewProduct({
...newProduct,
description:e.target.value
})
}
/>


<input
placeholder="Brand"
value={newProduct.brand}
onChange={(e)=>
setNewProduct({
...newProduct,
brand:e.target.value
})
}
/>


<input
placeholder="Category"
value={newProduct.category}
onChange={(e)=>
setNewProduct({
...newProduct,
category:e.target.value
})
}
/>


<input
placeholder="Price"
value={newProduct.price}
onChange={(e)=>
setNewProduct({
...newProduct,
price:e.target.value
})
}
/>


<input
placeholder="Stock"
value={newProduct.stock}
onChange={(e)=>
setNewProduct({
...newProduct,
stock:e.target.value
})
}
/>


<input
placeholder="Image URL"
value={newProduct.image}
onChange={(e)=>
setNewProduct({
...newProduct,
image:e.target.value
})
}
/>


<button>
Add Product
</button>

</form>


      {editingProduct && (
        <form onSubmit={updateProduct}>

          <h2>Edit Product</h2>

          <input
            value={editingProduct.name}
            onChange={(e)=>
              setEditingProduct({
                ...editingProduct,
                name:e.target.value
              })
            }
          />

          <input
            value={editingProduct.price}
            onChange={(e)=>
              setEditingProduct({
                ...editingProduct,
                price:e.target.value
              })
            }
          />

          <input
            value={editingProduct.stock}
            onChange={(e)=>
              setEditingProduct({
                ...editingProduct,
                stock:e.target.value
              })
            }
          />

          <button>
            Save Changes
          </button>

        </form>
      )}



      <h2>Products</h2>

      {products.map((product)=>(

        <div key={product._id}>

          <h3>{product.name}</h3>

          <p>
            Price: KSh {product.price}
          </p>


          <button
            onClick={() =>
              setEditingProduct(product)
            }
          >
            Edit
          </button>


          <button
            onClick={() =>
              deleteProduct(product._id)
            }
          >
            Delete
          </button>


        </div>

      ))}

    </div>
  );
}

export default Admin;