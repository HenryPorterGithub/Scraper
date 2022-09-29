using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.RegularExpressions;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ScrapeController : ControllerBase
    {

        [HttpGet("ScrapeSearchEngine")]
        public async Task<ActionResult> ScrapeSearchEngine([FromHeader] string Engine = "google", [FromHeader] string SearchQuery = "Digital Conveyancing", [FromHeader] string KeyWord = "InfoTrack", [FromHeader] int ResultCount = 100)
        //public async Task<ActionResult> ScrapeSearchEngine()
        {
            //string Engine = "google";
            //string SearchQuery = "Digital Conveyancing";
            //string KeyWord = "InfoTrack";
            //int ResultCount = 100;

            //HtmlNode[] nodes = AgilityScraper(Engine, SearchQuery, ResultCount);
            //int count = AgilityKeyWordCounter(KeyWord, nodes);

            Uri uri = UriGenerator(Engine.ToLower(), SearchQuery, ResultCount);

            string content = await Scraper(uri);

            string[] results = ParseContent(content);

            int count = KeyWordCounter(KeyWord, results);

            if (content.IndexOf("CAPTCHA") != -1)
            {
                return Ok(-1);
            }

            return Ok(count);
        }

        private static async Task<string> Scraper(Uri uri)
        {
            //Generate client with handler, cookie container, and a cookie consent cookie
            HttpClientHandler handler = new HttpClientHandler();
            handler.CookieContainer = new CookieContainer();
            handler.CookieContainer.Add(uri, new Cookie("CONSENT", "YES+1", "/", ".google.co.uk"));
            //if (uri.Host == "www.bing.com")
            //{
            //    handler.CookieContainer.Add(uri, new Cookie("MUIDB", "0CD3A88B602B69CC0DCEBAA5610C6895", "/", "www.bing.com"));
            //}
            HttpClient client = new HttpClient(handler);

            //Scrape the webpage
            var response = await client.GetAsync(uri);
            //IEnumerable<Cookie> responseCookies = handler.CookieContainer.GetCookies(uri).Cast<Cookie>();
            var content = await response.Content.ReadAsStringAsync();
            return content;
        }

        private static string[] ParseContent(string content)
        {

            //Narrow down to <h3><div>Content</div></h3>
            string pattern = @"<h[3][^>]*?>(?<TagText>.*?)</h[3]>";
            var results = Regex.Matches(content, pattern)
                .Cast<Match>()
                .Select(m => m.Value)
                .ToArray();

            //Remove all HTML tags
            var regex = new Regex(@"<[^>]*>");
            int i = 0;
            foreach (var item in results)
            {
                results[i] = regex.Replace(item, "");
                i += 1;
            }

            return results;
        }

        private Uri UriGenerator(string Engine, string SearchQuery, int ResultCount)
        {
            //We could use the enum class to store these engine strings as variables
            //This would future proof it for 20+ engines, for example
            //For the purposes of this demo I will leave as-is
            switch (Engine)
            {
                case "google":
                    Uri uriGoogle = new Uri("https://www." + Engine + ".co.uk/search?q=" + SearchQuery + "&num=" + ResultCount.ToString());
                    return uriGoogle;
                //case "bing":
                //    Uri uriBing = new Uri("https://www." + Engine + ".com/search?q=" + SearchQuery + "&count=" + ResultCount.ToString());
                //    return uriBing;
            }
            //Return empty string if switch fails
            Uri uri = new Uri("");
            return uri;
        }

        private static int KeyWordCounter(string KeyWord, string[] nodes)
        {
            string[] titles = new string[nodes.Length];

            //This method will not count multiple keyword hits within one result
            int i = 0;
            int count = 0;
            foreach (var item in nodes)
            {
                if (item.IndexOf(KeyWord, StringComparison.OrdinalIgnoreCase) != -1)
                {
                    count += 1;
                }
                i += 1;
            }

            return count;
        }

        //private static int AgilityKeyWordCounter(string KeyWord, HtmlNode[] nodes)
        //{
        //    string[] titles = new string[nodes.Length];

        //    int i = 0;
        //    int count = 0;
        //    foreach (HtmlNode item in nodes)
        //    {
        //        titles[i] = item.InnerText;
        //        if (titles[i].IndexOf(KeyWord, StringComparison.OrdinalIgnoreCase) != -1)
        //        {
        //            count += 1;
        //        }
        //        i += 1;
        //    }

        //    return count;
        //}

        //private static HtmlNode[] AgilityScraper(string Engine, string SearchQuery, int ResultCount)
        //{
        //    string url = "";
        //    switch (Engine)
        //    {
        //        case "google":
        //            url = "https://www." + Engine + ".com/search?q=" + SearchQuery + "&num=" + ResultCount.ToString();
        //            break;
        //        case "bing":
        //            url = "https://www." + Engine + ".com/search?q=" + SearchQuery + "&count=" + ResultCount.ToString();
        //            break;
        //    }
        //    var web = new HtmlWeb();
        //    var doc = web.Load(url);
        //    HtmlNode[] nodes = doc.DocumentNode.SelectNodes("//div[@role = 'heading']").ToArray();
        //    return nodes;
        //}
    }
}
