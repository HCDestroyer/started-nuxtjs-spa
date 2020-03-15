<template>
    <v-row>
        <v-col cols="12">
           <v-text-field
                v-model="user.card_id"
                :label="trans('card_id')"
                :error="!!required_value.card_id"
                :hint="(required_value.card_id)? required_value.card_id:''"
                :hide-details="(required_value.card_id)?false:true"
                :placeholder="(solo)?trans('card_id'):''"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="filled"
                :clearable="clearable"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
            ></v-text-field> 
        </v-col>
        <v-col 
            cols="12"
            md="6">
            <v-text-field
                v-model="user.fname"
                :label="trans('fname')"
                :error="!!required_value.fname"
                :hint="(required_value.fname)? required_value.fname:''"
                :hide-details="(required_value.fname)?false:true"
                :placeholder="(solo)?trans('fname'):''"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="filled"
                :clearable="clearable"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
            ></v-text-field>
        </v-col>
        <v-col 
            cols="12"
            md="6">
            <v-text-field
                v-model="user.lname"
                :label="trans('lname')"
                :error="!!required_value.lname"
                :hint="(required_value.lname)? required_value.lname:''"
                :hide-details="(required_value.lname)?false:true"
                :placeholder="(solo)?trans('lname'):''"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="filled"
                :clearable="clearable"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-text-field
                type="email"
                v-model="user.email"
                :label="trans('email')"
                :error="!!required_value.email"
                :hint="(required_value.email)? required_value.email:''"
                :hide-details="(required_value.email)?false:true"
                :placeholder="(solo)?trans('email'):''"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="filled"
                :clearable="clearable"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
            ></v-text-field>
        </v-col>
        <v-col 
            cols="12"
            md="6">
            <v-text-field
                type="tel"
                v-model="user.phone"
                :label="trans('phone')"
                :error="!!required_value.phone"
                :hint="(required_value.phone)? required_value.phone:''"
                :hide-details="(required_value.phone)?false:true"
                :placeholder="(solo)?trans('phone'):''"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="filled"
                :clearable="clearable"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
            ></v-text-field>
        </v-col>
        <v-col 
            cols="12"
            md="6">
            <v-select
                v-model="user.gender"
                :items="gender.list"
                :readonly="gender.total<0?true:false"
                :label="gender.total>0 ? trans('select_gender'): trans('not_results_genders')"
                :error="!!required_value.gender"
                :hint="(required_value.gender)? required_value.gender:''"
                :hide-details="(required_value.gender)?false:true"
                :placeholder="(solo)?trans('select_gender'):''"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="gender.total>0?false:true"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
                item-value="key"
                item-text="text"
                item-color="indigo">
                <template v-slot:no-data>
                    <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{trans('not_results')}}
                        </v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </template>
            </v-select>
        </v-col>
        <v-col cols="12">
            <v-text-field
                type="date"
                v-model="user.birth_day"
                :label="trans('birth_date')+' | '+trans('birth_date_format')"
                :error="!!required_value.birth_day"
                :hint="(required_value.birth_day)? required_value.birth_day:''"
                :hide-details="(required_value.birth_day)?false:true"
                :shaped="shaped"
                :outlined="outlined"
                :rounded="rounded"
                :solo="solo"
                :single-line="singleLine"
                :filled="filled"
                :clearable="clearable"
                :persistent-hint="persistentHint"
                :loading="loading"
                :flat="flat"
            ></v-text-field>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name:'form-user',
    props:[
        'show_roles',
        'roles',
        'required_value',
        'value',
        'shaped',
        'outlined',
        'rounded',
        'solo',
        'singleLine',
        'filled',
        'clearable',
        'persistentHint',
        'loading',
        'flat',
    ],
    data()
    {
        return {
            user: this.value,
            gender:{
                list:[
                    {
                        key:'female',
                        text: this.trans('female')
                    },
                    {
                        key:'male',
                        text: this.trans('male')
                    },
                    {
                        key:'other',
                        text: this.trans('other')
                    },
                ],
                total:3
            }
        }
    },
    watch: {
        value(input)
        {
            Object.keys(input).forEach( (row, index) =>
            {
                if(input[row] != "")
                {
                    this.required_value[row] = "";
                }
            });
            this.user = input
        }
    },
}
</script>