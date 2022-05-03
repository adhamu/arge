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

export const arge = (args: string[], isArgv = true) => {
  const flags = isArgv ? args.filter((_, index) => index > 1) : args

  return flags.reduce((acc, curr) => {
    const [k, v] = curr.split('=')
    const key = k.replace(/^-+/, '')

    return {
      ...acc,
      [key]: parse(v || true),
    }
  }, {})
}
