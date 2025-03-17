const heap = function(origins,asc = true){
  let arr = JSON.parse(JSON.stringify(origins));

  let max_heap = function(i,len){
    let left = 2 * i + 1,right = 2 * (i + 1),large = i;

    if(left < len && arr[left] > arr[large]){
      large = left
    }
    if(right < len && arr[right] > arr[large]){
      large = right
    }

    if(large !== i){
      arr.swap(i,large);
      max_heap(large,len);
    }
  };


  //最小堆
  let min_heap = function(i,len){
    let left = 2 * i + 1,right = 2 * i + 2,min = i;

    if(left < len && arr[left] < arr[min]){
      min = left;
    }
    if(right < len && arr[right] < arr[min]){
      min = right;
    }
    if(min !== i){
      arr.swap(i,min);
      min_heap(min,len);
    }
  };


  (function(){
    let run = asc ? max_heap : min_heap;
    //构建初始堆
    for(let n = Math.floor(arr.length / 2) - 1; n >= 0; n--){
      run(n,arr.length);
    }

    for(let n = arr.length - 1; n >= 0; n--){
      arr.swap(0,n);
      run(0,n);
    }
  })();
};
