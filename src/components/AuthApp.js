import React, {useEffect, useRef} from 'react'
import {mount} from 'auth/AuthApp'
import {useHistory} from 'react-router-dom'

/**
 * Creating a component with a referenced div
 * @label Generic Pattern
 * @return {JSX.Element}
 */
export default ({onSignIn}) => {
    const ref = useRef(null)
    const history = useHistory()

    /**
     * Container's navigation notifier callback
     * @label SYNC STEP
     */
    const onNavigate = ({pathname: nextPathname}) => {
        // console.log('[Auth] UPDATING PATHNAME', nextPathname)
        history.location.pathname !== nextPathname && // avoid infinite notification loop
        history.push(nextPathname) // navigate to the right micro-fe
    }

    useEffect(() => {

        const mountOptions = {
            onNavigate,
            initialPath: history.location.pathname,
            onSignIn,
        }

        // Mounting Auth app to current element by passing Ref
        const {onParentNavigate} = mount(ref.current, mountOptions)

        // Handle BrowserHistory navigation listener
        history.listen(onParentNavigate)
    }, [])

    return <div ref={ref}/>
}