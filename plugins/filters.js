import Vue from 'vue';
// Elements is a array
Vue.filter('reverse', function (elements) {
    let reOrder = [];
    if (elements) {
        if (elements.length > 0) {
            reOrder = elements.slice().reverse();
        }
    }
    return reOrder;
});
Vue.filter('two_digits', function (value) {
    if (value.toString().length <= 1) {
        return "0" + value.toString();
    }
    return value.toString();
});