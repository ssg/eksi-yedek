// Makes the relative path portion of the given URL suitable for display when it's too long.
// Returns a string that trims the beginning of the relative path and shows a trailing portion of it.
export function shortenUrlDisplay(url: string): string {
    const maxRelativeLength = 30
    try {
        const { origin, pathname, search, hash } = new URL(url)
        const relativeUrl = pathname + search + hash
        const relativeUrlNoPrefix = relativeUrl.slice(1)
        if (relativeUrlNoPrefix.length > maxRelativeLength) {
            const lastPart = relativeUrlNoPrefix.slice(-maxRelativeLength)
            return `${origin}/…${lastPart}`
        }
        return url
    } catch {
        return url
    }
}