# SauceDemo E2E Automation Framework

End-to-end test automation for [saucedemo.com](https://www.saucedemo.com/), built with [Playwright](https://playwright.dev/) and TypeScript, using the Page Object Model pattern. Includes a full CI/CD setup with GitHub Actions, Docker, and Jenkins.

## Tech Stack

- **Playwright** + **TypeScript** — test framework
- **Page Object Model** — one class per page (`tests/pages/`)
- **Custom fixtures** — inject page objects into tests (`fixtures/testFixtures.ts`)
- **Storage state** — login once, reuse the session across tests
- **dotenv** — environment-based credentials

## Project Structure

```
├── fixtures/
│   └── testFixtures.ts        # Custom Playwright fixtures (page objects)
├── tests/
│   ├── auth/
│   │   └── auth-setup.ts      # Logs in once, saves storage state
│   ├── pages/                 # Page Object classes
│   │   ├── BasePage.ts
│   │   ├── loginPage.ts
│   │   ├── InventoryPage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── PaymentOverviewPage.ts
│   │   └── OrderconfirmationPage.ts
│   ├── login.spec.ts
│   └── addToProduct.spec.ts
├── test-data/
│   └── appTestData.ts         # Static test data (checkout info, expected messages)
├── playwright.config.ts
├── Dockerfile                 # Builds an image to run tests in a container
├── Dockerfile.jenkins         # Jenkins image with Docker CLI baked in
├── Jenkinsfile                # Jenkins pipeline definition
└── .github/workflows/tests.yml # GitHub Actions pipeline
```

## Running Tests Locally

**1. Install dependencies**
```bash
npm ci
```

**2. Create a `.env` file** in the project root:
```
USER_NAME=standard_user
USER_PASSWORD=secret_sauce
```

**3. Run the tests**
```bash
npx playwright test
```

**4. View the HTML report**
```bash
npx playwright show-report
```

## Running Tests in Docker

Build the image (bundles Node, Playwright browsers, and this project together):
```bash
docker build -t my-playwright-tests .
```

Run the tests inside a container:
```bash
docker run --rm my-playwright-tests
```

> Note: the `.env` file is not copied into the image (it's git-ignored). To run with credentials in Docker, pass them as environment variables at run time, e.g. `docker run --rm -e USER_NAME=standard_user -e USER_PASSWORD=secret_sauce my-playwright-tests`.

## CI/CD

### GitHub Actions (`.github/workflows/tests.yml`)

Runs on every push and pull request to `master`, and can also be triggered manually.

- Caches npm dependencies between runs
- Installs Playwright browsers
- Runs tests in parallel using **sharding** (matrix strategy)
- Injects credentials via **GitHub Secrets** (`USER_NAME`, `USER_PASSWORD`)
- Uploads the HTML report as a downloadable artifact
- Publishes a JUnit test summary directly on the run
- Retries failing tests twice on CI (`retries` in `playwright.config.ts`)

**Branch protection on `master`:** direct pushes are blocked. Every change goes through a pull request, must pass the `test` status check, and must be up to date with `master` before merging.

**Required GitHub Secrets** (Settings → Secrets and variables → Actions):
| Name | Value |
|---|---|
| `USER_NAME` | `standard_user` |
| `USER_PASSWORD` | `secret_sauce` |

### Jenkins (`Jenkinsfile`)

An alternative pipeline that runs the same tests inside a Docker container, orchestrated by Jenkins:

- Builds `Dockerfile` fresh on each run (layer caching skips `npm ci` when dependencies haven't changed)
- Runs tests inside the resulting image
- Copies the HTML report out before the container is destroyed, and archives it as a Jenkins build artifact
- Pulls credentials from **Jenkins Credentials** (`USER_NAME_PASSWORD`, a username+password pair)

To run this locally: point a Jenkins instance (with Docker socket access and the Docker CLI available — see `Dockerfile.jenkins`) at this repo, using "Pipeline script from SCM."

## Notes

- `workers` is set to `1` on CI (`process.env.CI`) for stability on shared runners; unset locally, where Playwright picks a sensible default based on available CPU cores.
- `fullyParallel: false` — tests within a single spec file run sequentially; parallelism happens across files/shards, not within one file.
- Reporters configured: `html`, `list`, and `junit` (output to `test-results/results.xml`).
