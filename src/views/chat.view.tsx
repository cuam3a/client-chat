import React from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setStatus, logout } from "../store/authSlice";
import UsersList from '../components/usersList';
import { FaSignOutAlt, FaComments } from 'react-icons/fa';
import { Socket } from 'socket.io-client';
import BarSendMessage from '../components/barSendMessage';
import { useNavigate } from 'react-router-dom';
import ChatPanel from '../components/chatPanel';

type Props = {
    socket: Socket
}

const Chat = ({ socket }: Props) => {
    const auth = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        socket.emit("changeStatus", { id: auth.id, status: value })
        dispatch(setStatus(value as any))
    }

    const handleLogout = () => {
        socket.emit("logout", { id: auth.id })
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className="bg-gray-800 font-sans h-screen">
            <header>
                <nav className=" relative flex w-full flex-wrap items-center justify-between py-3 text-neutral-200 lg:flex-wrap lg:justify-start">
                    <div className="flex w-full flex-wrap items-center justify-center px-6">
                        <div className="flex-grow flex-row items-center md:!flex md:basis-auto justify-center md:justify-start text-base">
                            
                            <label className='w-full md:w-1/6 flex justify-center font-bold'>
                                <FaComments size={25} className="mx-2"/>
                                NOMBRE: {auth.nickname}
                            </label>
                            <select 
                                defaultValue={auth.status} onChange={handleChangeStatus}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex w-2/3 mx-auto md:mx-0 md:w-1/6 p-1.5"
                            >
                                <option value="Conectado">CONECTADO</option>
                                <option value="Ausente">AUSENTE</option>
                            </select>
                        </div>
                        <div className="relative flex items-center">
                            <div className="flex-grow basis-[100%] items-center lg:!flex lg:basis-auto">
                                <button onClick={handleLogout}
                                    className='
                                        w-full 
                                        text-gray-700
                                        bg-white 
                                        focus:ring-4 
                                        focus:outline-none 
                                        focus:ring-blue-300 
                                        font-medium 
                                        text-sm 
                                        px-5 
                                        py-2 
                                        text-center
                                        flex
                                        flex-row 
                                        items-center 
                                        gap-x-2
                                    '
                                    >
                                    SALIR <FaSignOutAlt />
                                </button>
                            </div>
                        </div>

                    </div>
                </nav>
            </header>
            <main className='h-5/6'>
                <div className="flex flex-col md:flex-row h-full">
                    <nav className='bg-slate-200 mt-2 h-28 md:h-full '>
                        <div className='md:relative w-full md:w-80 h-full content-center md:content-start scroll-smooth md:scroll-auto overflow-auto'>
                            <div className=' md:fixed md:left-0 content-center md:content-start text-left justify-between md:w-80'>
                                <UsersList />
                            </div>
                        </div>
                    </nav>
                    <section className="flex w-full h-full">
                        <div className="main-content flex flex-col w-full bg-white md:mt-2 h-full pt-1 md:pt-0">
                            <ChatPanel />
                            <BarSendMessage socket={socket} />
                        </div>
                    </section>
                </div>
            </main>
            <footer className='relative flex w-full flex-wrap items-center justify-center py-3 text-neutral-200'>
                <div className='pt-3'>Derechos Reservados @ <a href='https://resume-app-two.vercel.app/' target="_blank">GCUAMEA</a></div>
            </footer>
        </div>
    )
}

export default Chat