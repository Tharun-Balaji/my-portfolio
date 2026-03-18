import { expect, test } from "@playwright/test";

test("SEO and document semantics are present", async ({ page }) => {
  const appBasePath = process.env.E2E_BASE_PATH || "/my-portfolio/";
  await page.goto(appBasePath);

  await expect(page).toHaveTitle(/Tharun Balaji/i);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("meta[name='description']")).toHaveAttribute(
    "content",
    /frontend engineer/i,
  );
  await expect(page.locator("link[rel='canonical']")).toHaveCount(1);
  await expect(page.locator("main#main-content")).toHaveCount(1);
  await expect(page.locator("main#main-content h1")).toHaveCount(1);
});

test("no broken requests and external links are safe", async ({ page }) => {
  const appBasePath = process.env.E2E_BASE_PATH || "/my-portfolio/";
  const failedRequests = [];
  page.on("response", (response) => {
    const responseUrl = new URL(response.url());
    const pageUrl = new URL(page.url() || "http://localhost");
    const isSameOrigin = responseUrl.origin === pageUrl.origin;

    if (response.status() >= 400 && isSameOrigin) {
      failedRequests.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto(appBasePath);
  await page.waitForLoadState("networkidle");

  expect(failedRequests, failedRequests.join("\n")).toEqual([]);

  const externalUnsafeLinks = await page.$$eval("main a[target='_blank']", (links) =>
    links
      .filter((link) => !(link.rel || "").includes("noopener"))
      .map((link) => link.getAttribute("href") || ""),
  );
  expect(externalUnsafeLinks).toEqual([]);
});

test("scroll effects respond and reveal content", async ({ page }) => {
  const appBasePath = process.env.E2E_BASE_PATH || "/my-portfolio/";
  await page.goto(appBasePath);

  const progress = page.locator("#scroll-progress");
  await expect(progress).toHaveCount(1);

  const initialWidth = await progress.evaluate((element) => parseFloat(element.style.width || "0"));

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await expect
    .poll(async () =>
      progress.evaluate((element) => parseFloat(element.style.width || "0")),
    )
    .toBeGreaterThan(initialWidth);

  await expect(page.locator("[data-reveal].is-visible").first()).toBeVisible();
  await expect
    .poll(async () => page.locator("[data-reveal].is-visible").count())
    .toBeGreaterThan(1);
});
