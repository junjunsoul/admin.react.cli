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
export async function asyncPost(type, param = {}, dispatch) {
    return new Promise(resolve => {
        dispatch({
            type,
            payload: {
                ...param
            },
            callback: (res) => {
                resolve(res)
            }
        })
    })
}
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
export function randomWord(length) {
    var str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (var i = 0; i < length; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}