import { Button } from '@/components/ui/button'

type CategoryBrandSelectProps = {
    title: string
    items: IShoeCategory[] | IProductBrand[]
    selectedItem: string | null
    onSelectOne: (item: IShoeCategory | IProductBrand) => void
    onSelectAll: () => void
}

const CategoryBrandSelect = ({ title, items, selectedItem, onSelectOne, onSelectAll }: CategoryBrandSelectProps) => {
    return (
        <ul className="grid grid-cols-5 items-center gap-4">
            <h2 className="font-dancing-script text-3xl capitalize">{title}</h2>
            {items.length > 0 && (
                <li>
                    <Button
                        variant={!selectedItem ? 'default' : 'secondary'}
                        size="xl"
                        className="w-full rounded-full"
                        onClick={onSelectAll}
                    >
                        Tất cả
                    </Button>
                </li>
            )}

            {items.map((item, index) => {
                const isActive = item.name.toLowerCase() === selectedItem?.toLowerCase()

                return (
                    <li key={index}>
                        <Button
                            variant={isActive ? 'default' : 'secondary'}
                            size="xl"
                            className="w-full gap-0 rounded-full px-1.5"
                            onClick={() => onSelectOne(item)}
                        >
                            {item instanceof Object && 'logoUrl' in item && item.logoUrl && (
                                <div className="flex aspect-square w-[36px] shrink-0 items-center justify-center rounded-full border bg-white p-0.5">
                                    <img src={item.logoUrl} alt={`logo ${item.name}`} className="object-contain" />
                                </div>
                            )}
                            <span className="mx-auto">{item.name}</span>
                        </Button>
                    </li>
                )
            })}
        </ul>
    )
}

export default CategoryBrandSelect
