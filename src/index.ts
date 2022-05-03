interface Options {
  isArgv?: boolean
  camelCaseKeys?: boolean
}

const toArray = (value: string, delimiter: string) =>
  value
    .split(delimiter)
    .map(v => v.trim())
    .filter(v => v)

const parse = (value: string): string | boolean | number | string[] => {
  if (['true', 'false', true, false].includes(value)) {
    return JSON.parse(value)
  }

  if (!Number.isNaN(Number(value))) {
    return parseFloat(value)
  }

  if (value.includes(',')) {
    return toArray(value, ',')
  }

  if (value.includes(' ')) {
    return toArray(value, ' ')
  }

  return value
}

export const arge = (
  args: string[],
  options: Options = {
    isArgv: true,
    camelCaseKeys: true,
  }
) =>
  (options.isArgv !== false
    ? args.filter((_, index) => index > 1)
    : args
  ).reduce((acc, curr) => {
    const [k, v = 'true'] = curr.split('=')
    let key = k.replace(/^-+/, '')

    key = options.camelCaseKeys
      ? key.replace(/-([a-z])/g, g => g[1].toUpperCase())
      : key

    return {
      ...acc,
      [key]: parse(v),
    }
  }, {})
