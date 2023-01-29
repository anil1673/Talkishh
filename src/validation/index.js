import * as YUP from "yup";

export const registerFormValidation=YUP.object({
    firstName:YUP.string().min(2).max(50).required("* Please fill firstname"),
    lastName:YUP.string().min(2).max(50).required("* Please fill lastname"),
    email:YUP.string().email().required("* Please fill email"),
    password:YUP.string().required("* Please fill password"),
    location:YUP.string().required("* Please fill location"),
    occupation:YUP.string().required("* Please fill occupation"),
    picturePath:YUP.string().required("* Choose Profile Picture"),

})


export const loginFormValidation=YUP.object({
    
    email:YUP.string().email().required("* Please fill email"),
    password:YUP.string().required("* Please fill password")

})