interface IDebounceFunc {
  callback: () => void;
  ms: number;
}

const debounceFunc = ({ callback, ms }: IDebounceFunc) => {
  let timer: any;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => callback(), ms);
  };
};

export default debounceFunc;
