import {OPTION} from "../index";
import util from "../util";

const sort = function (origins) {
    let temps = origins.map((n, i) => ({n, i}));
    let process = [];
    //type 1为左 2为右  0为交换
    let _sort = function (arr, left, right) {
        if (left < right) {
            let [i, j, key, path] = [left + 1, right, left, []];
            let rang = arr.slice(left, right + 1).map(v => v.i);
            while (i < j) {
                while (arr[j].n >= arr[key].n && i < j) {
                    path.push({type: 2, index: arr[j--].i});
                }
                path.push({type: 2, index: arr[j].i});
                while (arr[i].n <= arr[key].n && i < j) {
                    path.push({type: 1, index: arr[i++].i});
                }
                path.push({type: 1, index: arr[i].i});

                if (i < j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    path.push({type: 0, index: arr[j--].i, to: arr[i].i});
                }

            }
            if (i !== key) {
                //若i 比 key 大 则i指针回退一格
                arr[i].n < arr[key].n ? ([arr[key], arr[i]] = [arr[i], arr[key]]) : i--;
                path.push({type: 0, index: arr[i].i, to: arr[key].i});
            }

            process.push({path, rang, start: left, end: right});
            _sort(arr, left, i - 1);
            _sort(arr, i + 1, right);
        }
    };


    _sort(temps, 0, temps.length - 1);
    return process;
};


const draw = function (Svg, vector, process) {
    let queue = [], LINE = null;
    let {width, space, max, length} = OPTION;
    let ratio = (max / length);

    process.forEach((item) => {
        let {rang, path, start, end} = item;
        let left = rang[1], key = rang[0], right = rang[rang.length - 1];
        queue.push(() => {
            vector.forEach(v => v.r.attr({fill: OPTION.color.grey}));
            rang.forEach(v => vector[v].r.attr({fill: OPTION.color.processing}));
            vector[key].r.attr({fill: OPTION.color.blue});
            LINE && LINE.remove();              //去掉上一条线
            let _r = end - start + 1;
            LINE = Svg.rect((width + space) * start, max - vector[key].n * ratio, (width + space) * _r - space, 2).attr({fill: 'red'});
        });

        path.forEach(step => {
            if (step.type === 2) {
                queue.push(() => {
                    vector[right].r.attr({fill: OPTION.color.processing});
                    vector[right = step.index].r.attr({fill: OPTION.color.pending});
                });
            }
            if (step.type === 1 && step.index !== key) {
                queue.push(() => {
                    vector[left].r.attr({fill: OPTION.color.processing});
                    vector[left = step.index].r.attr({fill: OPTION.color.pending});
                });
            }

            if (step.type === 0 && step.index !== step.to) {
                queue.push(() => {
                    util.exchange(vector[left = step.to], vector[right = step.index]);
                });
            }
        });
    });
    queue.push(() => {
        vector.forEach(v => v.r.attr({fill: OPTION.color.processing}));
        LINE && LINE.remove();
    });
    return queue;
};


const init = function (Svg, origins) {
    return new Promise(resolve => {
        let vector = util.getVector(Svg, origins), process = sort(origins);
        console.log(vector,process);
        let queue = draw(Svg, vector, process);
        document.querySelector('#beginQuick').addEventListener('click',function(){
            let timer = null;
            let ajax = queue.reduce((prev, current, index) => {
                return prev.then(() => {
                    return new Promise(resolve => {
                        timer = setTimeout(() => {
                            clearTimeout(timer);
                            current();
                            resolve();
                        }, OPTION.speed);
                    });
                });
            }, Promise.resolve());
            this.style.display = 'none';
        });
        resolve();
        // resolve(draw(Svg, vector, process));
    });
};

export default {init};


