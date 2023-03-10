import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: Partial<chatState> = {
    users: [
        // { id: '1', nickname: 'TEST 1', status: 'Conectado' },
        // { id: '2', nickname: 'TEST 2', status: 'Conectado' },
        // { id: '3', nickname: 'TEST 3', status: 'Ausente' }
    ],
    messages: []
}

export const chatSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<Partial<authState>[]>) => {
            // let filter = state.users?.filter(ele => ele.id !== action.payload.id)
            // filter?.push(action.payload)
            // state.users = filter
            console.log(action.payload)
            state.users = [...action.payload]
        },
        addMessage: (state, action: PayloadAction<message>) => {
            let filter = state.messages?.filter(ele => ele.id !== action.payload.id)
            filter?.unshift(action.payload)
            state.messages = filter
        }
    },
})

export const { addUser, addMessage } = chatSlice.actions
export default chatSlice.reducer