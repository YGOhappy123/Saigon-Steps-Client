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
                url: '/trang-ca-nhan/cap-nhat-thong-tin'
            },
            {
                title: 'Đổi mật khẩu',
                icon: LockKeyhole,
                url: '/trang-ca-nhan/doi-mat-khau'
            }
        ]
    },
    {
        title: 'Hỗ trợ khách hàng',
        items: [
            {
                title: 'Trò chuyện trực tuyến',
                icon: MessageCircleMore,
                url: '/trang-ca-nhan/tro-chuyen'
            }
        ]
    },
    {
        title: 'Đơn hàng và vận chuyển',
        items: [
            {
                title: 'Đơn hàng của tôi',
                icon: ShoppingCart,
                url: '/trang-ca-nhan/don-hang'
            },
            {
                title: 'Danh sách địa chỉ',
                icon: MapPin,
                url: '/trang-ca-nhan/dia-chi'
            }
        ]
    }
]
