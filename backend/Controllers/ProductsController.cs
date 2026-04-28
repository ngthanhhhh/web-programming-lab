using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly MyDbContext _context;

    public ProductsController(MyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult>GetById(int id)
    {
        var product = await _context.Products.FindAsync(id);
        return product == null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ProductCreateRequest request)
    {
        var imageUrl = await SaveImageAsync(request.Image);
        var product = new Product{
            Name = request.Name,
            Price = request.Price,
            Description = request.Description,
            Stock = request.Stock,
            ImageUrl = imageUrl
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById),
                                new {id = product.Id},
                                product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] ProductUpdateRequest request)
    {
        var existingProduct = await _context.Products.FindAsync(id);
        if (existingProduct == null) return NotFound();

        existingProduct.Name = request.Name;
        existingProduct.Price = request.Price;

        existingProduct.Description = request.Description;
        existingProduct.Stock = request.Stock;

        if (request.Image != null && request.Image.Length > 0)
        {
            existingProduct.ImageUrl = await SaveImageAsync(request.Image);
        } 

        await _context.SaveChangesAsync();

        return Ok(existingProduct);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        if (!string.IsNullOrEmpty(product.ImageUrl))
        {
            var filePath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                product.ImageUrl.TrimStart('/') // bỏ dấu /
            );

            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }

    private async Task<string> SaveImageAsync(IFormFile ? image)
    {
        if (image == null || image.Length == 0)
        {
            return "";
        }

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var extension = Path.GetExtension(image.FileName).ToLower();

        if (!allowedExtensions.Contains(extension))
        {
            throw new Exception("File ảnh không hợp lệ");
        }

        var fileName = $"{Guid.NewGuid()}{extension}";
        var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "products");

        Directory.CreateDirectory(folderPath);
        var filePath = Path.Combine(folderPath, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await image.CopyToAsync(stream);
        return $"/images/products/{fileName}";
    }
}