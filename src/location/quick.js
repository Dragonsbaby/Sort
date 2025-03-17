const quick =  function (origin) {
    let arr = JSON.parse(JSON.stringify(origin));
    let run = function (left, right) {
        if(left < right) {
            let [i, j, key] = [left + 1, right, left];
            while (i < j) {
                while (arr[i] <= arr[key] && i < j) i++;
                while (arr[j] >= arr[key] && j > i) j--;
                i < j && ([arr[i], arr[j]] = [arr[j], arr[i]]);
            }
            if(i !== key) {
                arr[i] < arr[key] ? ([arr[key], arr[i]] = [arr[i], arr[key]]) : i--;
            }
            run(left, i);
            run(i + 1, right);
        }
    };
    run(0, arr.length - 1);
    return arr;
};
