import React, {lazy, Suspense, useCallback, useState} from 'react'
import Header from './components/Header'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {createGenerateClassName, StylesProvider} from '@material-ui/core'
import Progress from './components/Progress'

// AVOID classNames Collisions
const generateClassName = createGenerateClassName({
    productionPrefix: 'container'
})

// LAZY LOADED MICRO-FE
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'))
const AuthAppLazy = lazy(() => import('./components/AuthApp'))

export default () => {

    // USER SIGNED IN FLAG
    const [isSignedIn, setIsSignedIn] = useState(false)

    // MARK USER AS SIGNED IN
    const handleUserSignIn = useCallback(() => setIsSignedIn(true), [setIsSignedIn])
    const handleUserSignOut = useCallback(() => setIsSignedIn(false), [setIsSignedIn])

    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <Header isSignedIn={isSignedIn} onSignOut={handleUserSignOut}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>
                        {/* AUTH APP */}
                        <Route path="/auth">
                            <AuthAppLazy onSignIn={handleUserSignIn}/>
                        </Route>

                        {/* MARKETING APP (contains Marketing Micro-FE)*/}
                        <Route path="/" component={MarketingAppLazy}/>
                    </Switch>
                </Suspense>
            </BrowserRouter>
        </StylesProvider>
    )
}