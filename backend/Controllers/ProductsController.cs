using backend.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static List<Product> _products = new List<Product>
    {
        new Product {Id = 1, Name = "Son môi lì", Price = 200000, Description = "Son môi lì, lâu trôi, cao cấp", Stock = 10},
        new Product {Id = 2, Name = "Kem dưỡng da", Price = 350000, Description = "Kem dưỡng da mờ thâm, mịn da", Stock = 20},
        new Product {Id = 3, Name = "Nước hoa hồng", Price = 400000, Description = "Nước hoa hồng cấp ẩm cho da", Stock = 10},
        new Product {Id = 4, Name = "Phấn má", Price = 450000, Description = "Phấn má cao cấp, mịn", Stock = 15}         
    };

    [HttpGet]
    public IActionResult GetAll() => Ok(_products);

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = _products.Find(p => p.Id == id);
        return product == null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public IActionResult Create(Product product)
    {
        product.Id = _products.Count > 0 ? _products.Max(p => p.Id) + 1 : 1;
        _products.Add(product);
        return CreatedAtAction(
            nameof(GetById), //gọi API nào để lấy lại
            new {id = product.Id}, //truyền param cho URL
            product //data trả về
        );
    } 

    [HttpPut("{id}")]
    public IActionResult Update(int id, Product product)
    {
        var index = _products.FindIndex(p => p.Id == id);
        if (index == -1) return NotFound();

        product.Id = id;
        _products[index] = product;
        return Ok(product);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var product = _products.Find(p => p.Id == id);
        if (product == null) return NotFound();

        _products.Remove(product);
        return NoContent();
    }
}