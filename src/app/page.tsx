import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between">
            <h3 className='py-12'>
                This is the client side (Frontend) for the Employee CRUD Operations.
                As per the guidelines given in the assessment, the pages are given below.
            </h3>
                <li>
                    <Link href={'/employee/list'} className='text-blue-600 underline'> Employee list </Link>
                </li>
                <li>
                    <Link href={'/employee/add'} className='text-blue-600 underline'> Add New Employee </Link>
                </li>            
        </main>
    )
}
