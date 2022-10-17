using TaskManager.Core;
using TaskManager.WebApi.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSignalR();
builder.Services.AddTransient<IUserServices, UserServices>();
builder.Services.AddTransient<IWorkService, WorkServices>();
builder.Services.AddSingleton<IDbClient, DbClient>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<TaskManagerDbConfig>(builder.Configuration);
builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder => builder.AllowAnyMethod().AllowAnyHeader().AllowCredentials().SetIsOriginAllowed((hosts) => true));
});
var app = builder.Build();
app.MapHub<WorkHub>("/works");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("CORSPolicy");

app.Run();
