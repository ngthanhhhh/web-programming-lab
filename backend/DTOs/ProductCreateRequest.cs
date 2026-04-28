namespace backend.DTOs;

public class ProductCreateRequest
{
    public string Name { get; set; }="";
    public decimal Price { get; set; }
    public string Description { get; set; }="";
    public int Stock{ get; set; }

    public IFormFile? Image{get; set; }
}