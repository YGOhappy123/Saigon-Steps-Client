import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'
import HeroBanner from '@/pages/OurServicesPage/HeroBanner'
import ServicesList from '@/pages/OurServicesPage/ServicesList'
import BrandsDisplay from '@/components/layout/BrandsDisplay'

const OurServicesPage = () => {
    useTitle('Saigon Steps | Dịch vụ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <HeroBanner />
            <BrandsDisplay />
            <ServicesList />
        </>
    )
}

export default OurServicesPage
