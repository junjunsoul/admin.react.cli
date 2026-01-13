import dayjs from 'dayjs'
const typeOf = obj => {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    return map[toString.call(obj)];
};
function loopColunm(columns) {
    let col = [];
    columns.map(item => {
        if (item.children) {
            col.push(...loopColunm(item.children));
        } else {
            col.push(item);
        }
    });
    return col;
}
export function sumBy(list, key) {
    let sum = 0
    let isFloat = false
    list.forEach((item) => {
        let value = item[key]
        if (!isFloat && /(-)|[0-9]+\.[0-9]+$/.test(value)) {
            isFloat = true
        }
        let n = parseInt(value * 100)
        if (n) {
            sum += n
        }
    })

    if (isFloat) {
        if (sum) {
            return (sum / 100).toFixed(2)
        } else {
            return sum.toFixed(2)
        }
    } else {
        if (sum) {
            return sum / 100
        } else {
            return 0
        }
    }
}
export function totalHandle(data, columns) {
    const col = loopColunm(columns);
    let total = {};
    col.forEach(row => {
        if (row.total) {
            let value = sumBy(data, row.field);
            if (value && (value + '').indexOf('.') > -1) {
                value = Number(value).toFixed(2)
            }
            total[row.field] = value
        }
    });
    return total;
}
export function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }
    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

export function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
export function getFileExtension(path) {
    if (!path) return '';
    const cleanPath = path.split('?')[0];
    const lastDotIndex = cleanPath.lastIndexOf('.');
    if (lastDotIndex === -1) return '';
    const extension = cleanPath.substring(lastDotIndex + 1).toLowerCase();
    return /^[a-z0-9]+$/.test(extension) ? extension : '';
}
export async function downloadMedia(url, filename = null) {
    try {
        // 使用 fetch 获取响应
        const response = await fetch(`${url}?time=${new Date().getTime()}`);

        if (!response.ok) {
            throw new Error(`下载失败: ${response.status} ${response.statusText}`);
        }

        // 将响应转换为 Blob
        const blob = await response.blob();

        // 生成下载文件名
        if (!filename) {
            const urlParts = url.split('/');
            filename = urlParts[urlParts.length - 1] || 'download'; // 从 URL 提取文件名
        } else {
            filename = filename + '.' + getFileExtension(url)
        }

        // 创建临时 Blob URL 并触发下载
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link); // 临时添加到 DOM
        link.click();
        document.body.removeChild(link); // 移除链接
        URL.revokeObjectURL(blobUrl); // 释放内存

        console.log(`下载成功: ${filename}`);
    } catch (error) {
        console.error('下载错误:', error);
        throw error;
    }
}

export function randomWord(length) {
    var str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (var i = 0; i < length; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
export function AutoResizeImage(maxWidth, maxHeight, objImg, callback) {
    var img = new Image();
    img.src = objImg.src;
    img.onload = (event) => {
        var hRatio;
        var wRatio;
        var Ratio = 1;
        var w = img.width;
        var h = img.height;
        wRatio = maxWidth / w;
        hRatio = maxHeight / h;
        if (maxWidth == 0 && maxHeight == 0) {
            Ratio = 1;
        } else if (maxWidth == 0) { //
            if (hRatio < 1) Ratio = hRatio;
        } else if (maxHeight == 0) {
            if (wRatio < 1) Ratio = wRatio;
        } else if (wRatio < 1 || hRatio < 1) {
            Ratio = (wRatio <= hRatio ? wRatio : hRatio);
        }
        if (Ratio < 1) {
            w = w * Ratio;
            h = h * Ratio;
        }
        objImg.height = h;
        objImg.width = w;
        if (callback) {
            callback(objImg)
        } else {
            objImg.style.display = 'inline-block';
        }
    }
    img.onerror = (event) => {
        if (callback) callback(true, event)
    }
}
export function ResizeImage(maxWidth, maxHeight, url) {
    return new Promise(resolve => {
        var img = new Image();
        img.src = url;
        img.onload = (event) => {
            var hRatio;
            var wRatio;
            var Ratio = 1;
            var w = img.width;
            var h = img.height;
            wRatio = maxWidth / w;
            hRatio = maxHeight / h;
            if (maxWidth == 0 && maxHeight == 0) {
                Ratio = 1;
            } else if (maxWidth == 0) { //
                if (hRatio < 1) Ratio = hRatio;
            } else if (maxHeight == 0) {
                if (wRatio < 1) Ratio = wRatio;
            } else if (wRatio < 1 || hRatio < 1) {
                Ratio = (wRatio <= hRatio ? wRatio : hRatio);
            }
            if (Ratio < 1) {
                w = w * Ratio;
                h = h * Ratio;
            }
            resolve({ h, w, width: img.width, height: img.height })
        }
        img.onerror = (event) => {
            resolve(false)
        }
    })
}
export const AutoResize = (maxWidth, maxHeight, width, height) => {
    var hRatio;
    var wRatio;
    var Ratio = 1;
    var w = width;
    var h = height;
    wRatio = maxWidth / w;
    hRatio = maxHeight / h;
    if (maxWidth == 0 && maxHeight == 0) {
        Ratio = 1;
    } else if (maxWidth == 0) { //
        if (hRatio < 1) Ratio = hRatio;
    } else if (maxHeight == 0) {
        if (wRatio < 1) Ratio = wRatio;
    } else if (wRatio < 1 || hRatio < 1) {
        Ratio = (wRatio <= hRatio ? wRatio : hRatio);
    }
    if (Ratio < 1) {
        w = w * Ratio;
        h = h * Ratio;
    }
    return { height: h, width: w }
}
export const DateRange = [
    { label: '今天', value: [dayjs(), dayjs()] },
    { label: '昨日', value: [dayjs().subtract(1, 'days'), dayjs().subtract(1, 'days')] },
    { label: '最近3日', value: [dayjs().subtract(2, 'days'), dayjs()] },
    { label: '最近7日', value: [dayjs().subtract(6, 'days'), dayjs()] },
    { label: '最近30日', value: [dayjs().subtract(29, 'days'), dayjs()] },
    { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
    {
        label: '上月', value: [
            dayjs()
                .subtract(1, 'month')
                .startOf('month'),
            dayjs()
                .subtract(1, 'month')
                .endOf('month'),
        ]
    },
]