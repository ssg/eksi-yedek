import { useState, useEffect } from 'react'
import { BackupEntry, BackupData } from '../xml.mts'
import { BackupHeader } from './BackupHeader'
import { SearchBox } from './SearchBox'
import { Entry } from './Entry'
import { DraftsSection } from './DraftsSection'

interface BackupReaderProps {
    backupData: BackupData | null
}

function matchesQuery(title: string, rawText: string, lowerQuery: string): boolean {
    return title.includes(lowerQuery) || rawText.includes(lowerQuery)
}

export function BackupReader({ backupData }: BackupReaderProps) {
    const [searchResetKey, setSearchResetKey] = useState(0)
    const [deferredQuery, setDeferredQuery] = useState('')

    useEffect(() => {
        setDeferredQuery('')
        setSearchResetKey(k => k + 1)
    }, [backupData])

    if (!backupData) {
        return null
    }

    const { nick, backupDate, entries, drafts } = backupData        

    const lowerQuery = deferredQuery.toLocaleLowerCase('tr')

    const filteredEntries = deferredQuery != ''
        ? entries.filter(e => matchesQuery(e.title, e.rawText, lowerQuery))
        : entries

    const filteredDrafts = deferredQuery != ''
        ? drafts.filter((d: any) => matchesQuery(d.title, d.rawText, lowerQuery))
        : drafts

    const noResults = !!deferredQuery && filteredEntries.length === 0 && filteredDrafts.length === 0

    return (
        <div id="reader">
            <div className="header-row">
                <BackupHeader nick={nick} backupDate={backupDate} />
                <SearchBox key={searchResetKey} onQueryChange={setDeferredQuery} />
            </div>

            <hr />

            {noResults ? (
                <p className="no-results">yok böyle bişii???</p>
            ) : (
                <>
                    {filteredEntries.map((entry, index) => (
                        <Entry
                            key={index}
                            title={entry.title}
                            id={entry.id}
                            date={entry.date}
                            deleted={entry.deleted}
                            nick={nick}
                            parsedContent={entry.parsedContent}
                            searchQuery={deferredQuery}
                        />
                    ))}

                    <DraftsSection drafts={filteredDrafts} nick={nick} searchQuery={deferredQuery} />
                </>
            )}
        </div>
    )
}
