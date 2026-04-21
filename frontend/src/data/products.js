import lipstick from "../assets/images/lipstick.jpg";
import cream from "../assets/images/cream.jpg";
import toner from "../assets/images/toner.jpg";
import blush from "../assets/images/blush.jpg";
const products = [
  {
    product_id: 1,
    name: "Son môi lì",
    price: 200000,
    image: lipstick,
    category_id: 2,
    status: "ACTIVE"
  },
  {
    product_id: 2,
    name: "Kem dưỡng da",
    price: 350000,
    image: cream,
    category_id: 1,
    status: "ACTIVE"
  },
  {
    product_id: 3,
    name: "Nước hoa hồng",
    price: 400000,
    image: toner,
    category_id: 1,
    status: "ACTIVE"
  },
  {
    product_id: 4,
    name: "Phấn má",
    price: 450000,
    image: blush,
    category_id: 2, 
    status: "ACTIVE"
  }
];

export default products;