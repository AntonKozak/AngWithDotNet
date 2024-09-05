using System.Runtime.CompilerServices;
using API.Extensions;
using API.SignalR;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Stripe;

namespace API.Controllers;

public class PaymentsController(
    IPaymentService paymentService,
     IUnitOfWork unitOfWork,
     ILogger<PaymentsController> logger,
     IConfiguration configuration,
     IHubContext<NotificationHub> hubContext
     ) : BaseApiController
{

    private readonly string _whSecret = configuration["StripeSettings:WhSecret"]!;

    [Authorize]
    [HttpPost("{cartId}")]
    public async Task<ActionResult<ShoppingCart>> CreateOrUpdatePaymentIntent(string cartId)
    {
        var cart = await paymentService.CraeteOrUpdatePaymentIntent(cartId);

        if (cart == null) return BadRequest("Problem with your cart");

        return Ok(cart);
    }

    [HttpGet("delivery-methods")]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
    {
        return Ok(await unitOfWork.Repository<DeliveryMethod>().ListAllAsync());
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        try
        {
            Console.WriteLine("trying to process stripe webhook");
            var stripeEvent = ConstructStripeEvent(json);

            if (stripeEvent.Data.Object is not PaymentIntent intent)
            {
                Console.WriteLine("intent is null or not PaymentIntent______------");
                return BadRequest("Error processing stripe webhook");
            }
            Console.WriteLine("PaymentIntent______------intent is not null or ");
            await HandlePaymentIntentSucceeded(intent);

            return Ok();
        }
        catch (StripeException ex)
        {
            logger.LogError(ex, "Stripe webhook error");
            return BadRequest("Stripe webhook error Payment Controller");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error processing stripe webhook");
            return BadRequest("Error processing stripe webhook Payment Controller");
        }

    }

    private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
    {
        Console.WriteLine("--Handling payment ----intent HandlePaymentIntentSucceeded----");
        if (intent.Status == "succeeded")
            Console.WriteLine("It------- is ------------succeeded");
        {
            var spec = new OrderSpecification(intent.Id, true);
            var order = await unitOfWork.Repository<Order>().GetEntityWithSpec(spec) ?? throw new Exception("Order not found");
            Console.WriteLine("------------Efter Repository Order");

            if ((long)order.GetTotal() * 100 != intent.Amount)
            {
                order.Status = OrderStatus.PaymentMismatch;
            }
            else
            {
                order.Status = OrderStatus.PaymentReceived;
            }
            Console.WriteLine("Efter Repository Order Status-------------------");
            await unitOfWork.Complete();

            var connectionId = NotificationHub.GetConnectionIdByEmail(order.BuyerEmail);
            if (!string.IsNullOrEmpty(connectionId))
            {
                await hubContext.Clients.Client(connectionId).SendAsync("OrderCompleteNotification", order.ToDto());
            }

        }
    }

    private Event ConstructStripeEvent(string json)
    {
        try
        {
            return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _whSecret);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error processing stripe webhook");
            throw new StripeException("Error processing stripe webhook", ex);
        }
    }
}
