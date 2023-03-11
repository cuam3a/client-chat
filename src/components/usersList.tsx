import React from 'react'
import { useAppSelector } from '../store/hooks'
import { FaUserClock, FaUserCheck } from "react-icons/fa";

const UsersList = () => {
  const chat = useAppSelector(state => state.chat)

  return (
    <ul className="flex flex-wrap flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left justify-between h-full overflow-auto">
      <li className='w-full font-bold text-center text-sm md:text-base text-gray-700'>Usuarios Conectados</li>
      {
        chat.users?.map(ele => {
          return (
            <li className='cursor-pointer w-1/3 md:w-full text-sm md:text-lg' key={ele.id}>
              <div className='flex flex-row justify-between items-center h-10 py-6 px-2 my-2 border rounded bg-white text-gray-700 mx-1'>
                <div className='font-bold text-xs md:text-sm truncate'>
                  {ele.nickname}
                </div>
                <div>
                  {ele.status === "Conectado" ? <FaUserCheck className='text-green-600' /> : <FaUserClock className='text-red-600' />}
                </div>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default UsersList