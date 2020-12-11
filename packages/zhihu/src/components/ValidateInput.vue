<template>
    <div class="validate-input-container pb-3 input-wrapper">
        <input 
            v-bind = "$attrs"
            class = "form-control" 
            :value = "inputRef.val" 
            :class = "{'is-invalid':inputRef.error}"
            @input = "updateValue"
            @blur = "validateInput">
            <span v-if = "inputRef.error" class = "invalid-feedback">{{inputRef.message}}</span>
    </div>
</template>


<script lang = "ts">
import {defineComponent,PropType,reactive,onMounted} from "vue";
import {emitter} from "./ValidateForm.vue";
export interface RuleProp {
  type: "required" | "email" | "length" | "range";
  message: string;
  length?: number;
}
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export type RulesProp = RuleProp[];
export default defineComponent({
    name:"ValidateInput",
    inheritAttrs: false,
    props:{
        rules:Array as PropType<RulesProp>,
        modelValue:String,
    },
    setup(props,context){
        const inputRef = reactive({
            val:props.modelValue || "",
            error:false,
            message:""
        });
        const validateInput = () => {
            if(props.rules){
                const allPassed = props.rules.every((rule) => {
                    let passed = true;
                    inputRef.message = rule.message;
                    switch(rule.type){
                        case "required":
                            passed = inputRef.val.trim() !== "";
                            break;
                        case "email":
                            passed = emailReg.test(inputRef.val);
                            break;
                        case "length":
                            if(rule.length){
                                passed = inputRef.val.trim().length <= rule.length;
                            }
                            break;

                        default :
                        break;
                    }
                    return passed;
                });
                inputRef.error = !allPassed;
                return allPassed;
            }
            return true;
        };
        
        // 双向绑定的方法
        const updateValue = (e: KeyboardEvent) => {
          const targetValue = (e.target as HTMLInputElement).value;
          inputRef.val = targetValue;
          context.emit("update:modelValue",targetValue);
        }
        onMounted(() => {
            emitter.emit("form-item-created",validateInput)
        })
        return {
          inputRef,
          validateInput,
          updateValue
        }
    }
})
</script>

<style lang="less" scoped>
    .input-wrapper{
        position:relative;
        .invalid-feedback{
            position:absolute;
        }
    }
</style>