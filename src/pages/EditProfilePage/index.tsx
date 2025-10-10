import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import EditProfileForm from '@/pages/EditProfilePage/EditProfileForm'

const EditProfilePage = () => {
    return (
        <div className="flex flex-1 items-center justify-center">
            <Card className="w-full max-w-4xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Thông tin cá nhân</CardTitle>
                    <CardDescription>Cập nhật thông tin tài khoản của bạn</CardDescription>
                </CardHeader>
                <CardContent>
                    <EditProfileForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default EditProfilePage
