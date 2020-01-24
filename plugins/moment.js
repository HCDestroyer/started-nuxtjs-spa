import Vue from 'vue';
import moment from 'moment'
moment.locale('es');
Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('DD-MM-YYYY')
    }
});
Vue.filter('formatTime', function (value) {
    if (value) {
        return moment(String(value)).format('LTS')
    }
});
Vue.mixin({
    methods:
    {
        birthDate(birthday) {
            birthday = (birthday == "" || birthday == null) ? moment() : birthday;
            return moment().diff(birthday, 'years')
        },
        checkDate(number_day, date, type = 'YYYY-MM-DD') {
            date = moment(date).format('YYYY-MM');
            var check = moment(date + '-' + number_day, 'YYYY-MM-DD');
            if (check.isValid()) {
                return moment(check, 'YYYY-MM-DD').format(type);
            }
            return moment(date).endOf('month').format(type);
        },
        getDay(day = "", type = 'YYYY-MM-DD') {
            day = (day == "") ? moment().format(type) : day;
            return moment(day, 'YYYY-MM-DD').format(type);
        },
        getDate(day = "", type = 'YYYY-MM-DD') {
            day = (day == "") ? moment().format(type) : day;
            return moment(day, 'YYYY-MM-DD H:mm:ss').format(type);
        },
        getCurrent(day = "", type = 'YYYY-MM-DD H:mm:ss') {
            day = (day == "") ? moment().format(type) : day;
            return moment(day, 'YYYY-MM-DD H:mm:ss').format(type);
        },
        getHour(day = "", type = 'H:mm:ss') {
            day = (day == "") ? moment().format(type) : day;
            return moment(day, 'YYYY-MM-DD H:mm:ss').format(type);
        },
        getFutureMinute(day = "", future = 1, type = 'YYYY-MM-DD H:mm:ss') {
            day = (day == "") ? moment().format(type) : day;
            return moment(day).add(future, "minutes").format(type);
        },
        getFutureHour(day = "", future = 1, type = 'YYYY-MM-DD H:mm:ss') {
            day = (day == "") ? moment().format(type) : day;
            return moment(day).add(future, "hours").format(type);
        },
        getFutureDay(day = "", future = 1, type = 'YYYY-MM-DD H:mm:ss') {
            day = (day == "") ? moment().format(type) : day;
            return moment(day).add(future, "days").format(type);
        },
        getFutureMonth(day = "", future = 1, type = 'YYYY-MM-DD H:mm:ss') {
            future = (future == "" || future == null || future <= 0) ? 1 : future;
            day = (day == "") ? moment().format(type) : day;
            return moment(day).add(future, "month").format(type);
        },
        getFutureYear(day = "", future = 1, type = 'YYYY-MM-DD H:mm:ss') {
            day = (day == "") ? moment().format(type) : day;
            return moment(day).add(future, "years").format(type);
        },
        getBackDay(day = "", remove = 1, type = 'YYYY-MM-DD') {
            day = (day == "") ? moment().format(type) : day;
            return moment(day).subtract(remove, "day").format(type);
        },
        getMonthStartDay() {
            return moment().startOf('month').format('YYYY-MM-DD');
        },
        getMonthEndDay() {

            return moment().endOf('month').format('YYYY-MM-DD');
        }
    },
})