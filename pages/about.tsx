import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Logo from './../static/header.png'

const About = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>About My Medium</title>
      </Head>
      <Header />
      <main className="flex flex-col gap-8 p-10 md:p-5 lg:p-3">
        <img className="mx-auto w-6/12" src={Logo.src} />
        <p className="text-2xl">
          <Link href={'/'}>
            <span className="cursor-pointer text-blue-900"> My Medium </span>
          </Link>
          is clone of{' '}
          <a className="underline" target="_blank" href="https://medium.com/">
            Medium
          </a>
          , this is a blogging Web-Application that is built on{' '}
          <a className="underline" target="_blank" href="https://nextjs.org/">
            NextJS
          </a>{' '}
          and uses{' '}
          <a
            className="underline"
            target="_blank"
            href="https://www.sanity.io/"
          >
            Sanity
          </a>{' '}
          for Content Management.
        </p>
        <p className="self-center text-lg capitalize">built with 🤍</p>
        <div className="flex flex-col gap-8">
          <p className="text-xl capitalize">made by</p>
          <div className="flex flex-col items-center gap-8">
            <a target="_blank" href="https://kushagra-aa.github.io/portfolio/">
              <img
                className="hover-up transition-up w-96 rounded-full border-2 border-blue-600 shadow-2xl"
                src="https://pbs.twimg.com/profile_images/1391264894192738307/YLfn-2Xk_400x400.jpg"
                alt="me"
              />
            </a>
            <p className="text-6xl capitalize tracking-widest text-blue-500">
              Kushagra Agnihotri
            </p>
            <p className="text-2xl text-gray-700">
              Creating memorable Websites and Apps.
            </p>
            <div className="mb-10 flex w-2/3 justify-between text-2xl capitalize">
              <a
                href="https://kushagra-aa.github.io/portfolio/#about"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-down w-56 rounded bg-blue-600 p-2 text-center text-blue-200 shadow-xl"
              >
                more about me
              </a>
              <a
                href="https://kushagra-aa.github.io/portfolio/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-up w-56 rounded bg-blue-200 p-2 text-center text-blue-600 shadow-xl"
              >
                contact me
              </a>
              <a
                href="https://kushagra-aa.github.io/portfolio/#projects"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-down w-56 rounded bg-blue-600 p-2 text-center text-blue-200 shadow-xl"
              >
                more by me
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default About
