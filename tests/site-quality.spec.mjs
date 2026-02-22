import { expect, test } from "@playwright/test";

test("SEO and document semantics are present", async ({ page }) => {
  await page.goto("/my-portfolio/");

  await expect(page).toHaveTitle(/Portfolio/i);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /portfolio/i);
  await expect(page.locator("link[rel='canonical']")).toHaveCount(1);
  await expect(page.locator("main#main-content")).toHaveCount(1);
  await expect(page.locator("main#main-content h1")).toHaveCount(1);
});

test("no broken requests and external links are safe", async ({ page }) => {
  const failedRequests = [];
  page.on("response", (response) => {
    if (response.status() >= 400) {
      failedRequests.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/my-portfolio/");
  await page.waitForLoadState("networkidle");

  expect(failedRequests, failedRequests.join("\n")).toEqual([]);

  const externalUnsafeLinks = await page.$$eval("main a[target='_blank']", (links) =>
    links
      .filter((link) => !(link.rel || "").includes("noopener"))
      .map((link) => link.getAttribute("href") || ""),
  );
  expect(externalUnsafeLinks).toEqual([]);
});

test("scroll effects respond and top button works", async ({ page }) => {
  await page.goto("/my-portfolio/");

  const topButton = page.locator("#scroll-top");
  await expect(topButton).toBeHidden();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(topButton).toBeVisible();

  await topButton.click();
  await expect
    .poll(async () => page.evaluate(() => Math.round(window.scrollY)))
    .toBeLessThanOrEqual(2);

  await expect(page.locator("[data-reveal].is-visible").first()).toBeVisible();
});
