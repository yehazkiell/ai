const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Start dev server in background
    console.log("Starting dev server...");
    const { spawn } = require('child_process');
    const server = spawn('npm', ['run', 'dev'], { stdio: 'ignore' });

    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 5000));

    await page.goto('http://localhost:3000');
    await page.screenshot({ path: 'screenshot.png' });
    console.log("Screenshot saved to screenshot.png");

    const title = await page.title();
    console.log("Page title:", title);

    server.kill();
  } catch (err) {
    console.error("Verification failed:", err);
  } finally {
    await browser.close();
  }
})();
