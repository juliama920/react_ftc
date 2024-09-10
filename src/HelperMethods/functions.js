
const addStyles = (status) => {
    if (status === 'OK'){
        return 'status-banner success'
    } else if (status === 'ECM Offline'){
        return 'status-banner error'
    } else if (status === 'ERROR') {
        return 'status-banner error'
    }
}

export default addStyles;