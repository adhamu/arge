import { arge } from '..'

describe('arge', () => {
  const baseArgs = ['node', 'app.js']

  it('parses simple arguments', () => {
    const argv = [
      ...baseArgs,
      '-f',
      '--dry-run',
      '--mode=development',
      '--test=false',
      '--retries=100',
    ]

    expect(arge(argv)).toEqual({
      f: true,
      dryRun: true,
      mode: 'development',
      retries: 100,
      test: false,
    })
  })

  it('converts comma separated values to an array', () => {
    const argv = [...baseArgs, '--colours=red, blue,green']

    expect(arge(argv)).toEqual({
      colours: ['red', 'blue', 'green'],
    })
  })

  it('converts space separated values to an array', () => {
    const argv = [...baseArgs, '--colours=red  blue green']

    expect(arge(argv)).toEqual({
      colours: ['red', 'blue', 'green'],
    })
  })

  it('can handle non-argv input', () => {
    const argv = ['--colours=red  blue green']

    expect(arge(argv, { isArgv: false })).toEqual({
      colours: ['red', 'blue', 'green'],
    })
  })

  it('does not convert keys to camelCase if camelCaseKeys is false', () => {
    const argv = [...baseArgs, '--my-favourite-colours=red  blue green']

    expect(arge(argv, { camelCaseKeys: false })).toEqual({
      'my-favourite-colours': ['red', 'blue', 'green'],
    })
  })
})
