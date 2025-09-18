import slugify from 'slugify'
import slugifyConfig from '@/configs/slugify'

export const getProductSlug = (productName: string, productId: number) => {
    const slug = slugify(productName, slugifyConfig)

    return `${slug}-p${productId}.html`
}

export const getProductIdFromSlug = (slug: string) => {
    if (!slug) return null
    if (!slug.endsWith('.html')) return slug

    const temp1 = slug.split('.html')
    const temp2 = temp1[0].split('-')

    if (!temp2[temp2.length - 1].startsWith('p')) return slug
    return temp2[temp2.length - 1].substring(1)
}
