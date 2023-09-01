import { createContext } from 'react';

import MiscState from 'types/MiscState';

const MiscContext = createContext<{
    miscState: MiscState,
    updateMiscState: (updated_misc_state: Partial<MiscState>) => void
}>({
    miscState: {
        selectedDate: new Date()
    },
    updateMiscState: (updated_misc_state: Partial<MiscState>) => {}
})

export default MiscContext