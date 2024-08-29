export type Admin  = {
    adminId: string
    userName: string
    email: string
    created: number
}

export type EditAdminRequest = {
    userName: string
    email: string
}

export type DockerContainerType = {
    name: string
	publicPort: number
	privatePort: number
	ip: string
	created: number
	state: string
	status: string
	image: string
	volume: string[]
}