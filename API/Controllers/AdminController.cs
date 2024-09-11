using API.DTOs;
using API.Extensions;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(Roles = "Admin")]
public class AdminController : BaseApiController
{

    private readonly IUnitOfWork unitOfWork;
    private readonly IPaymentService paymentService;

    public AdminController(IUnitOfWork unitOfWork, IPaymentService paymentService)
    {
        this.unitOfWork = unitOfWork;
        this.paymentService = paymentService;
    }

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

    [HttpPost("orders/refund/{id:int}")]
    public async Task<ActionResult<OrderDto>> RefundOrder(int id)
    {
        var spec = new OrderSpecification(id);

        var order = await unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

        if (order == null) return BadRequest("No order with that id");

        if (order.Status == OrderStatus.Pending)
            return BadRequest("Payment not received for this order");

        var result = await paymentService.RefundPayment(order.PaymentId);

        if (result == "succeeded")
        {
            order.Status = OrderStatus.PaymentRefunded;

            await unitOfWork.Complete();

            return order.ToDto();
        }

        return BadRequest("Problem refunding order");
    }

}
