export const delay = (threshold: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Delayed');
    }, threshold);
  })
}