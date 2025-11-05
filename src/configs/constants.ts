import { SiFacebook, SiYoutube, SiTiktok, SiInstagram, SiX, IconType } from '@icons-pack/react-simple-icons'
import { Bot, House, ScanBarcode, Settings, TicketCheck, Users } from 'lucide-react'

type NavigationTab = {
    label: string
    href: string
    Icon: IconType
}

export const NAVIGATION_TABS: NavigationTab[] = [
    { label: 'trang chủ', href: '/trang-chu', Icon: House },
    { label: 'giới thiệu', href: '/gioi-thieu', Icon: Users },
    { label: 'dịch vụ', href: '/dich-vu', Icon: Settings },
    { label: 'sản phẩm', href: '/san-pham', Icon: ScanBarcode },
    { label: 'khuyến mãi', href: '/khuyen-mai', Icon: TicketCheck },
    { label: 'tìm kiếm bằng AI', href: '/tim-kiem-ai', Icon: Bot }
]

type SocialLink = {
    platform: string
    url: string
    Icon: IconType
}

export const SOCIAL_LINKS: SocialLink[] = [
    { platform: 'facebook', url: 'https://www.facebook.com', Icon: SiFacebook },
    { platform: 'youtube', url: 'https://youtube.com', Icon: SiYoutube },
    { platform: 'tiktok', url: 'https://www.tiktok.com', Icon: SiTiktok },
    { platform: 'instagram', url: 'https://www.instagram.com', Icon: SiInstagram },
    { platform: 'x', url: 'https://x.com', Icon: SiX }
]

export const LOGIN_SESSION_EXPIRED_MESSAGE = 'Phiên đăng nhập hết hạn. Xin vui lòng đăng nhập lại.'

export const LOGIN_REQUIRED_MESSAGE = 'Bạn cần phải đăng nhập trước khi thực hiện hành đồng này.'

export const DEFAULT_RESPONSE_ERROR_MESSAGE = 'Xảy ra lỗi không xác định. Vui lòng thử lại sau.'

export const INTRODUCTION_VIDEO_URL = 'https://youtube.com'

export const AUTH_CAROUSEL_IMAGES = ['https://i.pinimg.com/originals/bc/38/2e/bc382ee64cd5d4030572692aa76cecf8.gif']

export const AUTH_CAROUSEL_VIDEOS = []

export const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

export const SHOE_GENDER_MAP: { [key in ShoeGender]: string } = {
    MALE: 'Nam',
    FEMALE: 'Nữ',
    UNISEX: 'Unisex'
}

export const SHOE_GENDER_OPTIONS = Object.entries(SHOE_GENDER_MAP).map(([value, label]) => ({ value, label }))
