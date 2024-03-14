"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommaForArray = void 0;
/**
    @description 배열을 쉼표 기준으로 하나의 문자열로 생성
    @example [123,1256,'abc'] -> '123,1256,abc'
   */
function addCommaForArray(values) {
    var data = values.join(',');
    return data;
}
exports.addCommaForArray = addCommaForArray;
//# sourceMappingURL=problem.utils.js.map