import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { useIsMobile } from '@/hooks/useMobile'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { RootState } from '@/store'
import { SocketProvider, useSocketContext } from '@/components/container/SocketProvider'
import ChatWindow from '@/pages/ChatPage/ChatWindow'
import useAxiosIns from '@/hooks/useAxiosIns'

const ChatPageInner = () => {
    const axios = useAxiosIns()
    const isMobile = useIsMobile()
    const user = useSelector((state: RootState) => state.auth.user!)
    const { socket } = useSocketContext()
    const [conversation, setConversation] = useState<IConversation | null>(null)

    const getMyConversationQuery = useQuery({
        queryKey: ['conversation'],
        queryFn: () => axios.get<IResponseData<IConversation>>('/chats/my-conversation'),
        refetchOnWindowFocus: false,
        select: res => res.data
    })

    useEffect(() => {
        if (getMyConversationQuery.isSuccess && getMyConversationQuery.data) {
            setConversation(getMyConversationQuery.data?.data)
        }
    }, [getMyConversationQuery.isSuccess, getMyConversationQuery.data])

    useEffect(() => {
        const handleNewConversation = (newConversation: IConversation) => {
            if (newConversation.customerId === user.customerId) {
                setConversation({ ...newConversation, messages: [newConversation.lastMessage!] })
            }
        }

        socket?.on('conversation:new', handleNewConversation)

        return () => {
            socket?.off('conversation:new', handleNewConversation)
        }
    }, [socket])

    useEffect(() => {
        if (conversation?.conversationId) {
            socket?.emit('joinConversation', conversation.conversationId)
        }

        return () => {
            if (conversation?.conversationId) {
                socket?.emit('leaveConversation', conversation.conversationId)
            }
        }
    }, [socket, conversation?.conversationId])

    return (
        <div
            className="flex h-full flex-1 flex-col space-y-8 p-4"
            style={{
                maxHeight: isMobile ? 'calc(100vh - 64px - 58px)' : 'calc(100vh - 64px)'
            }}
        >
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Xin chào, {user.name}!</h2>
                    <p className="text-muted-foreground">Đây là cuộc trò chuyện của bạn và hệ thống Saigon Steps.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Avatar className="size-12 rounded-full">
                        <AvatarImage src={user.avatar} alt={user.name} />
                    </Avatar>
                </div>
            </div>
            <div
                className="flex flex-1 items-start gap-8 overflow-auto"
                style={{
                    maxHeight: 'calc(100% - 96px)'
                }}
            >
                <ChatWindow user={user} conversation={conversation} isLoading={getMyConversationQuery.isPending} />
            </div>
        </div>
    )
}

const ChatPage = () => {
    return (
        <SocketProvider>
            <ChatPageInner />
        </SocketProvider>
    )
}

export default ChatPage
