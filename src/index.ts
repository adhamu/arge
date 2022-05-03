interface Options {
  isArgv?: boolean
  camelCaseKeys?: boolean
}

const parse = (value: string | boolean | number) => {
  if (['true', 'false', true, false].includes(value as string)) {
    return JSON.parse(value as string)
  }

  if (!Number.isNaN(Number(value))) {
    return parseFloat(value as string)
  }

  if ((value as string).includes(',')) {
    return (value as string).split(',').map(v => v.trim())
  }

  if ((value as string).includes(' ')) {
    return (value as string)
      .split(' ')
      .map(v => v.trim())
      .filter(v => !!v)
  }

  return value
}

export const arge = (
  args: string[],
  options: Options = {
    isArgv: true,
    camelCaseKeys: true,
  }
) => {
  const flags =
    options?.isArgv !== false ? args.filter((_, index) => index > 1) : args

  return flags.reduce((acc, curr) => {
    const [k, v] = curr.split('=')
    let key = k.replace(/^-+/, '')

    key = options?.camelCaseKeys
      ? key.replace(/-([a-z])/g, g => g[1].toUpperCase())
      : key

    return {
      ...acc,
      [key]: parse(v || true),
    }
  }, {})
}
