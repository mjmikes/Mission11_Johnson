using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WaterProject.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    ProjectID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProjectName = table.Column<string>(type: "TEXT", nullable: false),
                    ProjectType = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectRegionalProgram = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectImpact = table.Column<int>(type: "INTEGER", nullable: true),
                    ProjectPhase = table.Column<string>(type: "TEXT", nullable: true),
                    ProjectFunctionalityStatus = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ProjectID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
