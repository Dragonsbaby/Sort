
const OPTION = {length: 30 , duplicate: false};
// let origins = Array.apply('', OPTION.length).map(v => Math.floor(Math.random() * OPTION.length) + 1);
// let origins = [4, 3, 24, 5, 27, 21, 18, 19, 17, 10, 23, 7, 15, 8, 2, 1, 9, 16, 13, 11, 28, 30, 12, 25, 20, 6, 22, 29, 26, 14];
// let origins = [1, 6, 1, 1, 4, 7, 4, 2];

let origins = OPTION.duplicate ? Array.apply(null, OPTION.length).map(() => Math.floor(Math.random() * OPTION.length) + 1)
    : Array.from({length: OPTION.length}, (v, k) => k + 1).sort(() => Math.random() - 0.5);

(function(){
    console.log(origins);
    // console.log(merge(origins));
    console.time();
    // console.log(heap(origins));
    console.log(heap(origins));
    console.timeEnd();
    // console.log(quick(origins));
    // console.log(shell(origins));

})();