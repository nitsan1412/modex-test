Start with building a Docker for assignment-2:
open the terminal and run the folowing commands:

"cd assignment-2"
"cd user-api"

"docker build -t user-api ."

Then run assignment-2 with Docker:
"docker run -p 3000:3000 user-api"

After that you can run assignment-3 in a different terminal with the command:
"npm start"