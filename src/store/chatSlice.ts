import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: Partial<chatState> = {
    users: [],
    messages: []
}

export const chatSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<Partial<authState>[]>) => {
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