import { useEffect, useState } from 'react'

const keyStrokeSounds = [
    new Audio('/audios/keystroke1.mp3'),
    new Audio('/audios/keystroke2.mp3'),
    new Audio('/audios/keystroke3.mp3'),
    new Audio('/audios/keystroke4.mp3')
]

export const useAudio = () => {
    const [enableAudio, setEnableAudio] = useState<'on' | 'off'>(() => {
        return (localStorage.getItem('enableSound') as 'on' | 'off') || 'on'
    })

    useEffect(() => {
        localStorage.setItem('enableSound', enableAudio)
    }, [enableAudio])

    const toggleEnableAudio = () => {
        setEnableAudio(prev => (prev === 'on' ? 'off' : 'on'))
    }

    const playRandomKeyStrokeSound = () => {
        if (enableAudio === 'off') return

        const randomIndex = Math.floor(Math.random() * keyStrokeSounds.length)
        const randomSound = keyStrokeSounds[randomIndex]
        randomSound.currentTime = 0
        randomSound.play().catch(() => {})
    }

    return { enableAudio, toggleEnableAudio, playRandomKeyStrokeSound }
}
