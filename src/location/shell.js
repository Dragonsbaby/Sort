const shell = function (origins) {
    let arr = JSON.parse(JSON.stringify(origins));
    (function () {
        let len = arr.length, gap = Math.floor(len / 2);

        for (; gap > 0; gap = Math.floor(gap / 2)) {
            for (let m = 0; m < gap; m++) {
                for (let n = m; n < len; n += gap) {
                    let temp = arr[n], j = n;
                    for(; j > 0 && arr[j - 1] > temp; j -= gap){
                        arr[j] = arr[j - 1];
                    }
                    arr[j] = temp;
                }
            }
        }
    })();
    return arr;
};