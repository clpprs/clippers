import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// import classNames from 'classnames'

import '@fontsource/roboto'
import '@fontsource/roboto-mono'

import Navbar from './Navbar'
// import SelectedTag from './Components/SelectedTag'
import Tag from './Components/Tag'

function App(props) {
    return (<div className='h-screen'>
        <Navbar></Navbar>
        <div className='flex h-full bg-neutral-200'>
            <div className='flex flex-col w-1/3 bg-neutral-350'></div>
        </div>
    </div>)
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);