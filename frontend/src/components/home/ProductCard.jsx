function ProductCard({product}){
    return (
        <div className="product-card">
            <img src = {product.image} alt=""/>
            <h3>{product.name}</h3>
            <p>{product.price.toLocaleString()}đ</p>
            <button>Thêm vào giỏ</button>
        </div>
    );
}
export default ProductCard;