using Amazon.Runtime;
using Amazon.S3;
using LMS.Core.Entities;
using LMS.Core.Interfaces;
using LMS.Repo.Repository;
using LMS.Repository.Repo;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000",
                                "https://localhost").AllowAnyHeader()
                                                  .AllowAnyMethod();
        });
});

var aWSOptions = builder.Configuration.GetAWSOptions();
aWSOptions.Credentials= new BasicAWSCredentials("AKIA4M4QDXIPX7QZMRE4", "Y1yREodYw9OtiQQu0UKhT1E8pbVXLF7ZB1Xpf1f+");
aWSOptions.DefaultConfigurationMode = DefaultConfigurationMode.Standard;

// Add services to the container.
builder.Services.AddScoped<IMasters, MasterRepo>();
builder.Services.AddScoped<IProperty, PropertyRepo>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUser, UserRepo>();
builder.Services.AddScoped<IContact, ContactRepo>();
builder.Services.AddScoped<IAccounts, AccountsRepo>();
builder.Services.AddDefaultAWSOptions(aWSOptions);
builder.Services.AddAWSService<IAmazonS3>();
var appSettingsSection = builder.Configuration.GetSection("AppSettings");
var appSettings = appSettingsSection.Get<AppSettings>();
builder.Services.AddSingleton(appSettings);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = appSettings.ValidAudience,
        ValidIssuer = appSettings.ValidIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.TSecret))
    };
});

var app = builder.Build();

BaseRepository.ConnectionString = app.Configuration.GetConnectionString("Value");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.

app.UseStaticFiles();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");
app.Run();
