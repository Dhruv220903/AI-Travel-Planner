import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
      <section className="relative bg-gradient-to-br from-blue-50 to-teal-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">AI Travel</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Get your dream itinerary in seconds — powered by AI. No stress, no hassle, just perfect trips every time.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={"/create-trip"}>
            <Button size="lg" className="rounded-2xl text-white bg-blue-600 hover:bg-blue-700">
              Start Planning
            </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-2xl border-blue-600 text-blue-600 hover:bg-blue-50">
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
