# Scraper
A ReactJS SPA + ASP.NET Core Web API Pair for Scraping Google Results

# Documentation
No 3rd party libraries are used in any part of this project.

The API scrapes Google results with a search query you provide, then uses Regex to isolate the titles of the pages displayed.
It then calculates the number of titles which contain at least one instance of the keyword you provide, returning a single integer.
To do this it is required to supply the HttpClient with a cookie containing the "CONSENT" and "YES+X" key value pair.
This bypasses the cookie consent request you would otherwise scrape. 

DuckDuck go does not have such any cookie issues, but it seems like there are extra steps required that may involve running javascripts within your client to simulate being a normal user. I was not able to find the proper consent cookie key value pair for Bing, so it only works with google for now.

It is possible to get blocked from scraping google with this tool if you spam it too much, so be careful. The only way to bypass that block would be by bypassing the CAPTCHA that gets displayed when you scrape in this scenario.

The ReactJS SPA is very simple, and unstyled. It allowes you to input your parameters and call the API via proxy.
This prevents the issues you would normally experience due to CORS security limitations.

# Commentary

Search Engine Optimization is not my speciality, but if I were to embark on this project I would do things a little differently.
I would create an Azure function or application service to perform the scraping operation daily and save the results to a database.
Then, I would create a PowerBI online workspace which the CEO has access to. Here he could view all of the data relating to SEO, not just the Google scrape. This would avoid the tedium of the CEO having to interact with this tool. It is also a good example of automation, a CI/CD principle. I have built many automated release pipelines which include automated smoke testing, as well as Katalon-based system test and unit tests. Fully-fledged TDD is another area where I have experience that could be relevant to InfoTrack; in our largest TDD project we actually began by building the unit tests themselves, rather than the code itself.

Google Analytics and even IIS logs may contain data that would help us to understand how InfoTrack is being interacted with by its users. With data like that one could ascertain which parts of the site users interact with and for how long. With additional custom tracking of successful actions one would have the beginnings of a closed feedback loop for improving one's site.
I have created mechanisms for doing this in my current position. This required code changes at the C# and SQL level which write to the database when actions take place. A Data Mart was used for proper ETL. The end result was a series of PowerBI workspaces with a direct, secure, and updatable connection to that Data Mart, with interactive data visualizations on HR KPIs and end-user engagement.

If the CEO wanted to improve the performance of InfoTrack with respect to it's Google results I would begin with a discussion of SEO first principles.

# On-Site SEO
There are specific programming patterns you can utilize that are detected by search engine robots. If implemented they will increase your rating in their algorithms. They can be very simple, for example using Alt="" on images in case they don't load, which helps visually impaired people running accessibility tools like ReciteMe. Many of the latest On-Site SEO patterns will also improve your accessibility and mobile responsiveness. I led all front-end redesign, accessibility and mobile-responsiveness projects in this area in my time at my current position.

The best way to evaluate your on-site SEO, accessibility and responsiveness, in the first instance, is to use Google Lighthouse. Here are the results for the InfoTrack home page:

Performance 81
Accessibility 89
Best Practices 67
SEO 100
PWA -

I am not surprised to see an SEO score of 100, I spotted many of the green flags there when I inspected your page source prior to our intial interview. You do not have a progressive web app option which is fine, there is no need for it in this context, but I have created them before. They are the latest development in SaaS delivery. The Lighthouse tool has an itemized list of remedial actions you could take which would directly improve your results in the Google scrape, but not necessarily instantly. With a proper PowerBI/SQL tracking system in place you could see what effect your code changes would have on your search ratings over time.

# Off-Site SEO
This is not my speciality, but I have been led to understand it is more important than on-site SEO, and much more difficult. Google significantly improves the rankings of websites if they are linked to by other sites with high rankings. Links from sites with poor rankings has a deleterious effect. Professional SEO consultants will use scrapers to obtain the email addresses of bloggers, hundreds or thousands of them, and contact them asking for their site to be discussed in one of their articles. Your Digital Conveyancing Summit is a superior method of improving your Off-Site SEO ratings, so you should be strong in that regard. Social media is another good option to pursue here. I see that Infotrack Australia has an Instagram account, but I can't see one for the UK. A social media manager with the proper tools for releasing optimized, sharable content on a schedule is the best approach to take in this regard. I hear there are newer and more fashionable social media platforms available now even than Instagram, but frankly, I have absolutely no idea what they are or how they work.

# robots.txt
It may seem obvious, but if the CEO were asking me for this tool I would quickly check to see what is written on our robots.txt, just to see if any rule written there could be blocking legitimate search engine robots. It is also possible for legitimate robots to fall foul of IP-blocking security provisions. This would undermine our ratings simply because it would prevent those robots from building a site map. You can upload your own sitemap to accelerate them.