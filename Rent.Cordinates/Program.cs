using LMS.Core.Entities;
using LMS.Repo.Repository;
using LMS.Repository.Repo;
using Newtonsoft.Json;
class Program
{
    static async Task Main(string[] args)
    {
        BaseRepository.ConnectionString = "Server=localhost;Database=Rent;Trusted_Connection=True;";
        await GetStates();
    }

    async static Task  GetStates()
    {
        try
        {
            MasterRepo repo = new MasterRepo();

            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("User-Agent", "PostmanRuntime/7.32.2");

            var states = await repo.GetStates();
            string url = "http://nominatim.openstreetmap.org/search.php?q={0}&polygon_geojson=1&format=jsonv2";
            string formattedurl = "";
            Location location;
            string jsonData;
            foreach (var state in states)
            {
                formattedurl = string.Format(url, state.city_name);
                var request = new HttpRequestMessage(HttpMethod.Get, formattedurl);

                var result = await client.SendAsync(request);
                if (result.IsSuccessStatusCode)
                {
                    jsonData = result.Content.ReadAsStringAsync().Result;
                    List<Class1>? data = JsonConvert.DeserializeObject<List<Class1>>(jsonData);
                    foreach (Class1 cordinates in data)
                    {
                        location = new Location();
                        location.LocationName = cordinates.display_name;
                        location.Long = cordinates.lon;
                        location.Lat = cordinates.lat;
                        location.CityId = state.city_id;
                        await repo.SaveLocation(location);
                    }
                }
                else
                {
                    continue;
                }
            }
        }
        catch(Exception ex)
        {
            Console.WriteLine(ex.ToString());
        }

    }
}

