type authState = {
    id: string
    nickname: string
    status: 'Conectado' | 'Ausente'
}

type message = {
    id: string
    nickname: string
    message: string
}

type chatState = {
    users: Partial<authState>[]
    messages: message[]
}


