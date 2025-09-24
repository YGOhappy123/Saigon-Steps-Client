declare global {
    interface ICustomer {
        customerId: number
        name: string
        createdAt: string
        email?: string
        avatar?: string
        isActive?: boolean
    }

    interface IStaff {
        staffId: number
        name: string
        createdAt: string
        email?: string
        avatar?: string
        isActive?: boolean

        roleId: number
        role?: string
        createdBy?: number
        createdByStaff?: Partial<IStaff> | string
    }

    interface ICustomerAddress {
        addressId: number
        customerId: number
        recipientName: string
        phoneNumber: string
        city: string
        ward: string
        addressLine: string
        isDefault: boolean
        customer?: Partial<ICustomer>
    }
}

export {}
