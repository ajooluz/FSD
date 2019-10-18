import $ from "jquery";

const textField = $('.text-field');
const inputBorder = textField.find('.text-field__input-border');
const focusClass = 'text-field__input-border_focus';

textField.find('input')
    .on('focus', () => { inputBorder.addClass(focusClass); })
    .on('blur', () => { inputBorder.removeClass(focusClass); });