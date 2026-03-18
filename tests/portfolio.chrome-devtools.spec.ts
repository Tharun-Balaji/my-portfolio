import { expect, test } from "@playwright/test";

test("validates key sections using Chrome DevTools protocol", async ({ context, page }) => {
  const appBasePath = process.env.E2E_BASE_PATH || "/my-portfolio/";
  const cdpSession = await context.newCDPSession(page);

  await cdpSession.send("Runtime.enable");
  await cdpSession.send("Performance.enable");

  await page.goto(appBasePath, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /engineer the interface/i })).toBeVisible();

  await page.getByRole("link", { name: /let's talk/i }).first().click();
  await expect(page.locator("#contact h2")).toContainText("Let's build something");

  const locationHash = await cdpSession.send("Runtime.evaluate", {
    expression: "window.location.hash",
    returnByValue: true,
  });
  expect(locationHash.result.value).toBe("#contact");

  const metrics = await cdpSession.send("Performance.getMetrics");
  const taskDuration = metrics.metrics.find((metric) => metric.name === "TaskDuration");
  expect(taskDuration).toBeDefined();
});
