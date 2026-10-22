# Express app

## Run locally

From the repository root:

```powershell
cd myapp
npm ci
# Only if credentials.env does not already exist:
Copy-Item credentials.env.example credentials.env
```

Fill in your database settings in `myapp/credentials.env`, then run `npm start`
from `myapp`. Existing environment variables take precedence over the local file.
Never commit the credentials file.

Open http://localhost:3000/ for Mario's homepage or
http://localhost:3000/user for the database view. The database view currently
queries the `employees` table. You can override the HTTP port with `PORT`.

## Deploy to Render

Commit and push the application changes to the connected repository's `main`
branch before deploying. This repository includes `render.yaml` for an optional
Render Blueprint, which configures a free Node web service in Virginia and prompts
for the five database environment variables.

If using the Web Service form instead, enter:

| Setting | Value |
| --- | --- |
| Language | Node |
| Branch | main |
| Region | Virginia (US East) |
| Root Directory | myapp |
| Build Command | npm ci |
| Start Command | npm start |
| Health Check Path | / |

In the service's Environment settings, set `PSQL_HOST`, `PSQL_USER`,
`PSQL_DATABASE`, `PSQL_PASSWORD`, and `PSQL_PORT` to your correct database values.
Render provides the HTTP `PORT`; it is separate from the database's `PSQL_PORT`.
The local `credentials.env` file is optional on Render.

After deployment, open `/user` on your service's public URL for the database view.
The `/` route remains Mario's homepage and serves as the HTTP health check.

If `/user` fails, check the Render logs. A password authentication error requires
correcting the database credentials. The database must also accept connections
from Render; a database that requires a campus network or VPN needs an approved
external connection method.

The credentials file was previously tracked by Git. Removing it from tracking
does not erase past commits. If the password was exposed, rotate it with your
database administrator and update the local and Render settings.

Render references: [Node/Express deployment](https://render.com/docs/deploy-node-express-app),
[Blueprint fields](https://render.com/docs/blueprint-spec), and
[environment variables](https://render.com/docs/configure-environment-variables).
