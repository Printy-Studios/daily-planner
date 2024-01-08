import { PropsWithChildren, ReactNode } from 'react';

export type PageProps = {
    headerLeft?: ReactNode
    headerRight?: ReactNode
    headerColor?: string
    pageState: {
        error: string | null | boolean,
        loading: string | null | boolean
    }
}

export default function Page({ 
    children, 
    headerLeft, 
    headerRight,
    headerColor,
    pageState 
}: PropsWithChildren<PageProps>) {
    return (
        <div
            className='flex flex-col h-full page'
            
        >
            {headerLeft || headerRight ? 
                <div 
                    className='flex w-full border-bottom-gray-dark justify-between p-s header'
                    style={{
                        backgroundColor: headerColor
                    }}
                >
                    <div>
                        {headerLeft}
                    </div>
                    <div>
                        {headerRight}
                    </div>
                    
                    
                </div>
            : null}
            <div className='flex flex-col flex-grow p-s gap-m page-content'>
                {
                    pageState.error ? "An error has occured" + (typeof pageState.error === 'string' ? pageState.error : "")
                :
                    pageState.loading ? (typeof pageState.loading === 'string' ? pageState.loading : "Loading")
                :
                    children
                }
            </div>
            
        </div>
    )
}