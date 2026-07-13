import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Admin.css";

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
  image: null,
});

  useEffect(() => {
    fetchProducts();
  }, []);
  async function addProduct(e) {
  e.preventDefault();

  try {

    const token = localStorage.getItem("token");


    const formData = new FormData();


    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("brand", newProduct.brand);
    formData.append("category", newProduct.category);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);


    if (newProduct.image) {
      formData.append("image", newProduct.image);
    }


    await api.post(
      "/api/products",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
      image: null,
    });


    fetchProducts();


  } catch (error) {

    console.log(error.response?.data || error.message);

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
  <div className="admin-container">

     <h1 className="admin-title">
  Admin Dashboard
</h1>
      <h2>Add Product</h2>

<form className="admin-form" onSubmit={addProduct}>

<input
className="admin-input"
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
className="admin-input"
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
className="admin-input"
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
className="admin-input"
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
className="admin-input"
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
className="admin-input"
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
className="admin-input"
type="file"
accept="image/*"
onChange={(e)=>
setNewProduct({
 ...newProduct,
 image:e.target.files[0]
})
}
/>

<button className="add-btn">
 Add Product
</button>
</form>


      {editingProduct && (
        <form onSubmit={updateProduct}>

          <h2>Edit Product</h2>

          <input
          className="admin-input"
            value={editingProduct.name}
            onChange={(e)=>
              setEditingProduct({
                ...editingProduct,
                name:e.target.value
              })
            }
          />

          <input
          className="admin-input"
            value={editingProduct.price}
            onChange={(e)=>
              setEditingProduct({
                ...editingProduct,
                price:e.target.value
              })
            }
          />

          <input
          className="admin-input"
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
<div className="product-grid">

{products.map((product)=>(

<div 
className="admin-product-card"
key={product._id}
>
    <img
src={product.image}
alt={product.name}
/> 

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
    </div>
  );
  }


export default Admin;