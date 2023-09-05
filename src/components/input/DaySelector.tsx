import IconButton from 'components/buttons/IconButton'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'


function isYesterday(date: Date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (yesterday.toDateString() === date.toDateString()) {
      return true;
    }
  
    return false;
}

function isToday(date: Date) {
    const today = new Date();
  
    if (today.toDateString() === date.toDateString()) {
      return true;
    }
  
    return false;
}

function isTomorrow(date: Date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    if (tomorrow.toDateString() === date.toDateString()) {
      return true;
    }
  
    return false;
  }

type DaySelectorProps = {
    onChange: (day: Date) => void
    value: Date
}

export default function DaySelector( { value, onChange }: DaySelectorProps) {

    const handleRightArrowClick = () => {
        const tomorrow = new Date()
        tomorrow.setDate(value.getDate() + 1)
        onChange(tomorrow)
    }

    const handleLeftArrowClick = () => {
        const yesterday = new Date()
        yesterday.setDate(value.getDate() - 1)
        onChange(yesterday)
    }

    return(
        <div
            className='step-selector'
        >
            <IconButton
                icon={
                    <ChevronLeftIcon
                        className='icon icon-secondary'
                    />
                }
                onClick={handleLeftArrowClick}
            />
            <div className='column-list'>
                <span>
                    { value.toLocaleDateString('en-us', {
                        month: 'long',
                        day: 'numeric'
                    })}
                </span>
                <span className='extra-text'>
                    { 
                        isToday(value) ? 
                        'Today' :
                        isTomorrow(value) ?
                        'Tomorrow' :
                        isYesterday(value) ?
                        'Yesterday' :
                        ''
                    }
                </span>
                
            </div>
                
            <IconButton
                icon={
                    <ChevronRightIcon
                        className='icon icon-secondary'
                    />
                }
                onClick={handleRightArrowClick}
            />
        </div>
    )
}