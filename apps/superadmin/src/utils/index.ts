import { showToast } from './toast';

export function copyToClipboard(str: string, cb?: () => void) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  showToast(`Copied to Clipboard`, 'success');
}
