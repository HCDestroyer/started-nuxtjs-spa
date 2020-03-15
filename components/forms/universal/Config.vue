<template>
    <v-row>
        <v-col cols="12">
           <v-text-field
                v-model="config.name"
                :label="trans('name')"
                :error="!!required_value.name"
                :hint="(required_value.name)? required_value.name:''"
                :hide-details="(required_value.name)?false:true"
                :placeholder="(solo)?trans('name'):''"
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
                v-model="config.slogan"
                :label="trans('slogan')"
                :error="!!required_value.slogan"
                :hint="(required_value.slogan)? required_value.slogan:''"
                :hide-details="(required_value.slogan)?false:true"
                :placeholder="(solo)?trans('slogan'):''"
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
        <v-col cols="6">
            <v-text-field
                type="number"
                v-model="config.phone"
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
        <v-col cols="6">
            <v-text-field
                type="number"
                v-model="config.telephone"
                :label="trans('phone')+' 2'"
                :error="!!required_value.telephone"
                :hint="(required_value.telephone)? required_value.telephone:''"
                :hide-details="(required_value.telephone)?false:true"
                :placeholder="(solo)?trans('phone')+' 2':''"
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
            <v-textarea
                v-model="config.address"
                :label="trans('address')"
                :error="!!required_value.address"
                :hint="(required_value.address)? required_value.address:''"
                :hide-details="(required_value.address)?false:true"
                :placeholder="(solo)?trans('address'):''"
                :auto-grow="autoGrow"
                :filled="filled"
                :flat="flat"
                :loading="loading"
                :no-resize="noResize"
                :outlined="outlined"
                :persistent-hint="persistentHint"
                :rounded="rounded"
                :shaped="shaped"
                :single-line="singleLine"
                :solo="solo"
            ></v-textarea>
        </v-col>
        <v-col cols="12">
             <v-text-field
                v-model="config.city"
                :label="trans('city')"
                :error="!!required_value.city"
                :hint="(required_value.city)? required_value.city:''"
                :hide-details="(required_value.city)?false:true"
                :placeholder="(solo)?trans('city'):''"
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
                v-model="config.state"
                :label="trans('state')"
                :error="!!required_value.state"
                :hint="(required_value.state)? required_value.state:''"
                :hide-details="(required_value.state)?false:true"
                :placeholder="(solo)?trans('state'):''"
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
                v-model="config.country"
                :label="trans('country')"
                :error="!!required_value.country"
                :hint="(required_value.country)? required_value.country:''"
                :hide-details="(required_value.country)?false:true"
                :placeholder="(solo)?trans('country'):''"
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
    name:'form-config',
    props:[
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
        'noResize',
        'autoGrow'
    ],
    data()
    {
        return {
            config: this.value
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
            this.config = input
        }
    },
}
</script>