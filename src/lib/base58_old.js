var b58map = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

function b58decode(src) {
    var base = 58;
    var len = src.length;
    if (len == 0) {
      return 0;
    }
    
    var num = 0;
    for (var i = len - 1; i >= 0; i--) {   
      var idx = b58map.indexOf(src[i]);
      
      if (idx < 0) {
        throw "illegal base58 at input byte " + i.toString();
      }
      num += idx * Math.pow(base, len - 1 - i);
    }
    
    return num;
}

function b58encode(num) {
    if (num == 0) {
      return b58map[0];
    }

    var  base = 58;
    var ret = new Array();
    while (num > 0) {
      var m = num % base;
      num = ~~(num / base);
      ret.push(b58map[m]);
    }

    return ret.reverse().join("");
}
