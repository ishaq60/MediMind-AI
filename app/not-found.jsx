"use client";
import Link from 'next/link'
import NotFoundPage from './components/NotFoundPageCustom'
 
export default function NotFound() {
  return (
    <div className='min-h-screen container mx-auto flex justify-center '>
     <NotFoundPage></NotFoundPage>
    </div>
  )
}