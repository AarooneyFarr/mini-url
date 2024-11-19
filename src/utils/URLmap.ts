import { v4 as uuidv4 } from 'uuid'

export class UrlShortener {
  private urlMap: Map<string, string>

  constructor() {
    this.urlMap = new Map()
  }

  addUrl(url: string, slug?: string) {
    this.validateUrl(url)

    // Optional slug param allows setting key and value in the Map
    if (slug) {
      this.urlMap.set(slug, url)
      return slug
    }

    // Create a new UUID for the slug
    let newSlug = uuidv4().slice(0, 5)

    // If it exists already, make a new one until it is unique
    while (this.urlMap.has(newSlug)) {
      newSlug = uuidv4().slice(0, 5)
    }

    // Update the map with the new url and slug
    this.urlMap.set(newSlug, url)

    return newSlug
  }

  removeUrl(slug: string) {
    return this.urlMap.delete(slug)
  }

  private validateUrl(url: string) {
    try {
      // Quick and dirty way to validate the URL. This will throw if URL is invalid
      new URL(url)
    } catch (error) {
      throw new Error('url is not valid')
    }
  }

  getFullUrl(shortenedUrl: string) {
    if (this.urlMap.has(shortenedUrl)) {
      return this.urlMap.get(shortenedUrl)
    } else {
      throw new Error('url does not exist')
    }
  }

  isUrl(url: string) {
    return this.urlMap.has(url)
  }
}

const shortener = new UrlShortener()

// Only want one instance of this to exist
export default shortener
