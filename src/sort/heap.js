const sort = function (origins) {
    let temps = origins.map(n => n);

    const heap = function (arr, i, len) {
        let left = 2 * i + 1, right = 2 * i + 2, largest = i;
        if (left < len && arr[largest] > arr[left]) {
            largest = left;
        }
        if (right < len && arr[largest] > arr[right]) {
            largest = right;
        }

        if (largest !== i) {            //发生交换
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heap(arr, largest, len);
        }
    };

    const _sort = function (arr) {
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            heap(arr, i, arr.length);
        }

        for (let i = arr.length - 1; i >= 0; i--) {
            [arr[i], arr[0]] = [arr[0], arr[i]];
            heap(arr, 0, i);
        }
    };

    _sort(temps);


    const countSmaller = function(nums) {
        let sorted = [], count = Array(nums.length);
        for (let j = nums.length - 1; j >= 0; j--) {
            let index = findIndex(sorted, nums[j]);
            sorted.splice(index, 0, nums[j]);
            count[j] = index;
        }
    };

    const findIndex = function (arr, target) {
        let low = 0, high = arr.length - 1;
        while (low < high) {
            let mid = (low + high) >> 1;
            arr[mid] < target ? (low = mid + 1) : (high = mid);
        }
        return arr[low] < target ? low + 1 : low;
    };


    countSmaller([5,3,3,4,2,6,1])
};

const init = function (origins) {
    sort(origins);
};
export default {init}
