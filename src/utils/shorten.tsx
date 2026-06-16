// Makes the relative path portion of the given URL suitable for display when it's too long.
// Returns a string that trims the beginning of the relative path and shows a trailing portion of it.
export function shortenUrlDisplay(url: string): string {
    const maxUrlLength = 50;

    if (url.length <= maxUrlLength) {
        return url
    }

    try {
        const { origin } = new URL(url);
        const baseUrl = origin + "/";
        const shortenLength = maxUrlLength - baseUrl.length;
        const shortened = shortenLength > 0 ? url.slice(-shortenLength) : "";
        return `${baseUrl}…${shortened}`;
    } catch {
        return url
    }
}

export function shortenUrlInfo(url: string): { display: string; title: string | undefined } {
    const display = shortenUrlDisplay(url)
    return {
        display,
        title: display !== url ? url : undefined,
    }
}