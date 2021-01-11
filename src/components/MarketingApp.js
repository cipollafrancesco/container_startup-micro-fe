import React, {useEffect, useRef} from 'react'
import {mount} from 'marketing/MarketingApp'

/**
 * Creating a component with a referenced div
 * @label Generic Pattern
 * @return {JSX.Element}
 */
export default () => {
    const ref = useRef(null)

    useEffect(() => {
        // Mounting Marketing app to current element by passing Ref
        mount(ref.current)
    }, [])

    return <div ref={ref}/>
}