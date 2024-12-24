import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    // baseURL 설정 필요
    baseURL: "http://localhost:3000",

    // 브라우저 상태 유지 (로그인 등)
    storageState: "./tests/auth.json",

    // 테스트 실행시 브라우저 보이게 설정 (개발 중에 유용)
    headless: false,

    // 타임아웃 설정
    actionTimeout: 10000,

    // 스크린샷 설정
    screenshot: "only-on-failure",

    trace: "on-first-retry",
  },

  // 우선은 Chrome만 테스트
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // 테스트 전에 개발 서버 실행
  webServer: {
    command: "yarn dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
