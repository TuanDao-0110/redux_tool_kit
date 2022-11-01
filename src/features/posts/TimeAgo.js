import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'
export default function TimeAgo({ timestamp }) {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod}`
    }
    return (
        <span title='timestamps'>
            &nbsp; 
           ----- <i>{timeAgo}</i>
        </span>
    )
}
