import { PropsWithChildren, ReactNode } from 'react';

type Props = {
    headerLeft?: ReactNode
    headerRight?: ReactNode
}

export default function Page({ children, headerLeft, headerRight }: PropsWithChildren<Props>) {
    return (
        <div
            className='flex flex-col h-full page'
        >
            {headerLeft || headerRight ? 
                <div className='flex w-full border-bottom-gray-dark justify-between p-s header'>
                    <div>
                        {headerLeft}
                    </div>
                    <div>
                        {headerRight}
                    </div>
                    
                    
                </div>
            : null}
            <div className='flex flex-col flex-grow p-s gap-m page-content'>
                {children}
            </div>
            
        </div>
    )
}