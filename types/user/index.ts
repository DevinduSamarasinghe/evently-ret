//user params 

export interface CreateUserParams {
    clerkId: string,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    photo: string
}

export type UpdateUserParams = Partial<CreateUserParams>
