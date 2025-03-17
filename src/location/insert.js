const insert = function (origins) {
    let arr = JSON.parse(JSON.stringify(origins));

    (function () {
        let len = arr.length, m = 0, n;
        for (; m < len; m++) {
            let temp = arr[m];
            for (n = m; m > 0 && arr[n - 1] > temp; n--) {
                arr[n] = arr[n - 1];
            }
            arr[n] = temp;
        }
    })();
    return arr;
};