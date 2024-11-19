import '@testing-library/jest-dom'
import shortener from '../utils/URLmap'

describe('URL Map', () => {
  it('Throws error if url is badly formed', () => {
    expect(shortener.addUrl('leefgo')).toThrow()
  })
})
