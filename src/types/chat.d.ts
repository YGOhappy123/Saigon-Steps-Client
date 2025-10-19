declare global {
    interface IConversation {
        conversationId: number
        customerId: number

        messages?: IChatMessage[]
        lastMessage?: IChatMessage
    }

    interface IChatMessage {
        messageId: number
        textContent?: string
        imageContent?: string
        sentAt: string

        isSentByStaff: boolean
        senderStaffId?: number
    }
}

export {}
