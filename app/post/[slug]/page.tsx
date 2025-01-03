import PostsDetails from '@/components/Post-Details';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { defineQuery } from 'next-sanity'
import { notFound } from 'next/navigation';
import React from 'react'
import Markdown from 'react-markdown';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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
    if (!post) return notFound();


    return {
        title: `${post.title} | Blog Assignment in Next.js & Sanity made by Anas Ahmed`,
        description: post.description.slice(0, 300) + "...",
        openGraph: {
            title: `${post.title} | Blog Assignment in Next.js & Sanity made by Anas Ahmed`,
            description: post.description.slice(0, 300) + "...",
            url: `${process.env.SITE_URL}/posts/${slug}`,
            images: [
                {
                    url: urlFor(post.mainImage).url(),
                    width: 220,
                    height: 250,
                    alt: post.title,
                },
            ],
            site_name: 'Blog Assignment in Next.js & Sanity made by Anas Ahmed',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${post.title} | Borcelle`,
            description: post.description.slice(0, 300) + "...",
            images: [urlFor(post.mainImage).url()],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true, // Same for GoogleBot
                follow: true,
            },
        },
    };
}


const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    // const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
    //     _id,
    //     slug,
    //     title,
    //     description,
    //     category,
    //     _createdAt,
    //     mainImage,
    //     author ->{
    //     id, name, image,bio
    //     }
    //     }`)

    // const post: Post = await client.fetch(POST_QUERY, { slug })
    return (
        // <div className="max-w-4xl mx-auto px-4 py-8">
        //     <img src={urlFor(post.mainImage).url()}
        //         alt={post.mainImage.alt || post.title}
        //         className="w-full h-96 object-cover rounded-lg"
        //     />
        //     <h1 className="text-4xl font-bold mt-6">{post.title}</h1>

        //     <div className="flex items-center justify-between mt-4 text-gray-500">
        //         <div>
        //             <p className="text-sm">Published on {new Date(post._createdAt).toLocaleDateString()}</p>
        //             <p className="text-sm">Category: {post.category || 'Uncategorized'}</p>
        //         </div>
        //         <div className="flex items-center space-x-2">
        //             {post.author.image && (
        //                 <img src={urlFor(post.author.image).url()}

        //                     alt={post.author.name}
        //                     className="w-8 h-8 rounded-full"
        //                 />
        //             )}
        //             <span className="text-sm">{post.author.name}</span>
        //         </div>
        //     </div>

        //     <Markdown className="mt-6 text-lg text-gray-700">{post.description}</Markdown>

        // </div>
        <PostsDetails slug={slug} />
    )
}

export default page
