/**
 * parseTime(new Date(), '{m}-{d} {h}:{i}')
 * parseTime(new Date(), '{y}-{m}-{d}')
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// url读取参数
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) != null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  },
  {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function createUniqueString () {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

//将base64转换为文件
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

/**
 * 在各浏览器中,使用 window.btoa 对Unicode字符串进行编码都会触发一个字符越界的异常.
 * 先把Unicode字符串转换为UTF-8编码,可以解决这个问题
 */
export function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

export function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

export var canvasHelper = {
  _getImageType: function _getImageType(str) {
    var mimeType = 'image/jpeg';
    var outputType = str.match(/(image\/[\w]+)\.*/)[0];
    if (typeof outputType !== 'undefined') {
      mimeType = outputType;
    }
    return mimeType;
  },
  compress: function compress(src, quality, callback) {
    var reader = new FileReader();
    var self = this;
    reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result;
      image.onload = function () {
        var mimeType = self._getImageType(src.type);
        var cvs = self._getCanvas(image.naturalWidth, image.naturalHeight);
        var ctx = cvs.getContext("2d").drawImage(image, 0, 0);
        var newImageData = cvs.toDataURL(mimeType, quality / 100);
        callback(newImageData);
      };
    };
    reader.readAsDataURL(src);
  },

  /**
  * crop image via canvas and generate data
  **/
  crop: function crop(image, options, callback) {
    var checkNumber = function checkNumber(num) {
      return typeof num === 'number';
    };
    // check crop options
    if (checkNumber(options.toCropImgX) && checkNumber(options.toCropImgY) && options.toCropImgW > 0 && options.toCropImgH > 0) {
      var w = options.toCropImgW;
      var h = options.toCropImgH;
      if (options.maxWidth && options.maxWidth < w) {
        w = options.maxWidth;
        h = options.toCropImgH * w / options.toCropImgW;
      }
      if (options.maxHeight && options.maxHeight < h) {
        h = options.maxHeight;
      }
      var cvs = this._getCanvas(w, h);
      var ctx = cvs.getContext('2d').drawImage(image, options.toCropImgX, options.toCropImgY, options.toCropImgW, options.toCropImgH, 0, 0, w, h);
      var mimeType = this._getImageType(image.src);
      var data = cvs.toDataURL(mimeType, options.compress / 100);
      callback(data);
    }
  },
  resize: function resize(image, options, callback) {
    var checkNumber = function checkNumber(num) {
      return typeof num === 'number';
    };
    if (checkNumber(options.toCropImgX) && checkNumber(options.toCropImgY) && options.toCropImgW > 0 && options.toCropImgH > 0) {
      var w = options.toCropImgW * options.imgChangeRatio;
      var h = options.toCropImgH * options.imgChangeRatio;
      var cvs = this._getCanvas(w, h);
      var ctx = cvs.getContext('2d').drawImage(image, 0, 0, options.toCropImgW, options.toCropImgH, 0, 0, w, h);
      var mimeType = this._getImageType(image.src);
      var data = cvs.toDataURL(mimeType, options.compress / 100);
      callback(data);
    }
  },
  rotate: function rotate(src, degrees, callback) {
    var _this = this;
    this._loadImage(src, function (image) {
      var w = image.naturalWidth;
      var h = image.naturalHeight;
      var canvasWidth = Math.max(w, h);
      var cvs = _this._getCanvas(canvasWidth, canvasWidth);
      var ctx = cvs.getContext('2d');
      ctx.translate(canvasWidth / 2, canvasWidth / 2);
      ctx.rotate(degrees * (Math.PI / 180));
      var x = -canvasWidth / 2;
      var y = -canvasWidth / 2;
      degrees = degrees % 360;
      if (degrees === 0) {
        return callback(src, w, h);
      }
      var sx = 0;
      var sy = 0;
      if ((degrees % 180) !== 0) {
        if (degrees === -90 || degrees === 270) {
          x = -w + canvasWidth / 2;
        } else {
          y = canvasWidth/2 - h;
        }
        const c = w;
        w = h;
        h = c;
      } else {
        x = canvasWidth/2 - w;
        y = canvasWidth/2 - h;
      }
      ctx.drawImage(image, x, y);
      var cvs2 = _this._getCanvas(w, h);
      var ctx2 = cvs2.getContext('2d');
      ctx2.drawImage(cvs, 0, 0, w, h, 0, 0, w, h);
      var mimeType = _this._getImageType(image.src);
      var data = cvs2.toDataURL(mimeType, 1);
      callback(data, w, h);
    });
  },
  _loadImage: function _loadImage(data, callback) {
    var image = new Image();
    image.src = data;
    image.onload = function () {
      callback(image);
    };
    image.onerror = function () {
      console.log('Error: image error!');
    };
  },
  _getCanvas: function _getCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
};