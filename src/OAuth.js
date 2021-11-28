import React from 'react'
import Dashboard from './Dashboard'
import Authorize from './Authorize'

const code = new URLSearchParams(window.location.search).get("code")

export default function OAuth() {
    return (
        code ? <Dashboard code={code} /> : <Authorize />
    )
}
