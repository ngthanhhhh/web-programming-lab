import products from "../../data/products";
import ProductCard from "./ProductCard";
function ProductList(){
    return (
        <section className="products">
            <h2>Sản phẩm nổi bật</h2>

            <div className="product-list">
                {products.filter(p => p.status === "ACTIVE")
                .map(p => (
                    <ProductCard key={p.product_id} product={p}/>
                ))}
            </div>
        </section>
    );
}

export default ProductList;