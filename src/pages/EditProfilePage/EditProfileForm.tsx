import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RootState } from '@/store'
import { setUser } from '@/slices/authSlice'
import { useAudio } from '@/hooks/useAudio'
import ImageUploader from '@/pages/EditProfilePage/ImageUploader'
import fileService from '@/services/fileService'
import customerService from '@/services/customerService'

const editProfileFormSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Họ và tên không được để trống.' })
        .max(255, { message: 'Họ và tên không vượt quá 255 ký tự.' }),
    email: z.email('Email không đúng định dạng.'),
    roleId: z.number()
})

const EditProfileForm = () => {
    const user = useSelector((state: RootState) => state.auth.user) as ICustomer
    const [avatar, setAvatar] = useState(user?.avatar)
    const { playRandomKeyStrokeSound } = useAudio()
    const { uploadBase64Mutation } = fileService()
    const { updateCustomerMutation } = customerService({ enableFetching: false })
    const dispatch = useDispatch()

    const form = useForm<z.infer<typeof editProfileFormSchema>>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            roleId: 0
        }
    })

    const onSubmit = async (values: z.infer<typeof editProfileFormSchema>) => {
        try {
            let newImageUrl = null
            if (avatar && avatar !== user.avatar) {
                const res = await uploadBase64Mutation.mutateAsync({ base64: avatar, folder: 'avatar' })
                newImageUrl = res.data.data?.imageUrl
                setAvatar(newImageUrl)
            }

            await updateCustomerMutation.mutateAsync({
                name: values.name,
                email: values.email,
                avatar: newImageUrl ?? user.avatar
            })

            dispatch(
                setUser({
                    ...user,
                    name: values.name,
                    email: values.email,
                    avatar: newImageUrl ?? user.avatar
                })
            )
        } catch {
            form.reset()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col p-6">
                <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
                    <ImageUploader avatar={avatar} setAvatar={setAvatar} currentAvatar={user.avatar} />

                    <div className="col-span-1 flex flex-col gap-6 md:col-span-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-card-foreground">Họ và tên</FormLabel>
                                    <FormControl>
                                        <Input
                                            onKeyDown={playRandomKeyStrokeSound}
                                            placeholder="Họ và tên..."
                                            className="caret-card-foreground text-card-foreground h-12 rounded border-2 font-semibold"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-card-foreground">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            onKeyDown={playRandomKeyStrokeSound}
                                            placeholder="Email..."
                                            className="caret-card-foreground text-card-foreground h-12 rounded border-2 font-semibold"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roleId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-card-foreground">Vai trò</FormLabel>
                                    <Select onValueChange={() => {}} value={field.value?.toString() ?? ''} disabled>
                                        <FormControl>
                                            <SelectTrigger className="caret-card-foreground text-card-foreground h-12! w-full rounded border-2 font-semibold">
                                                <SelectValue placeholder="Vai trò..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {[{ roleId: 0, name: 'Khách hàng' }].map(role => (
                                                <SelectItem key={role.roleId} value={role.roleId.toString()}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="h-12 w-full rounded text-base font-semibold capitalize"
                >
                    {form.formState.isSubmitting ? 'Đang tải...' : 'Cập nhật thông tin'}
                </Button>
            </form>
        </Form>
    )
}

export default EditProfileForm
