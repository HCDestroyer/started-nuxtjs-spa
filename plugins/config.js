import Vue from 'vue';
const QrImage = require('qr-image');
Vue.mixin({
    data() {
        return {
            app_name: process.env.APP_NAME,
            app_debug: JSON.parse(process.env.APP_DEBUG.toLowerCase()),
            app_version: process.env.APP_VERSION,
            app_description: process.env.APP_DESCRIPTION,
            app_url: process.env.BASE_URL,
            app_asset: process.env.ASSET_URL,
            required: {},
            snackbar: {
                type: 'black',
                time: 5000,
                status: false,
                title: '',
                text: '',
                buttonState: true,
                buttons: []
            },
            dialog: {
                title: '',
                text: '',
                trash: false,
                recover: false,
                info: false,
                save: false,
                search: false,
                one: false,
                two: false,
                three: false,
                four: false,
                five: false,
                six: false,
            },
            overlay: {
                text: '',
                status: false,
                time: 2000
            },
            display_info: {
                selected: 0,
                list: false,
                card: true,
            },
            time: 0,
            query_value: '',
            waiting: false,
            sending: false,
            navigate_top_color: 'bg-gradient-green'
        }
    },
    methods:
    {
        hiddenProps(obj={}, props =[])
        {
            let hiddenProp = obj;
            Object.keys(hiddenProp).map((prop) =>
            {
                props.map((hidden) => {
                    if (hidden === prop) 
                    {
                        delete hiddenProp[hidden];
                    }
                });
            });
            return hiddenProp;
        },
        onlyProps(obj = {}, props = []) {
            let onlyProp = obj;
            let newOb = {};
            if(props.length>0)
            {
                Object.keys(onlyProp).map((prop) =>
                {
                    if (props.indexOf(prop) >= 0)
                    {
                        newOb[prop] = onlyProp[prop];
                    }
                });
            }
            return newOb;
        },
        authCheckPermission(permission)
        {
            console.log(this.$store.$auth.user.access.includes(permission));
            
            return this.$store.$auth.user.access.includes(permission);
        },
        displayInfoCard() {
            this.display_info.selected = 1;
            this.display_info.card = true;
            this.display_info.list = false;
        },
        displayInfoList() {
            this.display_info.selected = 0;
            this.display_info.list = true;
            this.display_info.card = false;
        },
        getQR(text = "NAMEAPP") {
            var svg_string = QrImage.imageSync(text);
            var base64Data = btoa(String.fromCharCode.apply(null, svg_string));
            var img = 'data:image/png;base64,' + base64Data;
            return img;
        },
        customerQR(text = "NAMEAPP") {
            var svg_string = QrImage.imageSync(this.app_url + '/customer/' + text);
            var base64Data = btoa(String.fromCharCode.apply(null, svg_string));
            var img = 'data:image/png;base64,' + base64Data;
            return img;
        },
        appQR(text = "NAMEAPP") {
            var svg_string = QrImage.imageSync(text);
            var base64Data = btoa(String.fromCharCode.apply(null, svg_string));
            var img = 'data:image/png;base64,' + base64Data;
            return img;
        },
        profile() {
            return this.$axios.$post('/auth/user')
        },
        trans(text) {
            var word = new String(text).trim();
            return (this.$store.getters['translate/trans'][word]) ? this.$store.getters['translate/trans'][word] : 'lang:' + text;
        },      
        pushMessage(text, type = 'black', time = 5000, buttons = []) 
        {
            var audio = new Audio();
            switch (type) 
            {
                case 'success':
                    audio.src = this.app_url + '/sounds/success.ogg';
                    break;
                case 'warning':
                    audio.src = this.app_url + '/sounds/warning.ogg';
                    break;
                case 'error':
                    audio.src = this.app_url + '/sounds/error.ogg';
                    break;
                case 'black':
                    audio.src = this.app_url + '/sounds/popup.ogg';
                    break;
                default:
                    audio.src = this.app_url + '/sounds/notifications.ogg';
                    break;
            }
            audio.play();
            this.snackbar = {
                type: type,
                time: time,
                status: true,
                text: text,
                buttons: buttons
            }
        },
        formatToPrice(value) {
            var price = new Number(value);
            price = parseFloat(price).toFixed(2);
            price = (isNaN(price) ? 0.00 : price);
            return `Q${price}`;
        },
        formatToNumber(value) {
            var num = new Number(value);
            num = parseInt(num);
            num = (isNaN(num) ? 0 : num);
            return num;
        },
        getFormatParams(obj, paramsFilters) 
        {
            let new_obj = {};
            paramsFilters.map((header) => 
            {
                if (header.date) 
                {
                    Object.defineProperty(new_obj, header.text,
                    {
                        value: this.getDate(obj[header.value]),
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }
                else if (header.float) 
                {
                    Object.defineProperty(new_obj, header.text,
                    {
                        value: Number.parseFloat(parseFloat(obj[header.value]).toFixed(2)),
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }
                else if (header.integer) 
                {
                    Object.defineProperty(new_obj, header.text,
                        {
                            value: Number.parseInt(obj[header.value]),
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                }
                else 
                {
                    Object.defineProperty(new_obj, header.text,
                    {
                        value: obj[header.value],
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }
            });
            return new_obj;
        },
    }
})