import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const posts = await client.fetch(`*[_type == "post"][0...6]`)

  return (
    <div className="items-center flex flex-col justify-center">
      <main className="flex flex-col justify-center gap-8 row-start-2 items-center sm:items-start">

        <div className="relative z-[-1] w-full h-[400px] flex dark:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] bg-no-repeat items-center justify-center bg-cover place-items-center flex-col gap-3">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/logo.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <h1 className="block font-bold text-gray-800 text-2xl md:text-5xl lg:text-6xl dark:text-neutral-200">Welcome To My<span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent"> Blogs</span></h1>
          <p className="text-lg mt-3 max-w-[43rem] text-center text-gray-600 dark:text-neutral-400">Revolutionize your content creation with our AI-powered blogs, delivering engaging and high-quality info in seconds.</p>
        </div>
        <div className="flex items-center gap-5 flex-wrap justify-center">

        </div>
        <div className="grid px-4 sm:px-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10">

          {posts.map((post: Post) => (
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

      </main>
    </div>
  );
}
