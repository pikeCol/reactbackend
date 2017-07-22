
import {  Modal, Button } from 'antd';
let Myalert = {}

function success(title,content) {
  const modal = Modal.success({
    title: title,
    content: content
  });
  setTimeout(() => modal.destroy(), 1000);
}
function error (title,content) {
   Modal.error({
    title: title,
    content: content
  });
}

function autoCloseError (title,content) {
  const modal = Modal.error({
    title: title,
    content: content
  });
  setTimeout(() => modal.destroy(), 2000);
}

Myalert.success = success;
Myalert.error = error;
Myalert.autoCloseError = autoCloseError;
export default Myalert
