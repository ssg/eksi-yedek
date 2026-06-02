import React from 'react'
import { highlightText } from '../utils/highlight'
import { shortenUrlDisplay } from '../utils/shorten'

type ContentPart = string | string[] | {
    type: 'ara' | 'gbkz' | 'bkz' | 'abkz' | 'paragraph_break' | 'line_break' | 'url' | 'named_url' | 'entry_query' | 'raw_text'
    query?: string
    text?: string
    url?: string
    title?: string
    entry_id?: string
}

interface EntryContentProps {
    parts: ContentPart[]
    searchQuery?: string
}

export function EntryContent({ parts, searchQuery = '' }: EntryContentProps) {
    const hl = (text: string) => highlightText(text, searchQuery)
    return (
        <>
            {parts.map((part, index) => {
                if (typeof part === 'string') {
                    return <React.Fragment key={index}>{hl(part)}</React.Fragment>
                }
                
                // Handle array format from named_url parser (returns array, not object)
                if (Array.isArray(part)) {
                    return <React.Fragment key={index}>{hl(part.join(''))}</React.Fragment>
                }

                switch (part.type) {
                    case 'ara':
                        return (
                            <React.Fragment key={index}>
                                (ara: <a href={`https://eksisozluk.com/basliklar/ara?searchform.keywords=${encodeURIComponent(part.query!)}`}>
                                    {hl(part.query!)}
                                </a>)
                            </React.Fragment>
                        )

                    case 'gbkz':
                        return (
                            <a key={index} href={`https://eksisozluk.com/?q=${encodeURIComponent(part.query!)}`}>
                                {hl(part.query!)}
                            </a>
                        )
                    
                    case 'bkz':
                        return (
                            <React.Fragment key={index}>
                                (bkz: <a href={`https://eksisozluk.com/?q=${encodeURIComponent(part.query!)}`}>
                                    {hl(part.query!)}
                                </a>)
                            </React.Fragment>
                        )
                    
                    case 'abkz':
                        return (
                            <React.Fragment key={index}>
                                {hl(part.text!)}
                                <sup>(<a href={`https://eksisozluk.com/?q=${encodeURIComponent(part.query!)}`}>
                                    {hl(part.query!)}
                                </a>)</sup>
                            </React.Fragment>
                        )
                    
                    case 'paragraph_break':
                        return (
                            <React.Fragment key={index}>
                                <br /><br />
                            </React.Fragment>
                        )
                    
                    case 'line_break':
                        return <br key={index} />
                    
                    case 'url':
                        return (
                            <a key={index} href={encodeURI(part.url!)} target="_blank" rel="noopener noreferrer">
                                {hl(shortenUrlDisplay(part.url!))}
                            </a>
                        )
                    
                    case 'named_url':
                        return (
                            <a key={index} href={encodeURI(part.url!)} target="_blank" rel="noopener noreferrer"  title={part.url!}>
                                {hl(part.title!)}
                            </a>
                        )

                    case 'entry_query':
                        return (
                            <a key={index} href={`https://eksisozluk.com/entry/${encodeURIComponent(part.entry_id!)}`}>
                                {hl(`#${part.entry_id}`)}
                            </a>
                        )
                    
                    case 'raw_text': 
                        return <React.Fragment key={index}>{hl(part.text!)}</React.Fragment>
                        
                    default:
                        console.error('unknown part type', (part as any).type)
                        return null
                }
            })}
        </>
    )
}
