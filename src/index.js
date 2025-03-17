import Snap from 'snapsvg'
import './index.less'

import Quick from './sort/quick'
import Shell from './sort/shell'
import Merge from './sort/merge'
import Heap from './sort/heap'

export const OPTION = {
    length: 80,
    duplicate: false,
    max: 300,
    width: 16,
    space: 4,
    speed: 100,
    color: {grey: 'darkgrey', processing: '#3c919c', pending: 'orangered', blue: 'blue'}
};

(function () {
    let origins = OPTION.duplicate ? Array.apply(null, OPTION.length).map(() => Math.floor(Math.random() * OPTION.length) + 1)
      : Array.from({length: OPTION.length}, (v, k) => k + 1).sort(() => Math.random() - 0.5);
    // let origins = [...Array(SIZE).keys()].map(v => v + 1);

    // let origins = [13, 12, 11, 10, 18, 20, 24, 23, 23, 23, 7, 7, 23, 22, 13, 2, 17, 19, 24, 24, 6, 5, 1, 18, 25];

    // let queue = {quick: null, shell: null, merge: null};

    document.querySelector('#optionSpeed').addEventListener('change',function(){
        console.log(this);
        let pix = Number(this.value);
        OPTION.speed = 50 * pix;
    })
    
    Quick.init(Snap('#QuickSort'), origins);
  
    Shell.init(Snap('#ShellSort'), origins);
   
    Merge.init(Snap('#MergeSort'), origins);

})();

