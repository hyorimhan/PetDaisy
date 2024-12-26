import { expect, test as setup } from "@playwright/test";

const authFile = "tests/auth.json";

setup("authenticate", async ({ page }) => {
  try {
    // 로그인 페이지로 이동
    await page.goto("/login");
    console.log("Navigated to login page");

    // 로그인 폼 채우기
    await page.locator('input[type="email"]').fill("test@test.com");
    await page.locator('input[type="password"]').fill("123123123");

    // 로그인 버튼 클릭
    await page.locator('button[type="submit"]').click();
    console.log("Login button clicked");

    // 모달 대기 및 버튼 처리
    const modal = page.locator(".z-50.fixed.bg-black\\/50"); // 모달 컨테이너
    await expect(modal).toBeVisible({ timeout: 10000 }); // 모달 표시 대기

    // "확인" 버튼 찾기
    const confirmButton = modal.locator('button:has-text("확인")'); // 텍스트로 버튼 특정
    await expect(confirmButton).toBeVisible({ timeout: 5000 }); // 버튼 표시 대기
    await confirmButton.click(); // 버튼 클릭
    console.log("Modal confirm button clicked");

    // 대시보드로 이동했는지 확인
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    console.log("Successfully logged in");

    // 인증 상태 저장
    await page.context().storageState({ path: authFile });
    console.log("Auth state saved");
  } catch (error) {
    console.error("Auth setup failed:", error);
    await page.screenshot({ path: "auth-error.png" }); // 에러 발생 시 스크린샷 저장
    throw error;
  }
});
