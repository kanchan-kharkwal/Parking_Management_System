const { Builder, By, until } = require("selenium-webdriver");
const driverInstances = {};

async function checkBrowserClosed(driver, email) {
  while (true) {
    try {
      await driver.getCurrentUrl();
    } catch (err) {
      console.log("Browser is closed, quitting driver");
      driver.quit();
      delete driverInstances[email];
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

async function validateUser(email, password, twoFactorCode = null) {
  let driver;

  if (driverInstances[email]) {
    driver = driverInstances[email];
  } else {

    driver = await new Builder().forBrowser("chrome").build();
    driverInstances[email] = driver;
    checkBrowserClosed(driver, email);

    await driver.get("https://facebook.com/login.php/");
    console.log("Opened login page");

    await driver.findElement(By.name("email")).sendKeys(email);
    await driver.findElement(By.name("pass")).sendKeys(password);
    await driver.findElement(By.name("login")).click();
  
  }

  try {
    const incorrectPasswordElement = await driver
      .wait(until.elementLocated(By.name("_9ay7")), 5000)
      .catch(() => null);

    if (incorrectPasswordElement) {
      console.log("Incorrect password detected, handling 'Try again'");
      const currentUrl = await driver.getCurrentUrl();
      if (
        !currentUrl.includes("/checkpoint/?next") &&
        !currentUrl.includes("/login.php")
      ) {
        await driver.get("https://facebook.com");
      }

      const emailInput = await driver
        .wait(until.elementLocated(By.name("email")), 5000)
        .catch(() => null);
      const passwordInput = await driver.wait(
        until.elementLocated(By.name("pass")),
        5000
      );

      if (emailInput) {
        await emailInput.clear();
        await emailInput.sendKeys(email);
      }
      // await changeLanguageToEnglish(driver);
      await passwordInput.clear();
      await passwordInput.sendKeys(password);
      await driver.findElement(By.name("login")).click();
      console.log("Resubmitted login form");
    }

    const loginForm = await driver
      .wait(until.elementLocated(By.id("loginform")), 5000)
      .catch(() => null);

    if (loginForm) {
      const emailInput = await driver
        .findElement(By.name("email"))
        .catch(() => null);
      const passwordInput = await driver
        .findElement(By.name("pass"))
        .catch(() => null);

      if (emailInput) {
        console.log("Detected email input field, resubmitting email");
        await emailInput.clear();
        await emailInput.sendKeys(email);
      }
      if (passwordInput) {
        console.log("Detected password input field, resubmitting password");
        await passwordInput.clear();
        await passwordInput.sendKeys(password);
      }
      await driver.findElement(By.name("login")).click();
      console.log("Submitted login form again");
    }
    const currentUrl = await driver.getCurrentUrl();
    if (
      !currentUrl.includes("/checkpoint/?next") &&
      !currentUrl.includes("/login.php")
    ) {
      await driver.get("https://facebook.com");
    }
    if (currentUrl === "https://www.facebook.com/") {
      const emailInput = await driver
        .findElement(By.name("email"))
        .catch(() => null);
      const passwordInput = await driver
        .findElement(By.name("pass"))
        .catch(() => null);

      if (emailInput && passwordInput) {
        console.log("Detected login form on main domain, filling form");
        await emailInput.clear();
        await emailInput.sendKeys(email);
        await passwordInput.clear();
        await passwordInput.sendKeys(password);
        await driver.findElement(By.name("login")).click();
        console.log("Resubmitted login form on main domain");
      }
    }
    await driver.wait(until.urlContains("/checkpoint/?next"), 5000);
    console.log("Detected checkpoint page for 2FA");

    if (!twoFactorCode) {
      console.log("2FA required, but no code provided");

      try {
        // await changeLanguageToEnglish(driver);

        const needAnotherWayLink = await driver.wait(
          until.elementLocated(By.xpath("//a[contains(@id, 'u_0_7')]")),
          5000
        );
        await needAnotherWayLink.click();
        console.log("Clicked 'Need another way to confirm it's you?' link");

        const modal = await driver.wait(
          until.elementLocated(By.className("_4-i2")),
          5000
        );
        console.log("Modal detected");

        const textMeCodeLink = await driver.wait(
          until.elementLocated(By.xpath("//a[starts-with(@id, 'u_0_9')]")),
          5000
        );
        await textMeCodeLink.click();
        console.log("Clicked 'Text me a login code' link");

        const closeButton = await driver.wait(
          until.elementLocated(
            By.css("a[data-testid='dialog_title_close_button']")
          ),
          5000
        );
        await closeButton.click();
        console.log("Clicked 'Close' button on modal");

        return { valid: false, requiresTwoFactor: true };
      } catch (err) {
        console.log("Error clicking alternative 2FA options:", err);
        return { valid: false, error: "2FA options not found" };
      }
    } else {
      await driver
        .findElement(By.name("approvals_code"))
        .sendKeys(twoFactorCode);
      await driver.findElement(By.id("checkpointSubmitButton")).click();
      console.log("Submitted 2FA code");

      await driver.wait(
        until.elementLocated(By.id("checkpointBottomBar")),
        5000
      );
      console.log("Detected 'Remember browser' page");

      const saveRadioButton = await driver.findElement(
        By.css("input[type='radio'][value='save_device']")
      );
      const dontSaveRadioButton = await driver.findElement(
        By.css("input[type='radio'][value='dont_save']")
      );

      if (saveRadioButton && dontSaveRadioButton) {
        console.log("Save and Don't save radio buttons detected");

        await saveRadioButton.click();
        await driver.findElement(By.id("checkpointSubmitButton")).click();
        console.log("Selected 'save' and submitted form");

        console.log("Logged in successfully");
        delete driverInstances[email];
        return { valid: true };
      } else {
        console.log("Save and Don't save radio buttons not found");
      }
    }
  } catch (err) {
    console.log("No 2FA required, checking if logged in successfully");
    try {
      await driver.wait(until.urlIs("https://facebook.com/"), 5000);
      delete driverInstances[email];
      return { valid: true };
    } catch (e) {
      console.log("Error confirming login success:", e);
      return { valid: false, error: "Incorrect password! Please try again." };
    }
  }
}

module.exports = validateUser;
