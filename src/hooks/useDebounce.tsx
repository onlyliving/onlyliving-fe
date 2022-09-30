interface useDebounceProps {
  callback: () => void;
  ms: number;
}

const useDebounce = ({ callback, ms }: useDebounceProps) => {
  let timer: any;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => callback(), ms);
  };
};

export default useDebounce;
