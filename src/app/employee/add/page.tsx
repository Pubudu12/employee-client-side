'use client'
import Header from '@/app/components/header/header'
import Link from 'next/link';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addEmployee } from '@/app/redux/features/slices/employeeSlice';
import { AppDispatch } from '@/app/redux/store';

function Add() {

    const dispatch = useDispatch<AppDispatch>()
    const [notification, setNotification] = useState({
        color: "",
        message: ""
    })

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: 'M',
    });
    
    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });
    
    const validateName = (name: string) => {
        const regex = /^[a-zA-Z]+$/;
        if (!name) {
            return 'Please enter the first name';
        } else if (!regex.test(name)) {
            return 'First Name should only contain alphabets.';
        } else if (name.length < 6 || name.length > 10) {
            return 'First Name should be between 6 and 10 characters.';
        }
        return '';
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'Please enter an email address.';
        } else if (!regex.test(email)) {
            return 'Invalid email address.';
        }
        return '';
    };
    
    const validatePhone = (phone: string) => {
        const regex = /^(\+94|0)\d{9}$/;
        if (!phone) {
            return 'Please enter a phone number.';
        } else if (!regex.test(phone)) {
            return 'Invalid phone number.';
        }
        return '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const firstNameError = validateName(formData.first_name);
        const lastNameError = validateName(formData.last_name);
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);

        setErrors({
            first_name: firstNameError,
            last_name: lastNameError,
            email: emailError,
            phone: phoneError,
        });

        // Error checking for form
        if (!firstNameError && !lastNameError && !emailError && !phoneError ) {
            
            try {
                await dispatch(addEmployee(formData));
                console.log('Employee added successfully!');

                setNotification({color: "green", message: "Employee added successfully!"})
                setTimeout(() => {
                    setNotification({
                        color: "",
                        message: ""
                    })
                }, 30000); // 30 seconds in milliseconds
            } catch (error) {
                console.error('Error adding employee:', error);

                setNotification({color: "red", message: "Employee add Failed!"})
                setTimeout(() => {
                    setNotification({
                        color: "",
                        message: ""
                    })
                }, 30000); // 30 seconds in milliseconds
            }

        } else {
            console.log('Form has validation errors. Please fix them.');
        }
    };

    return (
        <main className='flex flex-col items-center justify-between py-24 lg:px-[27rem] sm:px-[10rem]'>
            
            {/* Header */}
            <Header />

            <div className='py-3 flex justify-end w-full'>
                <Link href={'/employee/list'}><button className='py-2 px-6 rounded-3xl bg-purple-700 text-white'>List View</button></Link>
            </div>

            <form action="" onSubmit={handleSubmit} className="mx-auto bg-white p-6 rounded-lg border w-full px-3">
                <div>
                    <div className={`${errors.first_name ? 'mb-1' : 'mb-4'} flex items-center`}>
                        <label htmlFor="first_name" className="block text-gray-700 w-1/4">First Name:</label>
                        <input type="text" id="first_name" name="first_name" placeholder='John' value={formData.first_name} onChange={handleInputChange} className={`form-input mt-1 block w-3/4 border-b-[1px] ${ errors.first_name ? 'border-red-500' : 'border-gray-700'} bg-gray-100 p-2`} />
                    </div>
                    {errors.first_name && (
                        <div className="text-red-500 text-sm text-right mb-2">{errors.first_name}</div>
                    )}
                </div>
                
                <div>
                    <div className={`${errors.last_name ? 'mb-1' : 'mb-4'} flex items-center`}>
                        <label htmlFor="last_name" className="block text-gray-700 w-1/4">Last Name:</label>
                        <input type="text" id="last_name" name="last_name" placeholder='Doe' value={formData.last_name} onChange={handleInputChange} className={`form-input mt-1 block w-3/4 border-b-[1px] ${ errors.last_name ? 'border-red-500' : 'border-gray-700'} bg-gray-100 p-2`} />
                    </div>
                    {errors.last_name && (
                        <div className="text-red-500 text-sm text-right mb-2">{errors.last_name}</div>
                    )}
                </div>

                <div>
                    <div className={`${errors.email ? 'mb-1' : 'mb-4'} flex items-center`}>
                        <label htmlFor="email" className="block text-gray-700 w-1/4">Email:</label>
                        <input type="text" id="email" name="email" placeholder='John@gmail.com' value={formData.email} onChange={handleInputChange} className={`form-input mt-1 block w-3/4 border-b-[1px] ${ errors.email ? 'border-red-500' : 'border-gray-700'} bg-gray-100 p-2`} />
                    </div>
                    {errors.email && (
                        <div className="text-red-500 text-sm text-right mb-2">{errors.email}</div>
                    )}
                </div>

                <div>
                    <div className={`${errors.phone ? 'mb-1' : 'mb-4'} flex items-center`}>
                        <label htmlFor="phone" className="block text-gray-700 w-1/4">Phone:</label>
                        <input type="text" id="phone" name="phone" placeholder='+94112755110' value={formData.phone} onChange={handleInputChange} className={`form-input mt-1 block w-3/4 border-b-[1px] ${ errors.phone ? 'border-red-500' : 'border-gray-700'} bg-gray-100 p-2`} />
                    </div>
                    {errors.phone && (
                        <div className="text-red-500 text-sm text-right mb-2">{errors.phone}</div>
                    )}
                </div>

                <div className="mb-4 flex items-center">
                    <label htmlFor="gender" className="block text-gray-700 w-1/4">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="form-select mt-1 block w-3/4 bg-gray-100 p-2 rounded-md">
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>

                <div>
                    {
                        notification.color === "green" ?
                        (
                            <span className='text-green-600'> {notification.message} </span>
                        )
                        :
                        <span className='text-red-600'> {notification.message} </span>
                    }                    
                </div>

                <div className='py-3 flex justify-end w-full'>
                    <button className='text-purple-700 py-2 px-10 rounded-md border border-purple-700'>Add</button>
                </div>
            </form>
        </main>
    )
}

export default Add