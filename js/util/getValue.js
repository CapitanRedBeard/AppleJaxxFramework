export default getValue = (obj, path) => {
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
      if(obj[path[i]]) obj = obj[path[i]]
      else return obj[path[i]];
    };
    return obj;
};
