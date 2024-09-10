using System.Runtime.CompilerServices;
using Core.Entities;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services;

public class PaymentService : IPaymentService
{
    private readonly ICartService cartService;
    private readonly IUnitOfWork unitOfWork;

    public PaymentService(IConfiguration config, ICartService cartService, IUnitOfWork unitOfWork)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
        this.cartService = cartService;
        this.unitOfWork = unitOfWork;
    }

    public async Task<string> RefundPayment(string paymentIntentId)
    {
        var refundOptions = new RefundCreateOptions
        {
            PaymentIntent = paymentIntentId
        };

        var refundService = new RefundService();
        var refund = await refundService.CreateAsync(refundOptions);

        return refund.Status;
    }
    public async Task<ShoppingCart?> CraeteOrUpdatePaymentIntent(string cartId)
    {
        var cart = await cartService.GetCartAsync(cartId);

        if (cart == null) return null;

        var shippingPrice = 0m;

        if (cart.DeliveryMethodId.HasValue)
        {
            var deliveryMethod = await unitOfWork.Repository<DeliveryMethod>().GetByIdAsync((int)cart.DeliveryMethodId);
            if (deliveryMethod == null) return null;

            shippingPrice = deliveryMethod.Price;
        }

        foreach (var item in cart.Items)
        {
            var productItem = await unitOfWork.Repository<Core.Entities.Product>().GetByIdAsync(item.ProductId);
            if (productItem == null) return null;

            if (item.Price != productItem.Price)
            {
                item.Price = productItem.Price;
            }
        }

        var service = new PaymentIntentService();

        PaymentIntent? intent = null;

        if (string.IsNullOrEmpty(cart.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)cart.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100,
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" }
            };

            intent = await service.CreateAsync(options);
            cart.ClientSecret = intent.ClientSecret;
            cart.PaymentIntentId = intent.Id;
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = (long)cart.Items.Sum(i => i.Quantity * (i.Price * 100)) + (long)shippingPrice * 100
            };

            await service.UpdateAsync(cart.PaymentIntentId, options);
        }

        await cartService.SetCartAsync(cart);

        return cart;
    }

}
