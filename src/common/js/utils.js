/**
 * 解析URL参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(window) {
    var url = '';
    if (window && window.location && window.location.search) {
        url = window.location.search;
    }
    var obj = {};
    var reg = /[?&][^?&]+=[^?&]+/g;
    var arr = url.match(reg);

    if (arr) {
        arr.forEach(function (item) {
            var tempArr = item.substring(1).split('=');
            var key = decodeURIComponent(tempArr[0]);
            var value = decodeURIComponent(tempArr[1]);
            obj[key] = value;
        });
    }
    return obj;
};

export function formateMile(mile) {
    if (mile > 1000) {
        mile = (mile / 1000).toFixed(2) + '公里';
    } else {
        mile = mile + '米';
    }
    return mile;
};

export function formateDirection(alpha) {
    /*let directions = {
     'NNE': '北北东',
     'NE': '北东',
     'ENE': '东北东',
     'E': '正东',
     'ESE': '东南东',
     'SE': '南东',
     'SSE': '南南东',
     'S': '正南',
     'SSW': '南南西',
     'SW': '南西',
     'WSW': '西南西',
     'W': '正西',
     'WNW': '西北西',
     'NW': '北西',
     'NNW': '北北西',
     'N': '正北'
     };*/

    /**
     * 方案1.在原有基础上改
     */
    // let directions = {
    //     'NNE': '前',
    //     'NE': '右前',
    //     'ENE': '右前',
    //     'E': '右',
    //     'ESE': '右',
    //     'SE': '右后',
    //     'SSE': '右后',
    //     'S': '后',
    //     'SSW': '后',
    //     'SW': '左后',
    //     'WSW': '左后',
    //     'W': '左',
    //     'WNW': '左',
    //     'NW': '左前',
    //     'NNW': '左前',
    //     'N': '前'
    // };

    /**
     * 方案2.写个合适的算法
     * 如何让文案显示'前后左右'？
     * 可以计算当前手机指向的直线与当前位置连接目标位置的直线之间的夹角alpha
     * 判断alpha度数在哪个范围
     * [337.5,22.5) => (前)
     * [22.5,67.5) => (右前)
     * [67.5,112.5) => (右)
     * [112.5,157.5) => (右后)
     * [157.5,202.5) => (后)
     * [202.5,247.5) => (左后)
     * [247.5,292.5) => (左)
     * [292.5,337.5) => (左前)
     * 问题1.如何得到当前手机指向？
     * 问题2.目标与当前之间连线
     * 问题3.它们两条直线之间的夹角如何计算
     */

    let directions = ['前', '右前', '右', '右后', '后', '左后', '左', '左前'];

    if (alpha >= 337.5 || alpha < 22.5) {
        return directions[0];
    }

    if (alpha >= 22.5 && alpha < 67.5) {
        return directions[1];
    }

    if (alpha >= 67.5 && alpha < 112.5) {
        return directions[2];
    }

    if (alpha >= 112.5 && alpha < 157.5) {
        return directions[3];
    }

    if (alpha >= 157.5 && alpha < 202.5) {
        return directions[4];
    }

    if (alpha >= 202.5 && alpha < 247.5) {
        return directions[5];
    }

    if (alpha >= 247.5 && alpha < 292.5) {
        return directions[6];
    }

    if (alpha >= 292.5 && alpha < 337.5) {
        return directions[7];
    }


    // Thinking....

    // return directions[heading];
};

