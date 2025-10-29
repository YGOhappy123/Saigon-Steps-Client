import { twMerge } from 'tailwind-merge'
import { Quote } from 'lucide-react'

type QuoteBoxProps = {
    content: string
    reverseColors?: boolean
}

const QuoteBox = ({ content, reverseColors = false }: QuoteBoxProps) => {
    return (
        <div
            className={twMerge(
                'relative mt-1 w-fit rounded px-9 py-4',
                reverseColors ? 'bg-muted-foreground' : 'bg-muted'
            )}
        >
            <span
                className={twMerge(
                    'text-lg font-medium italic',
                    reverseColors ? 'text-muted' : 'text-muted-foreground'
                )}
            >
                {content}
            </span>
            <Quote
                className={twMerge(
                    'absolute top-2 right-2 rotate-180 rotate-y-180',
                    reverseColors ? 'text-muted/50' : 'text-muted-foreground/50'
                )}
                size={20}
            />
            <Quote
                className={twMerge(
                    'absolute top-2 left-2 rotate-y-180',
                    reverseColors ? 'text-muted/50' : 'text-muted-foreground/50'
                )}
                size={20}
            />
        </div>
    )
}

export default QuoteBox
