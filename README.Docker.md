### Neon setup

Copy `docker.env.example` to `.env` and fill in the Neon connection strings and Auth.js credentials before starting Compose. Use a Neon development branch: the `migrate` service runs `prisma migrate deploy` against `DIRECT_URL` (or falls back to `DATABASE_URL`). Do not point this local workflow at your production Neon branch.

Set `DEMO_LOGIN_ENABLED="true"` only for an isolated demo environment. Each demo login creates a separate user that expires after 30 days. Schedule `npm run demo:cleanup` daily to remove expired demo users and their related data. Demo checkout creates orders but does not decrement product stock.

### Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Your application will be available at http://localhost:3000.

### Deploying your application to the cloud

First, build your image, e.g.: `docker build -t myapp .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`docker build --platform=linux/amd64 -t myapp .`.

Then, push it to your registry, e.g. `docker push myregistry.com/myapp`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

### References
* [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)