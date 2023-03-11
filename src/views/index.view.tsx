import { useState } from 'react'
import { FaComments } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks'
import { set } from "../store/authSlice";
import { Socket } from 'socket.io-client';

type Props = {
    socket: Socket
}

const Index = ({ socket }: Props) => {
    const [nickname, setNickname] = useState<string>('');
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = () => {
        dispatch(set({ id: socket.id, nickname, status: 'Conectado' }))
        socket.emit("newUser", { nickname, id: socket.id, status: 'Conectado' })
        socket.emit("message", { id: `${socket.id}${Math.random()}`, nickname: nickname, message:'', type: 'connect' })
        navigate('/chat')
    }

    return (
        <div className="flex w-full justify-center items-center h-screen bg-slate-200">
            <div className="m-auto w-11/12 md:w-1/4">
                <div className="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                    <div className="py-16 space-y-4">
                        <FaComments size={60} className='text-gray-600 text-center w-full' />
                        <h5 className="text-xl font-medium text-gray-900 text-center">
                            CHAT <span className='text-sm text-gray-600'>ONLINE</span>
                        </h5>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                            <input type="text" name="user" id="user" value={nickname} onChange={(e) => setNickname(e.target.value)}
                                className="
                                    bg-gray-50 
                                    border 
                                    border-gray-300 
                                    text-gray-900 
                                    text-sm
                                    block 
                                    w-full 
                                    p-2
                                "
                            />
                        </div>
                        <button type="submit" onClick={handleSubmit}
                            className="
                                w-full 
                                text-white 
                                bg-gray-600 
                                hover:bg-blue-800 
                                focus:ring-4 
                                focus:outline-none 
                                focus:ring-blue-300 
                                font-medium 
                                text-sm 
                                px-5 
                                py-2 
                                text-center
                                "
                            >
                            Entrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index