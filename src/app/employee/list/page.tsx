'use client'
import Card from '@/app/components/card/card'
import Header from '@/app/components/header/header'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEmployees, deleteEmployee } from '@/app/redux/features/slices/employeeSlice'
import { AppDispatch, RootState } from '@/app/redux/store'
import { setGridView, setListView } from '@/app/redux/features/slices/toggleViewSlice'
import Image from 'next/image'
import Link from 'next/link'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrash,
    faUserEdit,
    faList,
    faTable
} from "@fortawesome/free-solid-svg-icons";


function ListView() {  

    const {entities} = useSelector((state:RootState) => state.employee)
    const dispatch = useDispatch<AppDispatch>()
    const useref = useRef(false)

    const viewType = useSelector((state:RootState) => state.view.viewType);

    const toggleView = () => {
        if (viewType === 'grid') {
            dispatch(setListView());
        } else {
            dispatch(setGridView());
        }
    };

    console.log('entities here :: ', entities)

    const myLoader = ({src} : { src: string }) => {
        return `${src}`;
    }

    const handleDelete = async (employeeId: number) => {
        try {
            await dispatch(deleteEmployee(employeeId));
            console.log('Employee deleted successfully!');
            alert('Employee deleted successfully!')
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Error deleting employee!')
        }
    };

    useEffect(() => {
        dispatch(fetchEmployees())        
    },[])

    return (
        <main>
            {/* Header */}
            <Header />

            <div className="container mx-auto py-10">

                <div className='py-3 flex justify-end w-full'>
                    <Link href={'/employee/add'}><button className='py-2 px-6 rounded-3xl bg-purple-700 text-white mr-2'>Add Employee</button></Link>
                    <button className='py-2 px-6 rounded-3xl bg-purple-700 text-white' onClick={toggleView}><FontAwesomeIcon className='text-white text-[15px]' icon={viewType === 'grid' ? faList : faTable}/></button>
                </div>

                { viewType === 'grid' ? (
                    <div className='grid grid-cols-5 gap-5'>
                        {
                            entities?.map((singleEmployee:any) => 
                                <div className='rounded-md pb-3' key={singleEmployee.id}>
                                    {
                                        (singleEmployee.photo === '') || (singleEmployee.photo === null) ?
                                        <Image src={'https://placehold.co/300x300'} layout="responsive" width={0} height={0} alt='Employee' loader={myLoader}/>
                                        :
                                        <Image src={singleEmployee.photo} layout="responsive" width={0} height={0} alt='Employee' loader={myLoader}/>
                                    }
                                    
                                    <div className='flex justify-between'> 
                                        <div>
                                            <div className='text-sm'>{`${singleEmployee.first_name} ${singleEmployee.last_name}`}</div>
                                            <div className='text-sm underline'><Link href={`mailto:${singleEmployee.email}`}>{singleEmployee.email}</Link></div>
                                            <div className='text-sm'><Link href={`tel:${singleEmployee.phone_number}`}>{singleEmployee.phone_number}</Link></div>
                                            <div className='text-sm'>{ singleEmployee.gender === 'M' ? 'Male' : 'Female'}</div>
                                        </div>
                                        <div className='flex items-end'>
                                            <button className='bg-red-600 px-2 rounded-full' onClick={() => handleDelete(singleEmployee.id)}><FontAwesomeIcon className='text-white text-[10px] pb-[1px]' icon={faTrash}/></button>
                                            <Link href={`/employee/edit/${singleEmployee.id}`}><span className='bg-green-500 px-2 rounded-full ml-1'><FontAwesomeIcon className='text-white text-[10px] pb-[1px]' icon={faUserEdit}/></span></Link>
                                        </div>
                                    </div>                        
                                </div>
                            )
                        }
                    </div>
                )
                : (
                    <div>
                        <table className='w-full'>
                            <thead className='bg-[#a7c941]'>
                                <tr className='text-white py-2'>
                                    <th className='py-2'>Image</th>
                                    <th className='py-2'>First Name</th>
                                    <th className='py-2'>Last Name</th>
                                    <th className='py-2'>Email</th>
                                    <th className='py-2'>Phone</th>
                                    <th className='py-2'>Gender</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    entities?.map((singleEmployee:any) => 
                                        <tr key={singleEmployee.id}>
                                            <td className='border-b border-l border-[#a7c941] flex justify-center py-1'>
                                                {
                                                    (singleEmployee.photo === '') || (singleEmployee.photo === null) ?
                                                    <Image src={'https://placehold.co/300x300'} className='w-[30%]' width={0} height={0} alt='Employee' loader={myLoader}/>
                                                    :
                                                    <Image src={singleEmployee.photo} className='w-[30%]' width={0} height={0} alt='Employee' loader={myLoader}/>
                                                }
                                            </td>
                                            <td className='border-b border-l border-[#a7c941]'>
                                                {singleEmployee.first_name}
                                            </td>
                                            <td className='border-b border-l border-[#a7c941]'>{singleEmployee.last_name}</td>
                                            <td className='border-b border-l border-[#a7c941]'>{singleEmployee.email}</td>
                                            <td className='border-b border-l border-[#a7c941]'>{singleEmployee.phone_number}</td>
                                            <td className='border-b border-l border-[#a7c941]'>{ singleEmployee.gender === 'M' ? 'Male' : 'Female'}</td>
                                            <td className='border-b border-l border-r border-[#a7c941]'>
                                                <button onClick={() => handleDelete(singleEmployee.id)}><FontAwesomeIcon className='text-red-600 text-[20px] pl-2' icon={faTrash}/></button> |
                                                <Link href={`/employee/edit/${singleEmployee.id}`}><FontAwesomeIcon className='text-green-600 text-[20px] pl-1' icon={faUserEdit}/></Link>
                                            </td>
                                        </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                
            </div>           
        </main>
    )
}

export default ListView