import React from 'react'

const Spiner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className='w-8 h-8 rounded-full border-4 border-blue-500 relative animate-spin after:w-0 after:h-0 after:absolute after:z-10 after:top-[12px] after:left-[4px] after:border-b-[1rem] after:border-t-0 after:border-x-[.5rem] after:border-b-white after:border-x-transparent' />
    </div>
  )
}

export default Spiner