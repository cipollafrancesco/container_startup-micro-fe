import React from 'react'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import {BrowserRouter} from 'react-router-dom'
import {createGenerateClassName, StylesProvider} from '@material-ui/core'

// AVOID classNames Collisions
const generateClassName = createGenerateClassName({
    productionPrefix: 'container'
})

export default () => {
    return (
        <StylesProvider generateClassName={generateClassName}>
            <BrowserRouter>
                <>
                    {/* CONTAINER COMPONENT HEADER*/}
                    <Header/>
                    {/* MARKETING APP (contains Marketing Micro-FE)*/}
                    <MarketingApp/>
                </>
            </BrowserRouter>
        </StylesProvider>
    )
}