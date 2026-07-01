import { useState, useRef } from 'react'

interface SearchBoxProps {
    onQueryChange: (query: string) => void
}

export function SearchBox({ onQueryChange }: SearchBoxProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const [_, setHasValue] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value
        setHasValue(!!val)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => onQueryChange(val), 200)
    }

    return (
        <input
            id="searchbox"
            type="search"
            placeholder="ara..."
            ref={inputRef}
            autoFocus
            onChange={handleChange}
        />
    )
}
