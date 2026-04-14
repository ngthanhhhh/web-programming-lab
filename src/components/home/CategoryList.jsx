import categories from "../../data/categories";
function CategoryList(){
    return (
        <section className="categories">
            <h2>Danh mục</h2>

            <div className="category-list">
                {categories.map(c => (
                    <div key={c.category_id} className="category-item">
                        {c.name}
                    </div>
                ))}
            </div>
        </section>
    );
}
export default CategoryList;