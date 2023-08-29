const storage_prefix = '@daily-planner/'

export default function useStorage() {

    const getStorageItem = (key: string) => {
        const item = localStorage.getItem(storage_prefix + key)

        if (item) {
            return JSON.parse(item)
        }

        return null
    }

    const setStorageItem = (key: string, data: any) => {
        localStorage.setItem(storage_prefix + key, JSON.stringify(data))
    }

    return {
        getStorageItem,
        setStorageItem
    }
}