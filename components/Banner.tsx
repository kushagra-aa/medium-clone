import React from 'react'
import Logo from './../static/banner.png'

const Banner = () => {
  return (
    <div className="flex items-center justify-between border-y bg-blue-300 py-10 lg:py-0">
      <div className="space-y-5 px-10">
        <h1 className="max-w-xl font-serif text-6xl">
          '
          <span className="underline decoration-black decoration-4">
            My Medium
          </span>
          ' a place where I write, connect and express
        </h1>
        <h2 className="">
          It's easy and free to comment your thinking on any post and connect
          with me!
        </h2>
      </div>
      <img
        className="hidden h-32 md:inline-flex lg:h-full"
        src={Logo.src}
        alt=""
      />
    </div>
  )
}

export default Banner
