import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../../api/productApi";
function ProductList(){
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    //form dùng để create/update product
    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        stock: "",
        image: null
    });

    const loadProducts = async() => {
        const res = await getProducts();
        setProducts(res.data); //cập nhật state products bằng dữ liệu từ BE
    };

    useEffect(() => {
        loadProducts();
    }, []); //dependency rỗng → chỉ chạy 1 lần duy nhất

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setEditingProduct(null);
        setForm({
            name: "",
            price: "",
            description: "",
            stock: "",
            image: null
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("description", form.description);
        formData.append("stock", form.stock);

        if (form.image) {
            formData.append("image", form.image);
        }

        if (editingProduct) {
            await updateProduct(editingProduct.id, formData);
        } else {
            await createProduct(formData);
        }

        resetForm();
        loadProducts();
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setForm({
            name: product.name,
            price: product.price,
            description: product.description,
            stock: product.stock,
            image: null
        });
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        loadProducts();
    };

    return (
        <section className="products">
            <h2>Sản phẩm nổi bật</h2>

            <form className="product-form" onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Tên sản phẩm"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="price"
                    placeholder="Giá"
                    value={form.price}
                    onChange={handleChange}
                />

                <input
                    name="description"
                    placeholder="Mô tả"
                    value={form.description}
                    onChange={handleChange}
                />

                <input
                    name="stock"
                    placeholder="Số lượng"
                    value={form.stock}
                    onChange={handleChange}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            image: e.target.files[0]
                        })
                    }
                />
                <button type="submit">
                    {editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </button>

                {editingProduct && (
                    <button type="button" onClick={resetForm}>
                        Hủy sửa
                    </button>
                )}
            </form>

            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <ProductCard product={product}/>
                        <div className="product-actions">
                            <button onClick={() => handleEdit(product)}>Sửa</button>
                            <button onClick={() => handleDelete(product.id)}>Xóa</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProductList;