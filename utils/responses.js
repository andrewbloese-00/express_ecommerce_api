exports.resError =  ( res , code , msg) => {
    res.status(code).json({ msg: msg })
}