export const delay = ms => new Promise((resolve) => {
    setTimeout(resolve, ms)
})

export const filterUndefined =
    obj =>
        obj ? Object
                .entries(obj)
                .filter(([k, v]) => v)
                .map(([k, v]) => ({[k]: v}))
                .concat({})
                .reduce((res, last) => Object.assign(res, last))
            : {}

export const formatISODate =
    ISODate =>
        ISODate ? new Intl.DateTimeFormat('zn-CH')
                .format(new Date(ISODate.toString()))
                .replace(/\//g, '-')
            : ''

export const formatISODateTime =
    ISODate =>
        ISODate ? new Date(ISODate.toString())
                .toLocaleString('zn-CH', {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                    hour12: false
                })
                .replace(/\//g, '-')
            : ''


export const uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a => (a ^ Math.random() * 16 >> a / 4).toString(16))