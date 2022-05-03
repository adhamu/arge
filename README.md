# Arge

A tiny package to parse CLI flags and arguments into an object.

## Installation

```shell
yarn add arge

# or
npm i arge
```

## Usage

```javascript
const { arge } = require('arge')

// or
import { arge } from 'arge'
```

Then:

```typescript
const args = arge(process.argv)
```

This will return arguments parsed from `process.argv` like this:

```shell
node app.js --dry-run --mode=development --test=false --retries=100
```

...into an object similar to below:

```json
{
  "dryRun": true,
  "mode": "development",
  "test": false,
  "retries": 100
}
```

## API

### arge(flags, options?)

Returns a key-value pairs object of flags

#### flags

Type: `string[]`

#### options

Type: `object | undefined`

##### `isArgv`

Type: `boolean`

Default: `true`

By default, the `arge` function assumes that you have passed `process.argv`. It does this because:

> The first element will be process.execPath.

> The second element will be the path to the JavaScript file being executed

https://nodejs.org/docs/latest/api/process.html#processargv

This package will omit those two items from the output.

If you wanted to pass an arbitrary array of flags that don't come from `process.argv`, you can set this option to `false`.

For example

```typescript
const flags = [
  '--dry-run',
  '--mode=development',
  '--test=false',
  '--retries=100',
]

const args = arge(flags, { isArgv: false })
```

This would then output:

```json
{
  "dryRun": true,
  "mode": "development",
  "test": false,
  "retries": 100
}
```

##### `camelCaseKeys`

Type: `boolean`

Default: `true`

This converts hyphen separated keys into camel case. To prevent this behaviour, you can set this value to `false`.

```typescript
const flags = ['--dry-run']

const args = arge(flags, { camelCaseKeys: false })
```

This would then output:

```json
{
  "dry-run": true
}
```
