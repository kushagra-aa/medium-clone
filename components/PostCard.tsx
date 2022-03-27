import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'
import { Posts } from '../typings'

interface Props {
  post: Posts
}

const PostCard = ({ post }: Props) => {
  return (
    <Link key={post._id} href={`/post/${post.slug.current}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border">
        {post.mainImage && (
          <img
            className="h-60 w-full object-cover transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:grayscale"
            src={urlFor(post.mainImage)?.url()!}
            alt="image"
          />
        )}
        <div className="flex justify-between bg-white p-5">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold">{post.title}</p>
            <p className="text-xs">
              <span className="text-gray-500">{post.description}</span>{' '}
              <span className="text-blue-500">by</span>{' '}
              <span className="underline">{post.author.name}</span>
            </p>
          </div>
          <img
            className="h-12 w-12 rounded-full"
            src={urlFor(post.author.image)?.url()!}
            alt={post.author.name}
          />
        </div>
        <div className="overflow-wrap flex justify-start gap-2 p-5">
          {post.allcategories.map((cat) => {
            if (post.categories.some((c) => cat._id === c._ref))
              return (
                <p
                  key={cat._id}
                  className="test-xs rounded border p-1 text-blue-400"
                >
                  {cat.title}
                </p>
              )
          })}
        </div>
      </div>
    </Link>
  )
}

export default PostCard
