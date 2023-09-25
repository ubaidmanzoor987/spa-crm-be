
export enum Roles {
    superAdmin = 'superAdmin',
    admin = 'admin',
    receptionist = 'receptionist',
    therapist = 'therapist',
}

export const initialRoleUsers = [
    {
        name:"superAdmin",
        description:"Super admins have access to the full set of admin features as well as security settings for the entire organization"
    },
    {
        name:"admin",
        description:"Admins have access to user and team management features as well as security settings for individual users"
    },

]