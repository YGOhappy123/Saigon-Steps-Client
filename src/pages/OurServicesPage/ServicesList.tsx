import { twMerge } from 'tailwind-merge'
import useMediaQuery from '@/hooks/useMediaQuery'

const ServicesList = () => {
    const isLg = useMediaQuery('(min-width: 1024px)')

    return (
        <section id="services" className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center px-4 py-24">
                <h2 className="font-dancing-script text-4xl capitalize">Các dịch vụ tại Saigon Steps</h2>

                <div className="mt-11 flex w-full flex-col items-start gap-11 lg:flex-row lg:gap-8">
                    <ServiceImage imageUrl="/images/osp-service-1.jpg" />
                    <ServiceDescription
                        title="1. Giày dép & phụ kiện thời trang"
                        content={[
                            'Chúng tôi tự hào mang đến bộ sưu tập giày thời trang phong phú cho cả nam và nữ - từ sneaker năng động, giày da sang trọng đến sandal và dép tiện dụng.',
                            'Bên cạnh đó, phụ kiện đi kèm như tất, dây giày, túi xách, nón và ví cũng được chọn lọc kỹ lưỡng để giúp bạn hoàn thiện outfit một cách tinh tế nhất.',
                            'Tất cả sản phẩm tại Saigon Steps đều được đảm bảo về chất lượng và nguồn gốc, cam kết chỉ bán sản phẩm chính hãng 100%.'
                        ]}
                    />
                </div>

                <div className="mt-11 flex w-full flex-col items-start gap-11 lg:flex-row-reverse lg:gap-8">
                    <ServiceImage imageUrl="/images/osp-service-2.jpg" />
                    <ServiceDescription
                        title="2. Tư vấn phong cách cá nhân"
                        content={[
                            'Mỗi người đều có phong cách riêng, và đội ngũ của Saigon Steps luôn sẵn sàng tư vấn phối đồ, chọn giày theo dáng chân, màu sắc và hoàn cảnh sử dụng.',
                            'Dù bạn cần một đôi giày cho buổi đi chơi, công sở hay sự kiện đặc biệt - chúng tôi sẽ giúp bạn tìm ra lựa chọn hoàn hảo nhất.',
                            'Ngoài ra, chúng tôi còn cung cấp dịch vụ custom giày theo yêu cầu, giúp bạn sở hữu những đôi giày độc đáo, phản ánh đúng cá tính và phong cách riêng của mình.'
                        ]}
                        alignRight={isLg}
                    />
                </div>

                <div className="mt-11 flex w-full flex-col items-start gap-11 lg:flex-row lg:gap-8">
                    <ServiceImage imageUrl="/images/osp-service-3.jpg" />
                    <ServiceDescription
                        title="3. Khuyến mãi & ưu đãi thành viên"
                        content={[
                            'Chúng tôi thường xuyên tổ chức các chương trình khuyến mãi, giảm giá và tặng phiếu giảm giá đặc biệt dành cho khách hàng thân thiết.',
                            'Tham gia chương trình Saigon Steps Member, bạn sẽ được hưởng ưu đãi riêng, tích điểm và cập nhật sớm nhất các bộ sưu tập mới.'
                        ]}
                    />
                </div>

                <div className="mt-11 flex w-full flex-col items-start gap-11 lg:flex-row-reverse lg:gap-8">
                    <ServiceImage imageUrl="/images/osp-service-4.jpg" />
                    <ServiceDescription
                        title="4. Giao hàng tận nơi toàn quốc"
                        content={[
                            'Không cần đến trực tiếp cửa hàng, bạn vẫn có thể dễ dàng đặt hàng trực tuyến qua website hoặc mạng xã hội của chúng tôi.',
                            'Saigon Steps cam kết giao hàng nhanh - đóng gói kỹ - thanh toán linh hoạt, mang lại sự tiện lợi tối đa cho mọi khách hàng trên toàn quốc.'
                        ]}
                        alignRight={isLg}
                    />
                </div>

                <div className="mt-11 flex w-full flex-col items-start gap-11 lg:flex-row lg:gap-8">
                    <ServiceImage imageUrl="/images/osp-service-5.jpg" />
                    <ServiceDescription
                        title="5. Chính sách đổi trả & bảo hành"
                        content={[
                            'Chúng tôi hiểu rằng sự hài lòng của khách hàng là ưu tiên hàng đầu. Vì vậy, Saigon Steps có chính sách đổi trả linh hoạt trong trường hợp sản phẩm không vừa hoặc có lỗi sản xuất trong thời hạn 07 ngày kể từ ngày mua hàng.',
                            'Ngoài ra, chúng tôi còn bảo hành sản phẩm trong thời gian quy định, giúp khách hàng yên tâm hơn khi mua sắm.'
                        ]}
                    />
                </div>

                <div className="mt-11 flex w-full flex-col items-start gap-11 lg:flex-row-reverse lg:gap-8">
                    <ServiceImage imageUrl="/images/osp-service-6.jpg" />
                    <ServiceDescription
                        title="6. Hợp tác & phân phối"
                        content={[
                            'Saigon Steps luôn mở rộng cơ hội hợp tác với đại lý, cửa hàng và đối tác thời trang trên toàn quốc.',
                            'Chúng tôi cung cấp chính sách phân phối linh hoạt, giá sỉ hấp dẫn cùng hỗ trợ truyền thông - giúp đối tác cùng phát triển và lan tỏa thương hiệu đến nhiều khách hàng hơn.',
                            'Nếu bạn là một nhà thiết kế, nhà sản xuất hoặc đơn vị phân phối, hãy liên hệ với chúng tôi để thảo luận về cơ hội hợp tác.'
                        ]}
                        alignRight={isLg}
                    />
                </div>
            </div>
        </section>
    )
}

type ServiceImageProps = {
    imageUrl: string
}

const ServiceImage = ({ imageUrl }: ServiceImageProps) => {
    return (
        <div className="flex w-full basis-2/5 justify-center">
            <div className="aspect-[4/3] w-[50%] rounded-3xl p-4 shadow-lg lg:w-full">
                <div
                    className="h-full rounded-2xl bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${imageUrl})`
                    }}
                ></div>
            </div>
        </div>
    )
}

type ServiceDescriptionProps = {
    title: string
    content: string[]
    alignRight?: boolean
}

const ServiceDescription = ({ title, alignRight, content }: ServiceDescriptionProps) => {
    return (
        <div className="flex w-full basis-3/5 justify-center">
            <div className="flex w-full flex-col gap-6 lg:px-4">
                <h3
                    className={twMerge(
                        'text-3xl leading-snug font-bold tracking-wider text-balance capitalize lg:text-4xl',
                        alignRight && 'text-right'
                    )}
                >
                    {title}
                </h3>
                <div className="flex flex-col gap-3">
                    {content.map((paragraph, index) => (
                        <p key={index} className={twMerge('text-justify text-base', alignRight && 'text-last-right')}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServicesList
