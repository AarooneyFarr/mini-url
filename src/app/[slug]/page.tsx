import { redirect } from 'next/navigation'
import shortener from '../../utils/URLmap'

const page = ({ params }: { params: { slug: string } }) => {
  // If the url slug is valid and added to the map already, redirect to the appropriate website
  if (shortener.isUrl(params.slug)) {
    redirect(shortener.getFullUrl(params.slug)!)
  } else {
    // Otherwise go back home
    redirect('/')
  }
}

export default page
