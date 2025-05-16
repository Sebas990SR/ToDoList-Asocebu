using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoApi.Migrations
{
    /// <inheritdoc />
    public partial class TerceraMigracion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "TodoTasks",
                newName: "Titulo");

            migrationBuilder.AddColumn<string>(
                name: "Descripcion",
                table: "TodoTasks",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descripcion",
                table: "TodoTasks");

            migrationBuilder.RenameColumn(
                name: "Titulo",
                table: "TodoTasks",
                newName: "Title");
        }
    }
}
