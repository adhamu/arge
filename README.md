# Arge

A tiny package to parse CLI flags and arguments into an object.

## Requirements

- Node 16+

## Installation

```shell
yarn add arge
```

## Usage

```typescript
import { arge } from 'arge'

const args = arge(process.argv)
```

This will return arguments parsed from `process.argv` like this:

```shell
node app.js --dry-run --mode=development --test=false --retries=100
```

...into an object similar to below:

```json
{
  "dry-run": true,
  "mode": "development",
  "test": false,
  "retries": 100
}
```

By default, the `arge` function assumes that you have passed `process.argv`. It does this because:

> The first element will be process.execPath.

> The second element will be the path to the JavaScript file being executed

https://nodejs.org/docs/latest/api/process.html#processargv

This package will omit those two items from the output.

If you wanted to pass an arbitrary array of flags that don't come from `process.argv`, you can set the second argument of `arge` to `false`.

For example

```typescript
import { arge } from 'arge'

const flags = [
  '--dry-run',
  '--mode=development',
  '--test=false',
  '--retries=100',
]

const args = arge(flags, false)
```

This would then output:

```json
{
  "dry-run": true,
  "mode": "development",
  "test": false,
  "retries": 100
}
```
