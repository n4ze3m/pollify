// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[id].tsx";
import * as $1 from "./routes/index.tsx";
import * as $$0 from "./islands/PollBody.tsx";
import * as $$1 from "./islands/PollCreator.tsx";

const manifest = {
  routes: {
    "./routes/[id].tsx": $0,
    "./routes/index.tsx": $1,
  },
  islands: {
    "./islands/PollBody.tsx": $$0,
    "./islands/PollCreator.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
