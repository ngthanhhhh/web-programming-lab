import lipstick from "../../assets/images/default.jpg";
const API_BASE = "http://localhost:5129";

function ProductCard({product}){
  const imgSrc =
    product?.imageUrl && product.imageUrl.startsWith("/")
      ? `${API_BASE}${product.imageUrl}`
      : lipstick;

    return (
        <div className="product-card">
            <img src = {imgSrc} alt={product.name || "product"}/>
            <h3>{product.name || "Chưa có tên"}</h3>
            <p>{Number(product?.price || 0).toLocaleString()}đ</p>
            <button>Thêm vào giỏ</button>
        </div>
    );
}
export default ProductCard;