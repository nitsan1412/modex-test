Start with building a Docker for assignment-2 and running it:
open the terminal and run the folowing commands:

"cd assignment-2/user-api"

"docker build -t user-api ."

Then run assignment-2 with Docker on port 3000 (localy):
"docker run -p 3000:3000 user-api"

After that you need to run assignment-3 in a different terminal with the command:
"cd assignment-3/my-app"

"npm start"