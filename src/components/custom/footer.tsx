import { Link } from "react-router-dom"
import { Facebook, Instagram, Linkedin, TwitterX } from "react-bootstrap-icons"

export default function Footer() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-24">
      <div className="px-4 md:px-6 flex flex-col items-center text-center w-full">
        <h1 className="font-bold text-xl">TMDB2</h1>
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none text-white">
          Stay Connected
        </h2>
        <p className="mx-auto text-zinc-100">
          Subscribe to our newsletter and follow us on our social media.
        </p>
        <div className="w-full max-w-md space-y-2 my-4">
        </div>
        <div className="flex justify-center space-x-6">
          <Link to="#" aria-label="Facebook page" className="text-white hover:text-blue-600">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link to="#" aria-label="Twitter profile" className="text-white hover:text-gray-900">
            <TwitterX className="h-6 w-6" />
          </Link>
          <Link to="#" aria-label="Instagram profile" className="text-white hover:text-pink-600">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link to="#" aria-label="LinkedIn profile" className="text-white hover:text-sky-600">
            <Linkedin className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}
