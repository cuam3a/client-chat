import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addMessage } from "../store/chatSlice";
import { Socket } from 'socket.io-client';

type Props = {
  socket: Socket
}

const BarSendMessage = ({ socket }: Props) => {
  const [message, setMessage] = useState<string>('')
  const auth = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit("message", { id: `${auth.id}${Math.random()}`, nickname: auth.nickname, message })
    setMessage('')
  }

  return (
    <div className="py-5 text-xs">
      <form className='md:px-5 flex gap-1' onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="
            bg-gray-50 
            border 
            border-gray-500 
            text-gray-900 
            text-sm
            block 
            w-4/5 
            p-2
          
          "
          type="text"
          placeholder="Escribe tu comentario"
        />
        <button
          type='submit'
          className="
          text-white
          bg-green-500
            focus:ring-4 
            focus:outline-none 
          focus:ring-blue-300 
            font-medium 
            text-sm 
            px-5 
            py-2 
            text-center
            w-1/5
          ">
          ENVIAR
        </button>
      </form>
    </div>
  )
}

export default BarSendMessage