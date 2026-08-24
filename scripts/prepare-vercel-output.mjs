import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, ".vercel/output");
const functionDir = resolve(output, "functions/__server.func");

await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, "static"), { recursive: true });
await mkdir(functionDir, { recursive: true });

await cp(resolve(root, "dist/client"), resolve(output, "static"), {
  recursive: true,
});
await cp(resolve(root, "dist/server"), resolve(functionDir, "server"), {
  recursive: true,
});

await writeFile(
  resolve(functionDir, "package.json"),
  JSON.stringify({ type: "module" }, null, 2) + "\n",
);

await writeFile(
  resolve(functionDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "adapter.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: true,
    },
    null,
    2,
  ) + "\n",
);

await writeFile(
  resolve(functionDir, "adapter.mjs"),
  `import { Readable } from "node:stream";

// Node's Fetch implementation rejects Unicode response-header values. Vinext
// can propagate a route label or deployment path into an internal header, so
// encode only the non-Latin header values before the app runtime is imported.
const nativeHeaderSet = Headers.prototype.set;
Headers.prototype.set = function setAsciiHeader(name, value) {
  const text = String(value);
  return nativeHeaderSet.call(this, name, /[^\\u0000-\\u00ff]/.test(text) ? encodeURI(text) : text);
};

const { default: worker } = await import("./server/index.js");

function requestUrl(req) {
  const proto = String(req.headers["x-forwarded-proto"] || "https").split(",")[0];
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  return new URL(req.url || "/", proto + "://" + host);
}

function assetFetcher(origin) {
  return {
    fetch(input) {
      const url = new URL(input instanceof Request ? input.url : String(input), origin);
      return fetch(url, { headers: { "x-vinext-asset-fetch": "1" } });
    },
  };
}

export default async function handler(req, res) {
  try {
    const url = requestUrl(req);
    const init = { method: req.method, headers: req.headers };
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = Readable.toWeb(req);
      init.duplex = "half";
    }

    const pending = [];
    const response = await worker.fetch(
      new Request(url, init),
      { ASSETS: assetFetcher(url.origin) },
      { waitUntil(promise) { pending.push(Promise.resolve(promise)); }, passThroughOnException() {} },
    );

    res.statusCode = response.status;
    res.statusMessage = response.statusText;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    const cookies = response.headers.getSetCookie?.();
    if (cookies?.length) res.setHeader("set-cookie", cookies);

    if (!response.body || req.method === "HEAD") {
      res.end();
    } else {
      Readable.fromWeb(response.body).pipe(res);
    }
    Promise.allSettled(pending).catch(() => {});
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
`,
);

await writeFile(
  resolve(output, "config.json"),
  JSON.stringify(
    {
      version: 3,
      framework: { slug: "vinext", version: "1.0.0-beta.2" },
      routes: [
        { handle: "filesystem" },
        { src: "/.*", dest: "/__server" },
      ],
    },
    null,
    2,
  ) + "\n",
);

console.log("Prepared Vercel Build Output API bundle.");
