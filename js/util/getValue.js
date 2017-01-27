export default getValue = (obj, path, fallback) => {
    path = String(path).replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, '');           // strip a leading dot
    var arr = path.split('.');
    for (var i = 0, length = arr.length; i < length; ++i) {
        var key = arr[i];
        if (!_.isObject(obj) || !(key in obj)) {
            return fallback;
        }
        obj = obj[key];
    }
    return obj;
};
