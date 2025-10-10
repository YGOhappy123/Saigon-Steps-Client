declare global {
    interface ICustomer {
        customerId: number
        name: string
        createdAt: string
        email?: string
        avatar?: string
    }

    interface IStaff {
        staffId: number
        name: string
        createdAt: string
        email?: string
        avatar?: string
        roleId: number
        createdBy?: number
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
