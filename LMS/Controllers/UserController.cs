using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace SharePointUpdate
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var siteUrl = "https://yoursite.sharepoint.com";
            var listName = "YourListName";
            var itemId = 1; // For example, item with ID = 1
            var utf8Value = "Your UTF-8 encoded value";
            var username = "yourusername";
            var password = "yourpassword";
            var fieldName = "YourFieldName";

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // Authentication
                var authToken = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{username}:{password}"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);

                // Get the form digest value
                var digestUrl = $"{siteUrl}/_api/contextinfo";
                var digestResponse = await client.PostAsync(digestUrl, new StringContent(string.Empty));
                var digestJson = await digestResponse.Content.ReadAsStringAsync();
                var formDigestValue = Newtonsoft.Json.Linq.JObject.Parse(digestJson)["d"]["GetContextWebInformation"]["FormDigestValue"].ToString();

                // Update the list item with the UTF-8 value
                var updateUrl = $"{siteUrl}/_api/web/lists/getbytitle('{listName}')/items({itemId})";
                var itemPayload = new
                {
                    __metadata = new { type = $"SP.Data.{listName}ListItem" },
                    YourFieldName = utf8Value
                };
                var itemContent = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(itemPayload), Encoding.UTF8, "application/json");
                itemContent.Headers.Add("X-RequestDigest", formDigestValue);
                itemContent.Headers.Add("IF-MATCH", "*");
                itemContent.Headers.Add("X-HTTP-Method", "MERGE");

                var updateResponse = await client.PostAsync(updateUrl, itemContent);

                if (updateResponse.IsSuccessStatusCode)
                {
                    Console.WriteLine("Item updated successfully");
                }
                else
                {
                    var error = await updateResponse.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error updating item: {error}");
                }
            }
        }
    }
}
