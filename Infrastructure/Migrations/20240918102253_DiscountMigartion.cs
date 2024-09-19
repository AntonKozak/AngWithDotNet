using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class DiscountMigartion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2cec5d33-0590-4681-9f80-4763afecfd3a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "45111757-21b8-41ae-9e6a-1dffe8b830ce");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a2a425b9-aec8-43b4-a249-368dd1520c43");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aabda8eb-122d-4cb2-b562-2e2a5693ecc4");

            migrationBuilder.AddColumn<decimal>(
                name: "Discount",
                table: "Orders",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "516a3209-e588-43f5-bf5b-02f2713b26a1", null, "Moderator", "MODERATOR" },
                    { "7dbe4c38-e346-49d6-903c-96c6d03ff92d", null, "Admin", "ADMIN" },
                    { "96477a4b-134d-4253-b97b-0421a389f643", null, "Member", "MEMBER" },
                    { "d255185c-4ac4-436b-a134-1c053f36c87f", null, "Customer", "Customer" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "516a3209-e588-43f5-bf5b-02f2713b26a1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7dbe4c38-e346-49d6-903c-96c6d03ff92d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "96477a4b-134d-4253-b97b-0421a389f643");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d255185c-4ac4-436b-a134-1c053f36c87f");

            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Orders");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2cec5d33-0590-4681-9f80-4763afecfd3a", null, "Moderator", "MODERATOR" },
                    { "45111757-21b8-41ae-9e6a-1dffe8b830ce", null, "Member", "MEMBER" },
                    { "a2a425b9-aec8-43b4-a249-368dd1520c43", null, "Admin", "ADMIN" },
                    { "aabda8eb-122d-4cb2-b562-2e2a5693ecc4", null, "Customer", "Customer" }
                });
        }
    }
}
