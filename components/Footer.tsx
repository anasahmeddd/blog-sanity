import Link from "next/link"

const Footer = () => {
    return (
        <footer className="footer w-full bg-gray-100 border-t text-gray-800 mt-16">
            <div className="container mx-auto justify-center flex flex-wrap px-8 pt-3 pb-12">
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg md:font-semibold text-gray-700">Company</h1>
                    <ul className="text-md md:text-lg text-gray-800 font-semibold">
                        <li>About</li>
                        <li><Link className="text-gray-800" href={"/blog"} >Blog</Link></li>
                        <li>Services</li>
                    </ul>
                </div>
               
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-700">Pages</h1>
                    <ul className="text-md md:text-lg text-gray-700 font-semibold">
                        <li><Link className="text-gray-800" href={"/"} >Home</Link></li>
                        <li><Link className="text-gray-800" href={"/search"} >Search</Link></li>

                    </ul>
                </div>
                <div className="w-1/2 lg:w-1/5 pt-8">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-700">Support</h1>
                    <ul className="text-md md:text-lg text-gray-800 font-semibold">
                    <li><Link className="text-gray-800" href={"/contact"} >Contact</Link></li>
                        <li>Web chat</li>
                        <li>Open ticket</li>
                    </ul>
                </div>
                <div className="w-full flex flex-col justify-center lg:w-1/5">
                    <h1 className="uppercase mb-4 text-md md:text-lg font-semibold text-gray-700">Email</h1>
                    <a href="mailto:anasahmedd244@gmail.com">anasahmedd244@gmail.com</a>
                 
                </div>
            </div>
        </footer>

    )
}

export default Footer
