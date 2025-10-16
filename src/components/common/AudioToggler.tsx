import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAudioContext } from '@/components/container/AudioProvider'

const AudioToggler = () => {
    const { enableAudio, toggleEnableAudio } = useAudioContext()

    return (
        <Button variant="ghost" size="icon" onClick={toggleEnableAudio}>
            {enableAudio === 'off' ? <Volume2 /> : <VolumeX />}
        </Button>
    )
}

export default AudioToggler
