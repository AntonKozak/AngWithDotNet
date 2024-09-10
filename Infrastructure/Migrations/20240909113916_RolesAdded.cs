using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RolesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
