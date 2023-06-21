import React from 'react'

export const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div>
                        <a href='/gateway' className='navbar-brand'>Gateways</a>
                    </div>
                    <div>
                        <a href='/device' className='navbar-brand'>Devices</a>
                    </div>
                </nav>
            </header>
        </div>
      )
}

export default HeaderComponent;