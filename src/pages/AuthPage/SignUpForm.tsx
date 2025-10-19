import { z } from 'zod'
import { FormType } from '@/pages/AuthPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useAudioContext } from '@/components/container/AudioProvider'
import authService from '@/services/authService'

type SignUpFormProps = {
    changeFormType: (type: FormType) => void
}

const signUpFormSchema = z
    .object({
        name: z
            .string()
            .min(1, { message: 'Họ và tên không được để trống.' })
            .max(255, { message: 'Họ và tên không vượt quá 255 ký tự.' }),
        username: z
            .string()
            .min(8, { message: 'Tên đăng nhập phải lớn hơn 8 ký tự.' })
            .max(20, { message: 'Tên đăng nhập không vượt quá 20 ký tự.' }),
        password: z
            .string()
            .min(8, { message: 'Mật khẩu phải lớn hơn 8 ký tự.' })
            .max(20, { message: 'Mật khẩu không vượt quá 20 ký tự.' }),
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Mật khẩu không trùng khớp.',
        path: ['confirmPassword']
    })

const SignUpForm = ({ changeFormType }: SignUpFormProps) => {
    const { signUpMutation } = authService()
    const { playRandomKeyStrokeSound } = useAudioContext()

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
        await signUpMutation.mutateAsync({
            name: values.name,
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-5 py-7">
                <h2 className="text-primary mb-10 text-center text-4xl font-medium">Đăng Ký Tài Khoản</h2>

                <div className="mb-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#101319]">Họ và tên</FormLabel>
                                <FormControl>
                                    <Input
                                        onKeyDown={() => playRandomKeyStrokeSound()}
                                        placeholder="Họ và tên..."
                                        className="h-12 rounded border-2 border-[#e7e3e4] font-semibold"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#101319]">Tên đăng nhập</FormLabel>
                                <FormControl>
                                    <Input
                                        onKeyDown={() => playRandomKeyStrokeSound()}
                                        placeholder="Tên đăng nhập..."
                                        className="h-12 rounded border-2 border-[#e7e3e4] font-semibold"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#101319]">Mật khẩu</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        onKeyDown={() => playRandomKeyStrokeSound()}
                                        placeholder="Mật khẩu..."
                                        className="h-12 rounded border-2 border-[#e7e3e4] font-semibold"
                                        iconClassname="text-primary"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#101319]">Nhập lại mật khẩu</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        onKeyDown={() => playRandomKeyStrokeSound()}
                                        placeholder="Nhập lại mật khẩu..."
                                        className="h-12 rounded border-2 border-[#e7e3e4] font-semibold"
                                        iconClassname="text-primary"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col items-center">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="h-12 w-full rounded text-base font-semibold capitalize"
                    >
                        {form.formState.isSubmitting ? 'Đang tải...' : 'Đăng ký'}
                    </Button>

                    <div className="mt-6">
                        <span className="font-medium text-[#101319]">Đã có tài khoản? </span>
                        <span
                            className="text-primary cursor-pointer font-bold hover:underline"
                            onClick={() => changeFormType('login')}
                        >
                            Đăng nhập
                        </span>
                    </div>

                    <div className="mt-2">
                        <span className="font-medium text-[#101319]">Quên mật khẩu? </span>
                        <span
                            className="text-primary cursor-pointer font-bold hover:underline"
                            onClick={() => changeFormType('forgot')}
                        >
                            Đặt lại
                        </span>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default SignUpForm
