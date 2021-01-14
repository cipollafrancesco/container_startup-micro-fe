import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react'
import Header from './components/Header'
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import {createGenerateClassName, StylesProvider} from '@material-ui/core'
import Progress from './components/Progress'
import {createBrowserHistory} from 'history'

// AVOID classNames Collisions
const generateClassName = createGenerateClassName({
    productionPrefix: 'container'
})

// LAZY LOADED MICRO-FE
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'))
const AuthAppLazy = lazy(() => import('./components/AuthApp'))
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'))

// APP BROWSER HISTORY
const history = createBrowserHistory()

export default () => {

    // USER SIGNED IN FLAG
    const [isSignedIn, setIsSignedIn] = useState(false)

    // MARK USER AS SIGNED IN
    const handleUserSignIn = useCallback(() => setIsSignedIn(true), [setIsSignedIn])
    const handleUserSignOut = useCallback(() => setIsSignedIn(false), [setIsSignedIn])

    useEffect(() => {
        isSignedIn && history.push('/dashboard')
    }, [isSignedIn])

    return (
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Header isSignedIn={isSignedIn} onSignOut={handleUserSignOut}/>
                <Suspense fallback={<Progress/>}>
                    <Switch>

                        {/* AUTH Micro-Fe */}
                        <Route path="/auth">
                            <AuthAppLazy onSignIn={handleUserSignIn}/>
                        </Route>

                        {/* DASHBOARD Micro-Fe */}
                        <Route path="/dashboard">
                            {/* IF USER IS NOT SIGNED IN */}
                            {!isSignedIn && <Redirect to='/'/>}
                            <DashboardAppLazy/>
                        </Route>

                        {/* MARKETING Micro-Fe */}
                        <Route path="/" component={MarketingAppLazy}/>

                    </Switch>
                </Suspense>
            </Router>
        </StylesProvider>
    )
}