import { useState } from 'react'
import ThreeDimensionalCanvas from '@/pages/HomePage/ThreeDimensionalCanvas'
import ThreeDimensionalOverlay from '@/pages/HomePage/ThreeDimensionalOverlay'

const ThreeDimensionalShoeModel = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative" style={{ height: 'calc(100vh - 136px)' }}>
            <ThreeDimensionalCanvas open={open} setOpen={setOpen} />
            <ThreeDimensionalOverlay open={open} />
        </div>
    )
}

export default ThreeDimensionalShoeModel
