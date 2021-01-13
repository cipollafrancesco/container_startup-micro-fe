import React from 'react'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import {BrowserRouter} from 'react-router-dom'

export default () => {
    return (
        <BrowserRouter>
            <>
                {/* CONTAINER COMPONENT HEADER*/}
                <Header/>
                {/* MARKETING APP (contains Marketing Micro-FE)*/}
                <MarketingApp/>
            </>
        </BrowserRouter>
    )
}