'use client'
import { Container } from '@/components/container'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/16/solid'
import Link from 'next/link'
import { useState } from 'react'
import shortener from '../utils/URLmap'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8080'

export default function Home() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [slug, setSlug] = useState<string | null>(null)

  const submitUrl = async () => {
    try {
      // Quick and dirty test for url validity
      const urlTest = new URL(url)

      //   Add a new url to map
      const newSlug = shortener.addUrl(url)

      //   Add it to the server map
      const res = await fetch(BASE_URL + '/api', {
        method: 'POST',
        body: JSON.stringify({
          slug: newSlug,
          url: url,
        }),
      })

      if (res.status !== 200) {
        setError('URL could not be saved. Please try again')
      }

      if (newSlug) {
        setSlug(newSlug)
        setUrl('')
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <div className="relative h-full text-gray-900">
        {/* <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" /> */}
        <Container className="relative">
          <div className="pb-24 pt-48 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <h1 className="font-display mt-48 text-balance text-6xl/[0.9] font-medium uppercase tracking-widest text-gray-900 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
              Mini url
            </h1>

            <div className="flex flex-row pt-3">
              <div className="w-full sm:max-w-xs">
                <div className="relative">
                  <label htmlFor="url" className="sr-only">
                    Email
                  </label>
                  <input
                    id="url"
                    name="url"
                    type="url"
                    placeholder="https://google.com"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                  {error && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="size-5 text-red-500"
                      />
                    </div>
                  )}
                </div>
                {error && (
                  <p id="email-error" className="mt-2 text-sm text-red-600">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => submitUrl()}
                className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                Shorten
              </button>
            </div>

            <div className="pt-12">
              <SlugLink slug={slug} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

const SlugLink = ({ slug }: { slug: string | null }) => {
  const linkUrl = BASE_URL + '/' + slug

  return slug ? (
    <div>
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="shrink-0">
            <CheckCircleIcon
              aria-hidden="true"
              className="size-5 text-green-400"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              Successfully shortened url
            </p>
          </div>
          <div className="ml-auto pl-3">
            <div className="">
              <p className="text-sm md:ml-6">
                <Link
                  className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                  href={linkUrl}
                >
                  {linkUrl}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
