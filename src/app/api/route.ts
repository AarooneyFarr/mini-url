import shortener from '../../utils/URLmap'

export async function POST(request: Request) {
  const { url, slug } = await request.json()

  //   Add the url and slug in the API call to the Map
  shortener.addUrl(url, slug)

  return Response.json({ success: true })
}
