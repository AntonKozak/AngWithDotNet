using Core.Entities;

namespace Core.Specification;

public class ProductFilterSortPaginationSpecification : BaseSpecification<Product>
{
    public ProductFilterSortPaginationSpecification(string? brand, string? type, string? sort) : base(x =>
        (string.IsNullOrEmpty(brand) || x.Brand == brand) &&
        (string.IsNullOrEmpty(type) || x.Type == type))
    {
        switch (sort)
        {
            case "priceAsc":
                AddOrderBy(p => p.Price);
                break;
            case "priceDesc":
                AddOrderByDescending(p => p.Price);
                break;

            default:
                AddOrderBy(p => p.Name);
                break;
        }
    }
}