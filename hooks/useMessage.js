import React from 'react'
import emailjs from "@emailjs/browser";
import useAlert from "@/hooks/alert/useAlert";

const useMessage = () => {

    const { successAlert, errorAlert} = useAlert()

    const sendMessage = ({event,service,template,form,public_key}) => {
        event.preventDefault();
        emailjs.sendForm(service, template, form, public_key).then(
            (result) => {
                successAlert('Your message has been sent.')
            },
            (error) => {
                errorAlert('Something went wrong.')
            }
        );
    };
  return {sendMessage}
}

export default useMessage