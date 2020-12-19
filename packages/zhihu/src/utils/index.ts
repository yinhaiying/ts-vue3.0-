
interface CheckCondition {
    format?: string[];
    size?: number;
}
type ErrorType = "size" | "format" | null;

// 对图片上传前的校验处理
export const beforeUploadCheck = (file: File, condition: CheckCondition) => {
    const { format, size } = condition;
    const isValidFormat = format ? format.includes(file.type) : true;
    const isValidSize = size ? (file.size / 1024 / 1024 > size) : true;
    let error: ErrorType = null;
    if(!isValidFormat){
        error = "format";
    }
    if(!isValidSize){
        error = "size";
    }
    return {
        passed: isValidFormat && isValidSize,
        error
    }
}