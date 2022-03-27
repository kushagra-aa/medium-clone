import Link from 'next/link'
import Logo from './../static/header.png'

const Header = () => {
  return (
    <header className="mx-auto flex max-w-7xl justify-start gap-10 border-b-2 border-blue-500 p-5">
      <div className="flex items-center space-x-5">
        <Link href={'/'}>
          <img
            className="w-44 cursor-pointer object-contain"
            src={Logo.src}
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex cursor-pointer items-center space-x-5 text-blue-600">
        <Link href="/">
          <h3>Home</h3>
        </Link>
        <Link href="/about">
          <h3 className="transitional rounded-full border border-blue-600 px-4 py-1 hover:bg-blue-600 hover:text-white">
            About
          </h3>
        </Link>
      </div>
    </header>
  )
}

export default Header
