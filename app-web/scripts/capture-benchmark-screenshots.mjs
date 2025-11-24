/* eslint-disable */

import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const ROOT_DIR = process.cwd();
const DATA_PATH = path.join(
  ROOT_DIR,
  "src",
  "app",
  "pesquisa",
  "benchmarking",
  "Bench.json",
);
const OUTPUT_DIR = path.join(ROOT_DIR, "public", "benchmarking-screenshots");

const VIEWPORT_WIDTH = 1440;
const VIEWPORT_HEIGHT = 900;
const PAGE_LOAD_TIMEOUT_MS = 20000;
const SCROLL_SETTLE_DELAY_MS = 600;

const slugify = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();

const ensureDir = async (targetPath) => {
  await mkdir(targetPath, { recursive: true });
};

const loadEntries = async () => {
  const raw = await readFile(DATA_PATH, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("Bench.json deve ser um array de objetos");
  }

  return parsed
    .map((entry) => ({
      company: entry.company ?? "",
      landingPage: entry.landingPage ?? null,
    }))
    .filter((entry) => entry.company && entry.landingPage);
};

const buildDriver = () => {
  const options = new chrome.Options()
    .addArguments(`--window-size=${VIEWPORT_WIDTH},${VIEWPORT_HEIGHT}`)
    .addArguments("--disable-gpu")
    .addArguments("--no-sandbox")
    .addArguments("--disable-dev-shm-usage")
    .addArguments("--headless=new");

  return new Builder().forBrowser("chrome").setChromeOptions(options).build();
};

const captureFrames = async (driver, entry) => {
  const slug = slugify(entry.company);
  const entryDir = path.join(OUTPUT_DIR, slug);
  await ensureDir(entryDir);

  await driver.get(entry.landingPage);
  await driver.wait(until.elementLocated(By.css("body")), PAGE_LOAD_TIMEOUT_MS);
  await driver.sleep(SCROLL_SETTLE_DELAY_MS);

  const totalHeight = await driver.executeScript(
    "return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);",
  );
  const viewportHeight = await driver.executeScript("return window.innerHeight;");

  let offset = 0;
  let frameIndex = 1;

  while (offset < totalHeight) {
    await driver.executeScript("window.scrollTo(0, arguments[0]);", offset);
    await driver.sleep(SCROLL_SETTLE_DELAY_MS);

    const screenshot = await driver.takeScreenshot();
    const filename = `${slug}-frame-${String(frameIndex).padStart(2, "0")}.png`;
    await writeFile(path.join(entryDir, filename), screenshot, "base64");

    frameIndex += 1;
    offset += viewportHeight;
  }

  return { slug, frames: frameIndex - 1 };
};

const main = async () => {
  const entries = await loadEntries();

  if (entries.length === 0) {
    console.info("Nenhuma landing page válida encontrada em Bench.json");
    return;
  }

  await ensureDir(OUTPUT_DIR);

  const driver = await buildDriver();

  try {
    for (const entry of entries) {
      console.info(`Capturando ${entry.company} (${entry.landingPage})`);
      try {
        const result = await captureFrames(driver, entry);
        console.info(`  -> ${result.frames} frames salvos em ${result.slug}/`);
      } catch (error) {
        console.error(`  ! Falha ao capturar ${entry.company}:`, error.message);
      }
    }
  } finally {
    await driver.quit();
  }
};

main().catch((error) => {
  console.error("Erro ao executar captura:", error);
  process.exitCode = 1;
});
