<template>
    <v-row
        align="center"
        justify="center">
        <v-col 
            cols="12"
            class="pb-0">
           <v-text-field
                v-model="role.name"
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
        <v-col 
            cols="12"
            class="pb-0">
            <v-textarea
                v-model="role.description"
                :label="trans('description')"
                :error="!!required_value.description"
                :hint="(required_value.description)? required_value.description:''"
                :hide-details="(required_value.description)?false:true"
                :placeholder="(solo)?trans('description'):''"
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
    </v-row>
</template>
<script>
export default {
    name:'form-role',
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
            role: this.value
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
            this.role = input
        }
    },
}
</script>