## Install

```bash
yarn 
```

## Start

### Case: Using remote browser rendering API

```bash
# DO NOT forget --remote option
yarn dev --remote
```

### Case: Launch local puppeteer instance and connect it

Launch puppeteer instance.
```bash
docker run --rm -p 3000:3000 browserless/chrome
```

Update `.dev.vars` (Uncomment out `BROWSERLESS`).
```
BROWSERLESS=ws://localhost:3000
```

Start worker.
```bash
yarn dev
```