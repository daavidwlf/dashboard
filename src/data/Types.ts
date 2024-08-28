export type Admin  = {
    adminId: string
    userName: string
    email: string
    created: number
}

export type editAdminRequest = {
    userName: string
    email: string
}