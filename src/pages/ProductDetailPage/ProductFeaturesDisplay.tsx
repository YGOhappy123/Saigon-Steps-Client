import { SHOE_GENDER_MAP } from '@/configs/constants'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type ProductFeaturesDisplayProps = {
    features: IShoeFeature
}

const ProductFeaturesDisplay = ({ features }: ProductFeaturesDisplayProps) => {
    return (
        <div>
            <p className="mb-1 font-medium">Các thông số của giày / dép</p>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-muted/90">
                        <TableRow>
                            <TableHead className="w-[200px]">Thông số</TableHead>
                            <TableHead>Giá trị</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Giới tính</TableCell>
                            <TableCell>{SHOE_GENDER_MAP[features.gender]}</TableCell>
                        </TableRow>
                        {[
                            { name: 'upperMaterial', label: 'Chất liệu thân' },
                            { name: 'soleMaterial', label: 'Chất liệu đế' },
                            { name: 'liningMaterial', label: 'Chất liệu lót' },
                            { name: 'closureType', label: 'Kiểu khóa' },
                            { name: 'toeShape', label: 'Hình dạng mũi giày' },
                            { name: 'waterResistant', label: 'Khả năng chống nước' },
                            { name: 'breathability', label: 'Độ thoáng khí' },
                            { name: 'pattern', label: 'Họa tiết' },
                            { name: 'countryOfOrigin', label: 'Quốc gia xuất xứ' },
                            { name: 'heelHeight', label: 'Chiều cao gót (cm)' },
                            { name: 'durabilityRating', label: 'Độ bền (thang 10)' },
                            { name: 'releaseYear', label: 'Năm phát hành' }
                        ].map(item => (
                            <TableRow key={item.name}>
                                <TableCell className="font-medium">{item.label}</TableCell>
                                <TableCell>{features[item.name as keyof IShoeFeature] as string | number}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell className="font-medium">Màu sắc chủ đạo</TableCell>
                            <TableCell>
                                <div
                                    className="border-primary h-6 w-15 rounded-sm border-2"
                                    style={{ backgroundColor: features.primaryColor }}
                                ></div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Màu sắc phụ</TableCell>
                            <TableCell>
                                {features.secondaryColor ? (
                                    <div
                                        className="border-primary h-6 w-15 rounded-sm border-2"
                                        style={{ backgroundColor: features.secondaryColor }}
                                    ></div>
                                ) : (
                                    '(Không có)'
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Dịp sử dụng</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-2">
                                    {(features.occasionTags ?? []).map(tag => (
                                        <div
                                            key={tag}
                                            className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 select-none"
                                        >
                                            <span className="font-semibold text-blue-600">{tag}</span>
                                        </div>
                                    ))}
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Phong cách thiết kế</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-2">
                                    {(features.designTags ?? []).map(tag => (
                                        <div
                                            key={tag}
                                            className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 select-none"
                                        >
                                            <span className="font-semibold text-blue-600">{tag}</span>
                                        </div>
                                    ))}
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ProductFeaturesDisplay
