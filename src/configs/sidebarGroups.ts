import { LockKeyhole, LucideIcon, MapPin, MessageCircleMore, ShoppingCart, UserIcon } from 'lucide-react'

export type SidebarGroupData = {
    title: string
    items: {
        title: string
        icon: LucideIcon
        url?: string
        isActive?: boolean
        children?: {
            title: string
            url: string
        }[]
    }[]
}

export const sidebarGroups: SidebarGroupData[] = [
    {
        title: 'Profile',
        items: [
            {
                title: 'Thông tin cá nhân',
                icon: UserIcon,
                url: '/profile/edit'
            },
            {
                title: 'Đổi mật khẩu',
                icon: LockKeyhole,
                url: '/profile/change-password'
            }
        ]
    },
    {
        title: 'Hỗ trợ khách hàng',
        items: [
            {
                title: 'Trò chuyện trực tuyến',
                icon: MessageCircleMore,
                url: '/profile/chat'
            }
        ]
    },
    {
        title: 'Đơn hàng và vận chuyển',
        items: [
            {
                title: 'Đơn hàng của tôi',
                icon: ShoppingCart,
                url: '/profile/orders'
            },
            {
                title: 'Danh sách địa chỉ',
                icon: MapPin,
                url: '/profile/addresses'
            }
        ]
    }
]
