# Demo for a job offer (NextJS/Spring Boot/Azure SQL Database | over Azure)
What's this development about? A job offer asked for me to develop a fullstack project consisting on a note taking app. I forked the project in order to own it, and be able to deploy it on Vercel (need to grant permissions). I deployed the backend on Azure App Service by using Azure CLI. Now the demo is fully functional! The URL is https://salomon-c9920c-gpte.vercel.app/.

I did want to apply my cloud knowledge and patience when using Azure. Many people complain about its many steps to do something really simple... but it leaves no chance to make a mistake!
## NOTE The deployment has been taken down after the job offer didn't go on, could redeploy whenever needed. Since it's no longer online, most of the functionality won't work. You can still see the code, though.

# 0 IMPORTANT
I went a step forward and decided to fully deploy the demo. I'm comfortable with it.
# 1 Frontend
Decided to work on frontend with NextJS (15.1.5, React 19.0.0), but only developing a SPA. I know NextJS does something with SSG but decided to stay out of it, and use it purely as a React container that later connects to an API. The CSS is wrapped around with TailwindCSS (3.4.1)
# 2 Backend
I had never used Spring Boot before, but I did decide to start an API on it. What could go wrong, right? I know developing on unknown tools is like running on unstable ground, but I did want to learn something new.
# 3 Database choice
After a quick 'PostgreSQL free database' search, Supabase came up. As does NextJS, it keeps hold of tools against what the requirements asked: it has an API that can be called from NextJS (which I had used in other projects), but it also has a URL which you can hit to reach its PostgreSQL database.

23-01
And after turning down the Supabase, I did remember Azure offered a SQL database. And after applying for student discount (I have 6-7 courses pending on college to get my degree; but I'm unable to make a living and dedicate fully to studying at the same time), I did get the database to work. Then connected it to the backend, and after tweaking a lot of small details, got it all to function properly! 
# 4 Day to day development journey
Day 1 (20-01) was making a sketch of how the page would look like. Did forget to include the archive functionality :$

Day 2 (21-01) was spent half on assembling a Spring Boot backend, half spent on connecting it to a true database (instead of the virtual one) and deploying the Spring Boot solution somewhere (read Render can do the job). I'll deploy the frontend on Vercel tomorrow and connect it to the deployed backend.

Day 3 (22-01) was when I changed my mind on Supabase. Why not go fully fledged, I asked myself. So that's when I activated my GCP trial, which is free $300 credit on cloud services. That's ideal for a Cloud SQL instance which I'll be able to connect to from wherever I want to, provided I got the right connection string. The deployment path should be database>backend connection>backend>frontend connection>frontend. Let's try to make something fully functional!

Still on day 3, I need to check if Azure will provide me with a database that's easier to connect with, or if I can deploy my Spring Boot backend in there. That, if it allows me for student credit only...

Day 4. Finally! Azure works (its free access didn't take too long to manage), its database works too... after deploying my frontend to Vercel, I will go on with deploying Spring Boot on Azure App Service. Smooth like it's butter! Will stick in the URL later!
