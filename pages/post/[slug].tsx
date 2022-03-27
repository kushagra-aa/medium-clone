import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { sanityClient, urlFor } from '../../sanity'
import { Posts } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface Props {
  post: Posts
}
interface CommentFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormInput>()
  const onSubmit: SubmitHandler<CommentFormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true)
      })
      .catch((err) => {
        setSubmitted(false)
        console.log('error', err)
      })
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="">
        <img
          className="blur-2 h-80 w-full object-cover"
          src={urlFor(post.mainImage).url()}
          alt="main"
        />
        <article className="mx-auto max-w-3xl p-5">
          <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
          <h2 className="mb-2 text-xl font-light text-gray-500">
            {post.description}
          </h2>
          <div className="flex items-center space-x-2">
            <img
              className="h-10 w-10 rounded-full"
              src={urlFor(post.author.image).url()!}
              alt={`${post.author.name} picture`}
            />
            <p className="text-sm font-extralight">
              Blog post by{' '}
              <span className="text-blue-600">{post.author.name}</span> -
              Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>
          <div className="overflow-wrap mt-3 flex justify-start gap-5">
            {post.allcategories.map((cat) => {
              if (post.categories.some((c) => cat._id === c._ref))
                return (
                  <Link key={cat._id} href={'/category/' + cat.slang}>
                    <p className="test-xs max-w-max cursor-pointer rounded border p-1 text-blue-400">
                      {cat.title}
                    </p>
                  </Link>
                )
            })}
          </div>
          <div className="mt-10">
            <PortableText
              className=""
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="my5 text-2xl font-bold" {...props} />
                ),
                h2: (props: any) => (
                  <h1 className="my5 text-xl font-bold" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc"> {children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {' '}
                    {children}
                  </a>
                ),
              }}
            />
          </div>
          <hr className="my-5 mx-auto max-w-lg border border-blue-500" />

          {submitted ? (
            <div className="my-10 mx-auto flex max-w-2xl flex-col gap-3 bg-blue-500 p-10 text-white">
              <h3 className="text-3xl font-bold">
                Thank you for submitting your comment!
              </h3>
              <p>Once it has been aprooved, it will be visible below.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
            >
              <h3 className="text-sm capitalize text-blue-500">
                enjoyed this article?
              </h3>
              <h3 className="cap text-3xl font-bold">Leave a comment below</h3>
              <hr className="mt-2 py-3" />
              <input
                {...register('_id')}
                type="hidden"
                name="_id"
                value={post._id}
              />
              <label className="mb-5 block ">
                <span className="text-gray-700">Name</span>
                <input
                  {...register('name', { required: true })}
                  className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
                  placeholder="Enter your name"
                  type="text"
                />
              </label>
              <label className="mb-5 block ">
                <span className="text-gray-700">Email</span>
                <input
                  {...register('email', { required: true })}
                  className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
                  placeholder="Enter email"
                  type="email"
                />
              </label>
              <label className="mb-5 block ">
                <span className="text-gray-700">Comment</span>
                <textarea
                  {...register('comment', { required: true })}
                  className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-blue-500 focus:ring"
                  placeholder="Comment here"
                  rows={8}
                />
              </label>
              <div className="flex flex-col p-5">
                {errors.name && (
                  <span className="text-red-500">
                    - The Name Field is required
                  </span>
                )}
                {errors.comment && (
                  <span className="text-red-500">
                    - The Comment Field is required
                  </span>
                )}
                {errors.email && (
                  <span className="text-red-500">
                    - The Email Field is required
                  </span>
                )}
              </div>
              <input
                type="submit"
                className="focus:shadow-outline focus:otline-none rounder cursor-pointer bg-blue-500 py-2 px-4 font-bold capitalize text-white hover:bg-blue-400"
                value="submit"
              />
            </form>
          )}
          {/* comments */}
          <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow-inner shadow-blue-500">
            <h3 className="text-4xl">Comments</h3>
            <hr className="pb-2" />
            {post.comments.length <= 0 && (
              <p className="text-xl capitalize text-blue-500">
                no comments yet <br />
                <span className="text-lg text-gray-500">
                  be the first to comment
                </span>
              </p>
            )}
            {post.comments.map((comment) => (
              <div key={comment._id} className="">
                <p>
                  <span className="text-blue-500">{comment.name}</span> says '
                  {comment.comment}'
                </p>
              </div>
            ))}
          </div>
        </article>
      </main>
    </>
  )
}

export default Post
export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
    _id,
    slug{
    current
  }
  }`
  const posts = await sanityClient.fetch(query)

  const paths = posts.map((path: Posts) => ({
    params: { slug: path.slug.current },
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post"&& slug.current==$slug][0]{
    _id,
  _createdAt,
  title,
  author->{
  name,
  image
},
  'comments': *[
  _type=="comment" &&
  post._ref==^._id &&
  approved==true],
categories,
'allcategories':*[
  _type=="category"
],
description,
mainImage,
slug,
body
  }`
  const post = await sanityClient.fetch(query, { slug: params?.slug })

  if (!post || post.length === 0) {
    return { notFound: true }
  }
  return {
    props: {
      post,
    },
    revalidate: 500,
  }
}
