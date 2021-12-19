import React from 'react'

const AlertMessage = ({info}) => {
    return info === null ? null :(
        <div className={`alert alert-${info.type} text-center`} role="alert">
            {info.message}
        </div>
    )
}

export default AlertMessage
