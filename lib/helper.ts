export const zeroPad = (num, places) => String(num).padStart(places, '0');
export const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});
