import Snap from 'snapsvg';
import {OPTION} from "../index";


import util from "../util";

const sort = function (origins) {
    let temps = origins.map((n, i) => ({n, i}));
    let process = [];

    const merge = function (arr, left, mid, right) {

        let reg_a = arr.slice(left, mid + 1);
        let reg_b = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, path = [], next = left, rang = arr.slice(left, right + 1).map(v => v.i);
        while (i < reg_a.length && j < reg_b.length) {
            path.push({type: 1, index: reg_a[i].i, to: reg_b[j].i});
            if (reg_a[i].n <= reg_b[j].n) {
                path.push({type: 0, index: reg_a[i].i, to: next});
                arr[next++] = reg_a[i++];
            } else {
                path.push({type: 0, index: reg_b[j].i, to: next});
                arr[next++] = reg_b[j++];
            }
        }

        while (i < reg_a.length) {
            path.push({type: 2, index: reg_a[i].i});
            path.push({type: 0, index: reg_a[i].i, to: next});
            arr[next++] = reg_a[i++];
        }
        while (j < reg_b.length) {
            path.push({type: 2, index: reg_b[j].i});
            path.push({type: 0, index: reg_b[j].i, to: next});
            arr[next++] = reg_b[j++];
        }
        process.push({rang, path});
        reg_a = null, reg_b = null;
    };



    const merge_sort = function (arr, left, right) {
        if (left >= right) {
            return ;
        }
        let mid = left + Math.floor((right - left) / 2);
        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    };

    //迭代版本 *需要额外的内存(数组)*
    const merge_sort_iter = function (arr) {
        let len = arr.length;
        for (let step = 1; step < len; step += step) {
            for (let i = 0; i < len; i += step + step) {
                let left = i, mid = i + step < len ? i + step : len;
                let right = i + step + step ? i + step + step : len;
                merge(arr, left, mid - 1, right - 1);
            }
        }
    };

    // 非递归版本
    // 这个版本存在比较严重的 引用地址问题 最后需要修复指针
    const merge_sort_iter_bug = function (arr) {
        let len = arr.length, result = Array(len), next, end1, temp;
        for (let step = 1; step < len; step += step) {
            for (let i = 0; i < len; i += step + step) {
                let start1 = next = i;
                let start2 = end1 = i + step < len ? i + step : len;
                let end2 = i + step + step < len ? i + step + step : len;
                while (start1 < end1 && start2 < end2) {
                    result[next++] = arr[start1] <= arr[start2] ? arr[start1++] : arr[start2++];
                }
                while (start1 < end1) result[next++] = arr[start1++];
                while (start2 < end2) result[next++] = arr[start2++];
            }
            [arr, result] = [result, arr];
        }
        arr !== temps && (temps = arr);     //修复引用地址问题
    };

    merge_sort(temps, 0, temps.length - 1);
    return process;

};




const draw = function (Svg, vector, process) {
    let queue = [], width = OPTION.width + OPTION.space;

    Svg.attr({height: (OPTION.max + 20) * 2});             //归并需要俩倍高度

    process.forEach(item => {
        let {rang, path} = item;
        queue.push(() => {
            vector.forEach(v => v.r.attr({fill: OPTION.color.grey}));
            rang.forEach(v => vector[v].r.attr({fill: OPTION.color.processing}));
        });

        path.forEach(step => {
            if (step.type === 1) {
                queue.push(() => {
                    vector[step.index].r.attr({fill: OPTION.color.pending});
                    vector[step.to].r.attr({fill: OPTION.color.pending});
                });

            }
            if (step.type === 2) {
                queue.push(() => {
                    vector[step.index].r.attr({fill: OPTION.color.pending});
                });
            }
            if (step.type === 0) {
                queue.push(() => {
                    let up = vector[step.index];
                    let to_x = step.to * width;
                    up.r.attr({fill: OPTION.color.blue});
                    up.g.animate({transform: `translate(${to_x},${OPTION.max + 20})`}, OPTION.speed * 0.4);
                });
            }
        });
        queue.push(() => {
            rang.forEach(v => {
                let group = vector[v].g;
                group.animate({transform: `translate(${group.matrix.e},0)`}, OPTION.speed * 0.4);
            });
        });
    });
    queue.push(() => {
        vector.forEach(v => v.r.attr({fill: OPTION.color.processing}));
    });

    return queue
};

const init = function (Svg, origins) {
    return new Promise(resolve => {
        let vector = util.getVector(Svg, origins), process = sort(origins);
        let queue = draw(Svg, vector, process);
        document.querySelector('#beginMerge').addEventListener('click',function(){
            let timer = null;
            let ajax = queue.reduce((prev, current, index) => {
                return prev.then(() => {
                    return new Promise(resolve => {
                        timer = setTimeout(() => {
                            clearTimeout(timer);
                            current();
                            resolve();
                            console.log(OPTION.speed);
                        }, OPTION.speed);
                    });
                });
            }, Promise.resolve());
          this.style.display = 'none';
        });
       
        resolve();
    });
};
export default {
    init
};


(function () {
    const countSmaller = (nums) => {
        const counts = new Array(nums.length).fill(0);
        let indexedNums = new Array(nums.length);
        for (let i = 0; i < indexedNums.length; i++) {
            indexedNums[i] = {
                value: nums[i],
                index: i
            };
        }
        const mergeSort = (left, right) => {
            if (left >= right) return [indexedNums[left]];


            const mid = (left + right) >>> 1;
            const leftPart = mergeSort(left, mid);
            const rightPart = mergeSort(mid + 1, right);
            let i = 0, j = 0, merged = [];
            while (i < leftPart.length) {
                while (j < rightPart.length && rightPart[j].value < leftPart[i].value) {
                    merged.push(rightPart[j++]);
                }
                counts[leftPart[i].index] += j;
                merged.push(leftPart[i++]);
            }
            while (j < rightPart.length) merged.push(rightPart[j++]);
            return merged;
        };
        mergeSort(0, indexedNums.length - 1);
        return counts;
    };

    // console.log(countSmaller([5, 3, 3, 2, 6, 1]));

})();
