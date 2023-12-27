'use client'
import Card from '@/app/components/card/card'
import Header from '@/app/components/header/header'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


function ListView() {  

    return (
        <main>
            {/* Header */}
            <Header />

            <div className="container mx-auto py-10">
                <div className='grid grid-cols-5 gap-5'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>           
        </main>
    )
}

export default ListView