'use client';

import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Markdown from 'react-markdown';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';


const RelatedPosts = ({ category, currentPostId }: { category: string, currentPostId: string }) => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const POST_QUERY = `*[_type == "post" && category == $category][0...4]`;

            const data: Post[] = await client.fetch(POST_QUERY, { category });
            setPosts(data);
            setLoading(false);
        };

        fetchPost();
    }, [category]);

    if (loading) {
        return (
            <div className="w-full px-4 md:px-20 lg:px-36 py-8">

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

    if (!posts) return <div>No Related Posts found!</div>;;
    const filteredPosts = posts.filter(i => i._id !== currentPostId)
    return (
        <div className="w-full px-4 md:px-20 lg:px-36 py-8">
            <div className="grid px-4 sm:px-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10">

                {filteredPosts.map((post: Post) => (
                    <div
                        className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                        key={post._id}
                        id="blogs"
                    >
                        <Link href={`/post/${post.slug.current}`} prefetch={false} className="block">
                            <div className="relative group">
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.mainImage.alt || post.title}
                                    width={500}
                                    height={220}
                                    className="w-fusll h-56 object-cover"
                                />
                            </div>
                            <div className="py-3 px-4">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{post.title}</h3>
                                <p className="text-sm text-gray-600 font-medium truncate mt-1">{post.description}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-800">
                                        {new Date(post._createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600">Category: {post.category}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedPosts;
