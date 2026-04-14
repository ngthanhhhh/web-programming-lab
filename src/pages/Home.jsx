import Header from "../components/layout/Header";
import Banner from "../components/home/Banner";
import CategoryList from "../components/home/CategoryList";
import ProductList from "../components/home/ProductList";
import Footer from "../components/layout/Footer";

function Home(){
    return(
        <div className="container">
            <Header/>
            <Banner/>
            <CategoryList/>
            <ProductList/>
            <Footer/>
        </div>
    )
}

export default Home;