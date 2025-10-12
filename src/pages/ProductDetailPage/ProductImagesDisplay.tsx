type ProductImagesDisplayProps = {
    activeImage: string | undefined
    imageAlt: string
    allImages: string[]
    setActiveImage: (value: string) => void
}

const ProductImagesDisplay = ({ activeImage, imageAlt, allImages, setActiveImage }: ProductImagesDisplayProps) => {
    return (
        <div className="mx-auto flex w-full max-w-[616px] items-start gap-4">
            <div className="no-scrollbar flex h-full max-h-[500px] shrink-0 flex-col items-center justify-start gap-4 overflow-y-auto">
                {allImages.map((url, index) => (
                    <div
                        key={index}
                        className="aspect-square w-[100px] shrink-0 cursor-pointer rounded-lg bg-cover p-2"
                        style={{
                            backgroundImage: 'url(/images/shoe-vector-background.jpg)'
                        }}
                        onClick={() => setActiveImage(url)}
                    >
                        <img src={url} alt={imageAlt} className="h-full w-full rounded-lg object-contain select-none" />
                    </div>
                ))}
            </div>

            <div
                className="aspect-square rounded-lg bg-cover p-4"
                style={{
                    backgroundImage: 'url(/images/shoe-vector-background.jpg)'
                }}
            >
                <img src={activeImage} alt={imageAlt} className="h-full w-full rounded-lg object-contain" />
            </div>
        </div>
    )
}

export default ProductImagesDisplay
