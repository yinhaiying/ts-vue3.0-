<template>
    <div class="validate-input-container pb-3">
        <input type="text" 
            class = "form-control" 
            v-model = "inputRef.val" 
            :class = "{'is-invalid':inputRef.error}"
            @blur = "validateInput">
            <span v-if = "inputRef.error" class = "invalid-feedback">{{inputRef.message}}</span>
    </div>
</template>


<script lang = "ts">
import {defineComponent,PropType,reactive} from "vue";
export interface RuleProp {
  type: "required" | "email" | "length" | "range";
  message: string;
}
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export type RulesProp = RuleProp[];
export default defineComponent({
    name:"ValidateInput",
    props:{
        rules:Array as PropType<RulesProp>
    },
    setup(props){
        const inputRef = reactive({
            val:"",
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
                        default :
                        break;
                    }
                    return passed;
                });
                inputRef.error = !allPassed;
            }
        };
        return {
          inputRef,
          validateInput
        }
    }
})
</script>