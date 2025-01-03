import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { defineQuery } from 'next-sanity'
import React from 'react'

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
        _id,
        slug,
        title,
        description,
        category,
        _createdAt,
        mainImage,
        author ->{
        id, name, image,bio
        }
        }`)

    const post: Post = await client.fetch(POST_QUERY, { slug })
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
                <img src={urlFor(post.mainImage).url()}
                    alt={post.mainImage.alt || post.title}
                    className="w-full h-96 object-cover rounded-lg"
                />
            <h1 className="text-4xl font-bold mt-6">{post.title}</h1>

            <div className="flex items-center justify-between mt-4 text-gray-500">
                <div>
                    <p className="text-sm">Published on {new Date(post._createdAt).toLocaleDateString()}</p>
                    <p className="text-sm">Category: {post.category || 'Uncategorized'}</p>
                </div>
                    <div className="flex items-center space-x-2">
                        {post.author.image && (
                            <img src={urlFor(post.author.image).url()}

                                alt={post.author.name}
                                className="w-8 h-8 rounded-full"
                            />
                        )}
                        <span className="text-sm">{post.author.name}</span>
                    </div>
            </div>

            {/* Description */}
            <p className="mt-6 text-lg text-gray-700">{post.description}</p>

        </div>
    )
}

export default page
