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
      'dry-run': true,
      mode: 'development',
      retries: 100,
      test: false,
    })
  })

  it('converts comma separated values to an array', () => {
    const argv = [...baseArgs, '--colors=red, blue,green']

    expect(arge(argv)).toEqual({
      colors: ['red', 'blue', 'green'],
    })
  })

  it('converts space separated values to an array', () => {
    const argv = [...baseArgs, '--colors=red  blue green']

    expect(arge(argv)).toEqual({
      colors: ['red', 'blue', 'green'],
    })
  })

  it('can handle non-argv input', () => {
    const argv = ['--colors=red  blue green']

    expect(arge(argv, false)).toEqual({
      colors: ['red', 'blue', 'green'],
    })
  })
})
