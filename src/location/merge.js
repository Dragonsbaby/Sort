const merge = function(origins){
    let arr = JSON.parse(JSON.stringify(origins));

    let _merge = function(left,mid,right){
        let res_a = arr.slice(left,mid + 1),res_b = arr.slice(mid + 1,right + 1);
        // console.log(left,mid,right,JSON.parse(JSON.stringify(res_a)),JSON.parse(JSON.stringify(res_b)));

        let i = 0,j = 0,next = left;
        while(i < res_a.length && j < res_b.length){
            arr[next++] = res_a[i] <= res_b[j] ? res_a[i++] : res_b[j++];
        }
        while(i < res_a.length) arr[next++] = res_a[i++];
        while(j < res_b.length) arr[next++] = res_b[j++];
        // console.log('结果',JSON.parse(JSON.stringify(arr.slice(left,right + 1))));
        res_a = null, res_b = null;
    };

    let merge_sort = function(left,right){
        if(left < right){
            let mid = left + Math.floor((right - left) / 2);
            merge_sort(left,mid);
            merge_sort(mid + 1,right);
            _merge(left,mid,right);
        }
    };

    //迭代版本
    let merge_sort_iter = function(){
        let len = arr.length;
        for(let step = 1; step < len; step += step){
            for(let i = 0; i < len; i += step + step){
                _merge(i,Math.min(i + step,len) - 1,Math.min(i + step + step,len) - 1);
            }
        }
    };

    // merge_sort(0,arr.length - 1);
    merge_sort_iter();
    return arr;
};

