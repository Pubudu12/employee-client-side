import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faTrash,
    faUserEdit
} from "@fortawesome/free-solid-svg-icons";


const Card = (props : any) => {
    const { details } = props

    const myLoader = ({src} : { src: string }) => {
        return `${src}`;
    }

    return (
        
        <div className='rounded-md pb-3'>
            <Image src="https://placekitten.com/640/360" layout="responsive" width={0} height={0} alt='Employee' loader={myLoader}/>
            
            <div className='flex justify-between'>
                <div>
                    <div className='text-sm'>John</div>
                    <div className='text-sm underline'><Link href={'mailto:jom@gmail.com'}>jom@gmail.com</Link></div>
                    <div className='text-sm'><Link href={'tel:+9423323232'}>+9423323232</Link></div>
                    <div className='text-sm'>Male</div>
                </div>
                <div className='flex items-end'>
                    <span className='bg-red-600 px-2 rounded-full'><FontAwesomeIcon className='text-white text-[10px] pb-[1px]' icon={faTrash}/></span>
                    <span className='bg-green-500 px-2 rounded-full ml-1'><FontAwesomeIcon className='text-white text-[10px] pb-[1px]' icon={faUserEdit}/></span>
                </div>
            </div>                        
        </div>

    )
}

export default Card