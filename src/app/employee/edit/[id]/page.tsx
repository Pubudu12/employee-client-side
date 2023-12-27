import Header from '@/app/components/header/header'
import React from 'react'

function Edit() {
    return (
        <main className='flex flex-col items-center justify-between py-24 lg:px-[27rem] sm:px-[10rem]'>
            
            {/* Header */}
            <Header />

            <div className='py-3 flex justify-end w-full'>
                <button className='py-2 px-6 rounded-3xl bg-purple-700 text-white'>List View</button>
            </div>

            <form action="" className="mx-auto bg-white p-6 rounded-lg border w-full px-3">
                <div className="mb-4 flex items-center">
                    <label htmlFor="first_name" className="block text-gray-700 w-1/4">First Name:</label>
                    <input type="text" id="first_name" name="first_name" className="form-input mt-1 block w-3/4 border-b-[1px] border-gray-700 bg-gray-100 p-2" />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="last_name" className="block text-gray-700 w-1/4">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" className="form-input mt-1 block w-3/4 border-b-[1px] border-gray-700 bg-gray-100 p-2" />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="email" className="block text-gray-700 w-1/4">Email:</label>
                    <input type="text" id="email" name="email" className="form-input mt-1 block w-3/4 border-b-[1px] border-gray-700 bg-gray-100 p-2" />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="phone" className="block text-gray-700 w-1/4">Phone:</label>
                    <input type="text" id="phone" name="phone" className="form-input mt-1 block w-3/4 border-b-[1px] border-gray-700 bg-gray-100 p-2" />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="gender" className="block text-gray-700 w-1/4">Gender:</label>
                    <select id="gender" name="gender" className="form-select mt-1 block w-3/4 bg-gray-100 p-2 rounded-md">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className='py-3 flex justify-end w-full'>
                    <button className='text-purple-700 py-2 px-10 rounded-md border border-purple-700'>Save</button>
                </div>
            </form>

        </main>
    )
}

export default Edit