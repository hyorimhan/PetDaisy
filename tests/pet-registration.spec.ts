import { expect, test } from "@playwright/test";

test.describe("Pet Registration Form", () => {
  test("Basic information input and validation", async ({ page }) => {
    // Navigate to pet registration page
    await page.goto("/dashboard/pet-registration");

    // Fill in the form fields
    await page.locator("input[name='name']").fill("Fluffy");
    await page.locator("select[name='gender']").selectOption("male");
    await page.locator("input[name='birth']").fill("2022-01-01");
    await page.locator("input[name='weight']").fill("4.5");
    await page.locator("select[name='neutered']").selectOption("yes");

    // Validate fields are filled correctly
    await expect(page.locator("input[name='name']")).toHaveValue("Fluffy");
    await expect(page.locator("select[name='gender']")).toHaveValue("male");
    await expect(page.locator("input[name='birth']")).toHaveValue("2022-01-01");
    await expect(page.locator("input[name='weight']")).toHaveValue("4.5");
    await expect(page.locator("select[name='neutered']")).toHaveValue("yes");
  });

  test("Image upload", async ({ page }) => {
    // Navigate to pet registration page
    await page.goto("/pet-registration");

    // Upload an image
    const filePath = "./tests/assets/sample-pet-image.jpg";
    await page.setInputFiles("input[type='file']", filePath);

    // Validate image is uploaded and displayed
    const uploadedImage = page.locator("img");
    await expect(uploadedImage).toBeVisible();
  });

  test("Form submission and redirection", async ({ page }) => {
    // Navigate to pet registration page
    await page.goto("/dashboard/pet-registration");

    // Fill in the form fields
    await page.locator("input[name='name']").fill("Fluffy");
    await page.locator("select[name='gender']").selectOption("male");
    await page.locator("input[name='birth']").fill("2022-01-01");
    await page.locator("input[name='weight']").fill("4.5");
    await page.locator("select[name='neutered']").selectOption("yes");

    // Upload an image
    const filePath = "./tests/assets/sample-pet-image.jpg";
    await page.setInputFiles("input[type='file']", filePath);

    // Submit the form
    await page.locator("button[type='submit']").click();

    // Wait for redirection to dashboard
    await expect(page).toHaveURL("/dashboard");
  });

  test("Validation errors display correctly", async ({ page }) => {
    // Navigate to pet registration page
    await page.goto("/dashboard/pet-registration");

    // Attempt to submit without filling in required fields
    await page.locator("button[type='submit']").click();

    // Validate error messages
    await expect(page.locator("text=이름은 필수 항목입니다.")).toBeVisible();
    await expect(page.locator("text=성별을 선택해주세요.")).toBeVisible();
    await expect(page.locator("text=생일을 입력해주세요.")).toBeVisible();
    await expect(page.locator("text=몸무게를 입력해주세요.")).toBeVisible();
    await expect(
      page.locator("text=중성화 여부를 선택해주세요.")
    ).toBeVisible();
  });
});
