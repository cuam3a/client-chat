import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: authState = {
    id: '',
    nickname: '',
    status: 'Conectado'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<authState>) => {
            state.id = action.payload.id
            state.nickname = action.payload.nickname
            state.status = action.payload.status
        },
        setStatus: (state, action: PayloadAction<'Conectado' | 'Ausente'>) => {
            state.status = action.payload
        },
        logout: (state) => {
            state = initialState
        }
    },
})

export const { set, setStatus, logout } = authSlice.actions
export default authSlice.reducer