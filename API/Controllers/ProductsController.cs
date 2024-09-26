using API.DTOs;
using API.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController(IUnitOfWork unitOfWork, IPhotoService photoService) : BaseApiController
    {
        [Cache(160)]
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery] ProductSpecParams specParams)
        {
            var spec = new ProductFilterSortPaginationSpecification(specParams);

            return await CreatePagedResult(unitOfWork.Repository<Product>(), spec, specParams.PageIndex, specParams.PageSize);
        }

        [HttpGet("with-photos/{id:int}")]
        public async Task<ActionResult<ProductDto>> GetProductWithPhoto(int id)
        {
            var product = await unitOfWork.Repository<Product>().GetByIdWithPhotoAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            var productDto = new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                PictureUrl = product.PictureUrl,
                Type = product.Type,
                Brand = product.Brand,
                QuantityInStock = product.QuantityInStock,
                Photos = product.Photos.Select(p => new PhotoDto
                {
                    Id = p.Id,
                    Url = p.Url,
                    IsMain = p.IsMain
                }).ToList()
            };

            return Ok(productDto);
        }


        [Cache(160)]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await unitOfWork.Repository<Product>().GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [InvalidateCache("api/products|")]
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            unitOfWork.Repository<Product>().Add(product);

            if (await unitOfWork.Complete())
            {
                return CreatedAtAction("GetProduct", new { id = product.Id }, product);
            }

            return BadRequest("Failed to create product, please try again or contact the administrator");
        }

        [InvalidateCache("api/products|")]
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (product.Id != id || !ProductExists(id))
            {
                return BadRequest("Invalid product id or product does not exist");
            }

            unitOfWork.Repository<Product>().Update(product);

            if (await unitOfWork.Complete())
            {
                return CreatedAtAction("GetProduct", new { id = product.Id }, product);
            }

            return BadRequest("Failed to update product, please try again or contact the administrator");
        }

        [InvalidateCache("api/products|")]
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await unitOfWork.Repository<Product>().GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            Console.WriteLine("DeleteProduct- API");

            unitOfWork.Repository<Product>().Remove(product);
            if (await unitOfWork.Complete())
            {
                return CreatedAtAction("GetProduct", new { id = product.Id }, product);
            }

            return BadRequest("Failed to delete product, please try again or contact the administrator");
        }

        [Cache(10000)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
        {
            var spec = new BrandListSpecification();

            return Ok(await unitOfWork.Repository<Product>().ListAsync(spec));
        }

        [Cache(10000)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
        {
            var spec = new TypeListSpecification();

            return Ok(await unitOfWork.Repository<Product>().ListAsync(spec));
        }

        private bool ProductExists(int id)
        {
            return unitOfWork.Repository<Product>().Exists(id);
        }


        [HttpPost("{productId}/add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(int productId, IFormFile file)
        {
            var product = await unitOfWork.Repository<Product>().GetByIdAsync(productId);
            if (product == null) return NotFound();

            var result = await photoService.AddPhotoAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {
                PublicId = result.PublicId,
                Url = result.SecureUrl.AbsoluteUri,
            };

            product.PictureUrl = photo.Url;
            product.Photos.Add(photo);


            if (await unitOfWork.Complete())
            {
                return CreatedAtAction(nameof(GetProduct), new { id = productId }, new PhotoDto
                {
                    Id = photo.Id,
                    Url = photo.Url,
                    IsMain = photo.IsMain
                });
            }

            return BadRequest("Problem adding photo");
        }
    }
}
