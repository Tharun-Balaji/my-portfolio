import { expect, test } from "@playwright/test";

test("validates key sections using Chrome DevTools protocol", async ({ context, page }) => {
  const appBasePath = process.env.E2E_BASE_PATH || "/my-portfolio/";
  const cdpSession = await context.newCDPSession(page);

  await cdpSession.send("Runtime.enable");
  await cdpSession.send("Performance.enable");

  await page.goto(appBasePath, { waitUntil: "domcontentloaded" });
  await expect
    .poll(async () => page.locator("body").evaluate((body) => body.className), { timeout: 15000 })
    .not.toContain("is-loading");
  await expect(page.getByRole("heading", { name: /tharun.*balaji/i })).toBeVisible();

  await page.locator(".resume-button").evaluate((link) => {
    (link as HTMLAnchorElement).click();
  });
  await expect(page.locator("#contact h2")).toContainText("Contact");

  const locationHash = await cdpSession.send("Runtime.evaluate", {
    expression: "window.location.hash",
    returnByValue: true,
  });
  expect(locationHash.result.value).toBe("#contact");

  const metrics = await cdpSession.send("Performance.getMetrics");
  const taskDuration = metrics.metrics.find((metric) => metric.name === "TaskDuration");
  expect(taskDuration).toBeDefined();
});
