export default setToValue = (obj, val, path) => {
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
      if(obj[path[i]]) obj = obj[path[i]]
      else return obj[path[i]];
    };
    obj = val;
};
