import Link from 'next/link';
import React from 'react'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Contact | Giaic Blog Assignment ",
    description: "Blod assignment Generated by Anas Ahmed for giaic 8th assignment | Contact Page",
};
export const dynamic = 'force-static'; //ssg becuase there is no dynamic data.

const page = () => {

    const contactInfoData = [
        {
            title: "Call To Me",
            descriptions: [
                "Contac Number",
                "Phone: +8801611112222"
            ]
        },
        {
            title: "Write To Me",
            descriptions: [
                "Fill out our form and i will contact you within 24 hours.",
                "Emails: anasahmedd244@gmail.com",
                "Emails: hafeezroll69@gmail.com"
            ]
        }
    ];

    const inputFields = [
        { label: "Your Name", type: "text", id: "name", required: true },
        { label: "Your Email", type: "email", id: "email", required: true },
        { label: "Your Phone", type: "tel", id: "phone", required: true }
    ];


    return (
        <div className="flex flex-col self-center justify-center p-3 md:p-14 max-md:mt-10 w-full">
            <nav className="text-sm ml-6 text-gray-400">
                <Link href={'/'}>Home</Link> / <span className="font-semibold text-gray-800"><Link href={'/contact'}>Contact</Link></span>
            </nav>

            <main className="sm:mt-10 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                    <aside className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                        <div className="flex overflow-hidden flex-col grow justify-center px-9 py-12 w-full bg-white rounded shadow-sm max-md:px-5 max-md:mt-8">
                            <div className="flex flex-col">
                                {contactInfoData.map((info, index) => (
                                    <React.Fragment key={index}>
                                        <ContactInfo {...info} />
                                        {index === 0 && (
                                            <div className="flex flex-col mt-8 max-w-full w-[270px]">
                                                <div className="shrink-0 h-px bg-black border border-black border-solid" />
                                            </div>
                                        )}
                                        {index === 0 && <div className="mt-8" />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </aside>

                    <section className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
                        <form className="flex overflow-hidden flex-col grow justify-center px-8 py-10 w-full text-base bg-white rounded shadow-sm max-md:px-5 max-md:mt-8 max-md:max-w-full">
                            <div className="flex flex-col items-end w-full max-md:max-w-full">
                                <div className="flex flex-wrap gap-4 items-start leading-6 text-red-500 max-md:max-w-full">
                                    {inputFields.map((field) => (
                                        <ContactInput key={field.id} {...field} />
                                    ))}
                                </div>

                                <div className="flex flex-col mt-8 max-w-full text-black w-[737px]">

                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Your Message*"
                                        className="px-4 pt-3.5 pb-44 rounded bg-neutral-100 max-md:pr-5 max-md:pb-24 max-md:max-w-full"
                                        aria-label="Your Message"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="gap-2.5 self-end w-44 px-6 py-4 mt-8 font-medium bg-red-500 rounded text-neutral-50 max-md:px-5"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
}

const ContactInput = ({ label, type, id, required = false }: any) => {
    return (
        <div className="flex flex-col w-[235px]">

            <input
                type={type}
                id={id}
                name={id}
                placeholder={label + '*'}
                required={required}
                className="px-4 py-3.5 rounded bg-neutral-100 max-md:pr-5"
                aria-label={label}
            />
        </div>
    );
}
const ContactInfo = ({ title, descriptions }: { title: string, descriptions: string[] }) => {
    return (
        <div className="flex flex-col w-full max-w-[262px]">
            <div className="flex gap-4 items-center self-start text-base font-medium text-black">
                {/* <div className='bg-red-500 rounded-full p-2'>
          {icon}
        </div> */}
                {/* <img
          loading="lazy"
          src={icon}
          alt={`${title} icon`}
          className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square fill-red-500"
        /> */}
                <div className="self-stretch my-auto">{title}</div>
            </div>
            <div className="flex flex-col mt-6 w-full text-sm text-black">
                {descriptions.map((description, index) => (
                    <div key={index} className={index > 0 ? "mt-4" : ""}>
                        {description}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default page