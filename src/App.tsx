import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './store/hooks'
import { addUser, addMessage } from "./store/chatSlice";
import * as io from "socket.io-client"
import './App.css';

const Index = lazy(() => import('./views/index.view'))
const Chat = lazy(() => import('./views/chat.view'))

const Loading = () => <p>Cargando ...</p>;

const socket = io.connect("http://lolcahost:5000")

type Props = {
  id: String
}

const ProtecedRoute = ({ id }: Props) => {
  if (id === "") return <Navigate to="/" replace />

  return <Outlet />
}

function App() {
  const user = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("userResponse", data => {
      console.log(data)
      dispatch(addUser(data))

    })
    socket.on("messageResponse", data => {
      console.log(data)
      dispatch(addMessage(data))
    })
  }, [socket])

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Index socket={socket} />} />
          <Route element={<ProtecedRoute id={user.id} />}>
            <Route path='/chat' element={<Chat socket={socket} />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
