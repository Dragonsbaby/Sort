import {OPTION} from "./index";

const util = {
    getVector(Svg, origins) {
        let {width, space, max, length} = OPTION;
        let ratio = (max / length);
        Svg.attr({width: (width + space) * length, height: max + 20});
        return origins.map((n, i) => {
            let r = Svg.rect(0, max - n * ratio, width, n * ratio, 4, 4).attr({fill: OPTION.color.processing});
            let g = Svg.g(r, Svg.text(width / 2, max + 15, n));
            g.attr({transform: `translate(${(width + space) * i})`});
            return {i, n, r, g};
        });
    },
    exchange(left, right) {
        let l = left.g.matrix.e, r = right.g.matrix.e;
        left.g.animate({transform: `translate(${r})`}, OPTION.speed * 0.8);
        right.g.animate({transform: `translate(${l})`}, OPTION.speed * 0.8);
    }
};


export default util;
