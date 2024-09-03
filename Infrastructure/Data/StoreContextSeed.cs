using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data;

public class StoreContextSeed
{

    public static async Task SeedAsync(StoreContext context)
    {
        if (!context.Products.Any())
        {
            var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");

            var products = JsonSerializer.Deserialize<List<Product>>(productsData);

            if (products == null)
            {
                return;
            }

            context.Products.AddRange(products);

            await context.SaveChangesAsync();
        }

        if (!context.DeliveryMethods.Any())
        {
            var deliveryData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");

            var delivery = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);

            if (delivery == null)
            {
                return;
            }

            context.DeliveryMethods.AddRange(delivery);

            await context.SaveChangesAsync();
        }
    }
}