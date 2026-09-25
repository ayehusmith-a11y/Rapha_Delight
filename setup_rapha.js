#!/usr/bin/env node
"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.join(__dirname, "public");
const SITE_FILE = "index.html";
const DEFAULT_PORT = 4173;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".mp4": "video/mp4",
  ".ico": "image/x-icon",
};

function printHelp() {
  console.log(`
Rapha Delight local setup

Usage:
  node setup_rapha.js              Check the site and required local assets
  node setup_rapha.js --open       Check the site, start a local server, and open it
  node setup_rapha.js --serve      Check the site and start a local server
  node setup_rapha.js --port 3000  Use a custom server port
  node setup_rapha.js --help       Show this help
`);
}

function parseArgs(argv) {
  const options = {
    help: false,
    open: false,
    serve: false,
    port: DEFAULT_PORT,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--open") {
      options.open = true;
      options.serve = true;
    } else if (arg === "--serve") {
      options.serve = true;
    } else if (arg === "--port" || arg === "-p") {
      const value = Number(argv[i + 1]);
      if (!Number.isInteger(value) || value < 1 || value > 65535) {
        throw new Error("Port must be a number between 1 and 65535.");
      }
      options.port = value;
      i += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

function isRemoteUrl(value) {
  return /^(?:https?:)?\/\//i.test(value) || /^(?:mailto|tel|sms):/i.test(value);
}

function isPageAnchor(value) {
  return value.startsWith("#");
}

function extractLocalReferences(html) {
  const references = new Set([SITE_FILE]);
  const attributePattern = /\b(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  let match;

  while ((match = attributePattern.exec(html)) !== null) {
    const rawValue = match[1].trim();
    const value = rawValue.split("#")[0].split("?")[0];

    if (!value || isRemoteUrl(value) || isPageAnchor(value)) {
      continue;
    }

    references.add(decodeURIComponent(value));
  }

  return [...references].sort((a, b) => a.localeCompare(b));
}

function checkSite() {
  const sitePath = path.join(ROOT, SITE_FILE);

  if (!fs.existsSync(sitePath)) {
    throw new Error(`Cannot find ${SITE_FILE} in ${ROOT}`);
  }

  const html = fs.readFileSync(sitePath, "utf8");
  const references = extractLocalReferences(html);
  const missing = [];

  for (const reference of references) {
    const fullPath = path.resolve(ROOT, reference);

    if (!fullPath.startsWith(path.resolve(ROOT))) {
      missing.push(`${reference} (outside project folder)`);
      continue;
    }

    if (!fs.existsSync(fullPath)) {
      missing.push(reference);
    }
  }

  console.log("Rapha Delight setup check");
  console.log(`Project: ${ROOT}`);
  console.log(`Main file: ${SITE_FILE}`);
  console.log(`Local references checked: ${references.length}`);

  if (missing.length > 0) {
    console.error("\nMissing required files:");
    for (const file of missing) {
      console.error(`  - ${file}`);
    }
    process.exitCode = 1;
    return false;
  }

  console.log("Status: all required local files are present.");
  return true;
}

function safeResolveUrlPath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  const requested = cleanPath === "" ? SITE_FILE : cleanPath;
  const fullPath = path.resolve(ROOT, requested);

  if (!fullPath.startsWith(path.resolve(ROOT))) {
    return null;
  }

  return fullPath;
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      res.end(error.code === "ENOENT" ? "404 Not Found" : "500 Server Error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

function openBrowser(url) {
  const command =
    process.platform === "win32"
      ? "cmd"
      : process.platform === "darwin"
        ? "open"
        : "xdg-open";

  const args =
    process.platform === "win32"
      ? ["/c", "start", "", url]
      : [url];

  const child = spawn(command, args, {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  });
  child.unref();
}

function startServer(port, shouldOpen) {
  const server = http.createServer((req, res) => {
    if (!req.url || req.method !== "GET") {
      res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Method Not Allowed");
      return;
    }

    const filePath = safeResolveUrlPath(req.url);
    if (!filePath) {
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Forbidden");
      return;
    }

    sendFile(res, filePath);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use. Try --port ${port + 1}.`);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  });

  server.listen(port, "127.0.0.1", () => {
    const url = `http://127.0.0.1:${port}/`;
    console.log(`Local server: ${url}`);
    console.log("Press Ctrl+C to stop.");

    if (shouldOpen) {
      openBrowser(url);
    }
  });
}

function main() {
  let options;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    printHelp();
    process.exit(1);
  }

  if (options.help) {
    printHelp();
    return;
  }

  const ok = checkSite();

  if (!ok || !options.serve) {
    return;
  }

  startServer(options.port, options.open);
}

main();
