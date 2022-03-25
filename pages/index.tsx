import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { Posts } from '../typings'
import { sanityClient, urlFor } from './../sanity'

interface Props {
  posts: [Posts]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>UnMedium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Banner />
        <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border">
                <img
                  className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={urlFor(post.mainImage).url()!}
                  alt="image"
                />
                <div className="flex justify-between bg-white p-5">
                  <div className="">
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt={post.author.name}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* posts */}
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
    _id,
    title,
    slug,
    author ->{
    name,
    image
  },
  description,
  mainImage
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}

export default Home
