import {OPTION} from "../index";
import util from '../util'

const sort = function (origins) {
    let temps = origins.map((n, i) => ({n, i}));
    let process = [];

    //type 1为比较  type 0为交换
    (function (arr) {
        let len = arr.length, gap = Math.floor(len / 2);
        for (; gap > 0; gap = Math.floor(gap / 2)) {
            for (let m = 0; m < gap; m++) {             //循环gap次
                let rang = [arr[m].i], path = [];
                for (let i = m + gap; i < len; i += gap) {
                    rang.push(arr[i].i);
                    let j = i, temp = arr[i];
                    for (; j >= gap && temp.n < arr[j - gap].n; j -= gap) {
                        path.push({type: 1, index: arr[j].i, to: arr[j - gap].i});
                        path.push({type: 0, index: arr[j].i, to: arr[j - gap].i});
                        [arr[j], arr[j - gap]] = [arr[j - gap], arr[j]];
                    }
                    if (i === j) {
                        path.push({type: 1, index: arr[j].i, to: arr[j - gap].i});
                    }
                }
                process.push({rang, path});
            }
        }
    })(temps);
    return process;
};

const draw = function (Svg, vector, process) {
    let queue = [];
    process.forEach((item) => {
        let {rang, path} = item, a = rang[0], b = rang[1];
        queue.push(() => {
            vector.forEach(v => v.r.attr({fill: OPTION.color.grey}));
            rang.forEach(v => vector[v].r.attr({fill: OPTION.color.processing}));
        });
        path.forEach(step => {
            if (step.type === 1) {
                queue.push(() => {
                    vector[a].r.attr({fill: OPTION.color.processing});
                    vector[b].r.attr({fill: OPTION.color.processing});
                    vector[b = step.index].r.attr({fill: OPTION.color.pending});
                    vector[a = step.to].r.attr({fill: OPTION.color.pending});

                });

            }
            if (step.type === 0) {
                queue.push(() => {
                    util.exchange(vector[a = step.to], vector[b = step.index]);
                });

            }
        });
    });
    queue.push(() => {
        vector.forEach(v => v.r.attr({fill: OPTION.color.processing}));
    });
    return queue;
};

const init = function (Svg, origins) {
    return new Promise(resolve => {
        let vector = util.getVector(Svg, origins), process = sort(origins);
        let queue = draw(Svg, vector, process)
        document.querySelector('#beginShell').addEventListener('click',function(){
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
            this.style.display = 'none'
        });
        resolve();
    });

};

export default {init};
