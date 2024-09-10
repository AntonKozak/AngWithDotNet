using API.DTOs;
using API.Extensions;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specification;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(Roles = "Admin")]
public class AdminController(IUnitOfWork unitOfWork) : BaseApiController
{

    [HttpGet("orders")]
    public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrders([FromQuery] OrderSpecParams specParams)
    {
        var spec = new OrderSpecification(specParams);
        return await CreatePagedResult(unitOfWork.Repository<Order>(), spec, specParams.PageIndex, specParams.PageSize, o => o.ToDto());
    }

    [HttpGet("orders/{id}")]
    public async Task<ActionResult<OrderDto>> GetOrderById(int id)
    {
        var spec = new OrderSpecification(id);
        var order = await unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        return order == null ? NotFound() : Ok(order.ToDto());
    }

    [HttpPost("orders/refund/{paymentIntentId}")]
    public async Task<ActionResult<OrderDto>> RefundOrder(string paymentIntentId, IPaymentService paymentService)
    {
        var spec = new OrderSpecification(paymentIntentId);
        var order = await unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

        if (order == null) return NotFound("NoContent order with this id found");

        if (order.Status == OrderStatus.Pending) return BadRequest("Order has already been refunded or not recived money for it");

        var result = await paymentService.RefundPayment(order.PaymentId);

        if (result == "succeeded")
        {
            order.Status = OrderStatus.PaymentRefunded;
            await unitOfWork.Complete();
            return Ok(order.ToDto());
        }

        return BadRequest("Refund failed");
    }
}
