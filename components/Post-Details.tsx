'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Markdown from 'react-markdown';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import RelatedPosts from './RelatedPosts';


const PostsDetails = ({ slug }: { slug: string }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
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
      }`;

            const data: Post = await client.fetch(POST_QUERY, { slug });
            setPost(data);
            setLoading(false);
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="w-full px-4 md:px-20 lg:px-36 py-8">
                <div className="w-full h-96 bg-gray-300 animate-pulse rounded-lg"></div>
                <div className="h-10 mt-6 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <div className="h-4 w-32 bg-gray-300 animate-pulse rounded-md mb-2"></div>
                        <div className="h-4 w-24 bg-gray-300 animate-pulse rounded-md"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
                        <div className="h-4 w-20 bg-gray-300 animate-pulse rounded-md"></div>
                    </div>
                </div>
                <div className="mt-6 space-y-4">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="h-4 w-full bg-gray-300 animate-pulse rounded-md"
                        ></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!post) return notFound();

    return (
        <main>

            <div className="w-full px-4 md:px-20 lg:px-36 py-8">
                <Image
                    src={urlFor(post.mainImage).url()}
                    width={1000}
                    height={1000}
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
                            <img
                                src={urlFor(post.author.image).url()}
                                alt={post.author.name}
                                className="w-8 h-8 rounded-full"
                            />
                        )}
                        <span className="text-sm">{post.author.name}</span>
                    </div>
                </div>

                <Markdown className="mt-6 text-lg text-gray-700">{post.description}</Markdown>
            </div>
            {post.category && < RelatedPosts currentPostId={post._id} category={post.category} />}        </main>
    );
};

export default PostsDetails;
