import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

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

  async function fetchProducts() {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    }
  }

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

      await api.post("/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully");

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

      toast.error(
        error.response?.data?.message ||
          "Failed to add product"
      );
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

      toast.success("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete product"
      );
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

      toast.success("Product updated successfully");

      setEditingProduct(null);

      fetchProducts();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
          "Failed to update product"
      );
    }
  }

  function handleNewProductChange(e) {
    const { name, value } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleEditChange(e) {
    const { name, value } = e.target;

    setEditingProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              ShopSphere
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your products and inventory.
            </p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Total Products
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {products.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Products In Stock
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {
                products.filter(
                  (product) => Number(product.stock) > 0
                ).length
              }
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-medium text-gray-500">
              Out Of Stock
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {
                products.filter(
                  (product) => Number(product.stock) <= 0
                ).length
              }
            </p>
          </div>

        </div>

        {/* Add Product */}
        <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Add New Product
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add a new product to your ShopSphere catalogue.
            </p>
          </div>

          <form
            onSubmit={addProduct}
            className="grid gap-5 sm:grid-cols-2"
          >

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Name
              </label>

              <input
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                placeholder="e.g. Samsung Galaxy S25"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Brand
              </label>

              <input
                name="brand"
                value={newProduct.brand}
                onChange={handleNewProductChange}
                placeholder="e.g. Samsung"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                name="category"
                value={newProduct.category}
                onChange={handleNewProductChange}
                placeholder="e.g. Phones"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price (KSh)
              </label>

              <input
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleNewProductChange}
                placeholder="e.g. 45000"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Stock
              </label>

              <input
                name="stock"
                type="number"
                value={newProduct.stock}
                onChange={handleNewProductChange}
                placeholder="e.g. 20"
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    image: e.target.files[0],
                  }))
                }
                className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-medium file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
                placeholder="Describe the product..."
                rows="4"
                required
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] sm:w-auto"
              >
                + Add Product
              </button>
            </div>

          </form>
        </section>

        {/* Edit Product */}
        {editingProduct && (
          <section className="mb-10 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">

            <div className="mb-6 flex items-start justify-between gap-4">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Product
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update the selected product.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-white hover:text-gray-900"
              >
                Cancel
              </button>

            </div>

            <form
              onSubmit={updateProduct}
              className="grid gap-5 sm:grid-cols-2"
            >

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Name
                </label>

                <input
                  name="name"
                  value={editingProduct.name}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price
                </label>

                <input
                  name="price"
                  type="number"
                  value={editingProduct.price}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Stock
                </label>

                <input
                  name="stock"
                  type="number"
                  value={editingProduct.stock}
                  onChange={handleEditChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </section>
        )}

        {/* Products */}
        <section>

          <div className="mb-6 flex items-end justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your current product catalogue.
              </p>
            </div>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {products.length} products
            </span>

          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-gray-100">
              <div className="text-4xl">
                📦
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                No products yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add your first product using the form above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product) => (

                <div
                  key={product._id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-md"
                >

                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100">

                    <img
                      src={
                        product.image ||
                        "https://via.placeholder.com/400x400?text=No+Image"
                      }
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute right-3 top-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          Number(product.stock) > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {Number(product.stock) > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </div>

                  </div>

                  {/* Content */}
                  <div className="p-5">

                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {product.category}
                    </p>

                    <h3 className="mt-1 line-clamp-2 min-h-[3.5rem] text-lg font-bold text-gray-900">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {product.brand}
                    </p>

                    <p className="mt-4 text-xl font-bold text-gray-900">
                      KSh {Number(product.price).toLocaleString()}
                    </p>

                    {/* Actions */}
                    <div className="mt-5 grid grid-cols-2 gap-2">

                      <button
                        onClick={() =>
                          setEditingProduct(product)
                        }
                        className="rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                        className="rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

      </div>
    </div>
  );
}

export default Admin;