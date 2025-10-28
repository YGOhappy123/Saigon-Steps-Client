import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'
import HeroBanner from '@/pages/AboutUsPage/HeroBanner'
import OurStory from '@/pages/AboutUsPage/OurStory'
import MissionAndVision from '@/pages/AboutUsPage/MissionAndVision'
import ShoppingExperience from '@/pages/AboutUsPage/ShoppingExperience'
import BrandsDisplay from '@/components/layout/BrandsDisplay'

const AboutUsPage = () => {
    useTitle('Saigon Steps | Giới thiệu')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <HeroBanner />
            <BrandsDisplay />
            <OurStory />
            <ShoppingExperience />
            <MissionAndVision />
        </>
    )
}

export default AboutUsPage
