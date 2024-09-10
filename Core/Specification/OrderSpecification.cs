using Core.Entities.OrderAggregate;

namespace Core.Specification;

public class OrderSpecification : BaseSpecification<Order>
{
    public OrderSpecification(string email) : base(x => x.BuyerEmail == email)
    {
        AddInclude(x => x.OrderItems);
        AddInclude(x => x.DeliveryMethod);
        AddOrderByDescending(o => o.OrderDate);
    }

    public OrderSpecification(string email, int id) : base(x => x.BuyerEmail == email && x.Id == id)
    {
        AddInclude(x => x.OrderItems);
        AddInclude(x => x.DeliveryMethod);
    }

    public OrderSpecification(string paymentIntentId, bool isPaymentIntent) :
      base(x => x.PaymentId == paymentIntentId)
    {
        AddInclude(x => x.OrderItems);
        AddInclude(x => x.DeliveryMethod);
    }

    public OrderSpecification(OrderSpecParams specParams) : base(x =>
        string.IsNullOrEmpty(specParams.Status) || x.Status == ParseStatus(specParams.Status)
    )
    {
        AddInclude(x => x.OrderItems);
        AddInclude(x => x.DeliveryMethod);
        ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);
        AddOrderByDescending(x => x.OrderDate);
    }

    public OrderSpecification(int id) : base(x => x.Id == id)
    {
        AddInclude(x => x.OrderItems);
        AddInclude(x => x.DeliveryMethod);
    }

    private static OrderStatus? ParseStatus(string status)
    {
        if (Enum.TryParse<OrderStatus>(status, true, out var result)) return result;
        return null;
    }
}
