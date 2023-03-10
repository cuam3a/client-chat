import React from 'react'

type Props = {
  text: string
}

const Message = ({ text }: Props) => {
  return (
    <div className='w-full mx-auto flex flex-col md:flex-row mt-5 justify-center text-center border'>
      <h5 className="grow h-full w-full md:h-1/4 py-4 md:py-2 font-bold tracking-tight text-gray-900 dark:text-white">{text}</h5>
    </div>
  )
}

export default Message