import { useSelector } from 'react-redux'
import { UseMutationResult } from '@tanstack/react-query'
import { Eraser, Settings, Sparkles } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { RootState } from '@/store'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@/components/common/ConfirmationDialog'
import AddAddressDialog from '@/pages/AddressManagementPage/AddAddressDialog'
import customerService from '@/services/customerService'

const AddressManagementPage = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const addresses = useSelector((state: RootState) => state.app.addresses)
    const { addNewAddressMutation, setAddressAsDefaultMutation, deleteAddressMutation } = customerService({
        enableFetching: true
    })

    return (
        <div className="flex h-full flex-1 flex-col space-y-8 p-4">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Xin chào, {user!.name}!</h2>
                    <p className="text-muted-foreground">Đây là danh sách địa chỉ nhận hàng của bạn.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Avatar className="size-12 rounded-full">
                        <AvatarImage src={user!.avatar} alt={user!.name} />
                    </Avatar>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <Card className="w-full max-w-4xl">
                    <CardHeader className="relative text-center">
                        <CardTitle className="text-xl">Danh sách địa chỉ</CardTitle>
                        <CardDescription>Danh sách thông tin nhận hàng của bạn</CardDescription>
                        <AddAddressDialog
                            triggerButtonClassname="absolute right-6"
                            addNewAddressMutation={addNewAddressMutation}
                        />
                    </CardHeader>
                    <CardContent>
                        {addresses.length === 0 && (
                            <div className="flex h-full flex-col items-center justify-center gap-4">
                                <RadixAvatar className="w-[20%]">
                                    <RadixAvatarImage
                                        src="/images/no-locations.png"
                                        alt="no location"
                                    ></RadixAvatarImage>
                                </RadixAvatar>
                                <p className="text-sm font-semibold">Bạn chưa có địa chỉ nhận hàng nào!</p>
                            </div>
                        )}
                        {addresses.length > 0 && (
                            <div className="flex flex-col">
                                {addresses.map((address, index) => (
                                    <CustomerAddressLine
                                        key={address.addressId}
                                        address={address}
                                        isLast={index === addresses.length - 1}
                                        setAddressAsDefaultMutation={setAddressAsDefaultMutation}
                                        deleteAddressMutation={deleteAddressMutation}
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

type CustomerAddressLineProps = {
    address: ICustomerAddress
    isLast: boolean
    setAddressAsDefaultMutation: UseMutationResult<any, any, { addressId: number }, any>
    deleteAddressMutation: UseMutationResult<any, any, { addressId: number }, any>
}

const CustomerAddressLine = ({
    address,
    isLast,
    setAddressAsDefaultMutation,
    deleteAddressMutation
}: CustomerAddressLineProps) => {
    return (
        <div>
            <div className="flex items-start justify-between gap-6 lg:gap-10">
                <div className="flex flex-1 flex-col gap-3 break-words whitespace-normal">
                    <p>
                        <span className="font-semibold">Họ & tên người nhận: </span>
                        <span className="text-muted-foreground">{address.recipientName}</span>
                    </p>
                    <p>
                        <span className="font-semibold">Số điện thoại: </span>
                        <span className="text-muted-foreground">{address.phoneNumber}</span>
                    </p>
                    <p>
                        <span className="font-semibold">Địa chỉ: </span>
                        <span className="text-muted-foreground">
                            {address.addressLine}, {address.ward}, {address.city}
                        </span>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        disabled={address.isDefault}
                        onClick={async () => {
                            if (address.isDefault) return
                            await setAddressAsDefaultMutation.mutateAsync({
                                addressId: address.addressId
                            })
                        }}
                    >
                        {address.isDefault ? (
                            <>
                                <Sparkles /> Mặc định
                            </>
                        ) : (
                            <>
                                <Settings /> Đặt làm mặc định
                            </>
                        )}
                    </Button>
                    <ConfirmationDialog
                        title="Bạn có chắc muốn xóa hướng chuyển trạng thái này?"
                        description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn hướng chuyển trạng thái khỏi hệ thống NHT Marine."
                        onConfirm={async () => {
                            if (address.isDefault) return
                            await deleteAddressMutation.mutateAsync({
                                addressId: address.addressId
                            })
                        }}
                        trigger={
                            <Button variant="destructive" disabled={address.isDefault}>
                                <Eraser />
                                Xóa
                            </Button>
                        }
                    />
                </div>
            </div>

            {!isLast && <Separator className="my-4" />}
        </div>
    )
}

export default AddressManagementPage
