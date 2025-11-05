import { useMemo, RefObject } from 'react'
import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import ChatImageContentDisplay from './ChatImageContentDisplay'
import dayjs from '@/libs/dayjs'

type ChatMessagesDisplayProps = {
    user: ICustomer
    messages: IChatMessage[]
    messageEndRef?: RefObject<HTMLDivElement | null>
}

const ChatMessagesDisplay = ({ user, messages, messageEndRef }: ChatMessagesDisplayProps) => {
    const messageGroups = useMemo(() => {
        return messages.reduce<
            {
                senderId: number
                messages: IChatMessage[]
            }[]
        >((groups, message) => {
            const senderId = message.isSentByStaff ? 0 : user.customerId
            const lastGroup = groups[groups.length - 1]

            if (lastGroup && lastGroup.senderId === senderId) {
                lastGroup.messages.push(message)
            } else {
                groups.push({ senderId, messages: [message] })
            }

            return groups
        }, [])
    }, [messages])

    return (
        <>
            <div className="flex flex-col gap-6">
                {messageGroups.map((group, index) => (
                    <MessageGroup key={index} group={group} user={user} />
                ))}
            </div>
            <div ref={messageEndRef} />
        </>
    )
}

type MessageGroupProps = {
    group: {
        senderId: number
        messages: IChatMessage[]
    }
    user: ICustomer
}

const MessageGroup = ({ group, user }: MessageGroupProps) => {
    const isStaff = group.senderId === 0

    return (
        <div className={twMerge('flex w-full max-w-full gap-4', isStaff ? '' : 'flex-row-reverse')}>
            <Avatar className="size-12 rounded-full">
                {isStaff ? (
                    <AvatarImage src="/images/no-text-logo.png" alt="Saigon Steps" className="bg-muted" />
                ) : (
                    <AvatarImage src={user?.avatar} alt={user.name} className="bg-muted" />
                )}
            </Avatar>

            <div className="flex max-w-full flex-1 flex-col gap-2">
                <>
                    <span className={twMerge('text-muted-foreground font-medium', isStaff ? 'text-start' : 'text-end')}>
                        {isStaff ? 'Saigon Steps' : user.name}
                    </span>

                    {group.messages.map(message => (
                        <div
                            key={message.messageId}
                            className={twMerge(
                                'relative flex w-max max-w-[75%] flex-col gap-1 rounded-lg px-3 py-2',
                                isStaff
                                    ? 'bg-muted rounded-tl-none'
                                    : 'bg-primary text-primary-foreground ml-auto items-end rounded-tr-none'
                            )}
                        >
                            {message.imageContent && <ChatImageContentDisplay src={message.imageContent} />}
                            {message.textContent && <p>{message.textContent}</p>}
                            <span
                                className={twMerge(
                                    'text-xs font-medium',
                                    isStaff ? 'text-muted-foreground' : 'text-primary-foreground'
                                )}
                            >
                                {dayjs(message.sentAt).format('DD/MM/YYYY HH:mm')}
                            </span>
                            <div
                                className={twMerge(
                                    'absolute top-0',
                                    isStaff
                                        ? 'border-muted right-full border-5 border-b-transparent border-l-transparent'
                                        : 'border-primary left-full border-5 border-r-transparent border-b-transparent'
                                )}
                            ></div>
                        </div>
                    ))}
                </>
            </div>
        </div>
    )
}

export default ChatMessagesDisplay
