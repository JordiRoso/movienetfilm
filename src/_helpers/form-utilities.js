export const validateLoginFormValues = (formValues) => {
   const errors = {};

   const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   //const passwordPattern = ???

   //email
   if (!formValues.email) {
      errors.email = "Email is required!";
   } else if (!emailPattern.test(formValues.email)) {
      errors.email = "This is not a valid email format!";
   }

   //password
   if (!formValues.password) {
      errors.password = "Password is required!";
   } else if (formValues.password.length < 6) {
      errors.password = "Password must be more than 6 characters!";
   }

   //name admin
   // if (!formValues.nameadmin) {
   //    errors.nameadmin = "Name is required!";
   // } else if (formValues.nameadmin.length < 5) {
   //    errors.nameadmin = "Password must be more than 5 characters!";
   // }


   return errors;
};
