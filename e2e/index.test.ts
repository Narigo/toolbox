import { expect, test } from "@playwright/test";

test.describe("Toolbox Homepage", () => {
	test("has expected h1", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("h1")).toContainText("toolbox", {
			ignoreCase: true,
		});
	});

	test("has a link to narigo.dev", async ({ page }) => {
		const re = /^https?:\/\/(?:www\.)?narigo\.dev($|\/)/;

		await page.goto("/");
		await expect.poll(async () => {
			const hrefs = await page.getByRole("link").evaluateAll(
				(elements) => {
					return elements.map((element) =>
						element.getAttribute("href")
					);
				},
			);
			return hrefs.filter((href) => href && re.test(href)).length;
		}).toBeGreaterThan(0);
	});
});
