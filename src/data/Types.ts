export type Admin  = {
    adminID: string
    userName: string
    email: string
    created: number
}

export type editAdminRequest = {
    userName: string
    email: string
}