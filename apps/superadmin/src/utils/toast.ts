import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'info' | 'warn' | 'error';

/**
 *
 * @param {String} message - Message to appear on toast
 * @param {String} type - success | info | warn | error
 */
type ToastMessage = { value: string; time: number };
let listOfAlertMessages: ToastMessage[] = [];

export const showToast = (
  message: string,
  type: ToastType = 'info',
  optionArgs: ToastOptions = {}
) => {
  type = type.toLowerCase() as ToastType;

  const defaultOptions: ToastOptions = {
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const options: ToastOptions = {
    ...defaultOptions,
    ...optionArgs,
  };

  const pushMessageIntoArr = (value: string) => {
    listOfAlertMessages.push({
      value: value,
      time: Date.now(),
    });
  };

  const updateListOfAlertMessages = () => {
    const currentTime = Date.now();
    listOfAlertMessages = listOfAlertMessages.filter(
      (item) => currentTime < item.time + (options.autoClose || 3000)
    );

    if (listOfAlertMessages.length === 0)
      clearInterval(toastMessagesExpiryTestInterval);
  };

  const toastMessagesExpiryTestInterval = setInterval(
    updateListOfAlertMessages,
    400
  );

  if (!listOfAlertMessages.some((msg) => msg.value === message)) {
    pushMessageIntoArr(message);
    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'warn':
        toast.warn(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      case 'info':
        toast.info(message, options);
        break;
      default:
        toast.info(message, options);
        break;
    }
  }
};
