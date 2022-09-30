const getPagination = (
  paginationCountPerPage: number,
  dataCountPerPage: number,
  currentPage: number,
  dataTotalCount: number
) => {
  const pageGroup = Math.ceil(currentPage / paginationCountPerPage);
  const first = paginationCountPerPage * (pageGroup - 1) + 1;
  const last = first + paginationCountPerPage;
  const totalPageCount = dataTotalCount / dataCountPerPage;

  let paginations = [];

  for (let i = first; i < last; i++) {
    paginations.push(i);

    if (currentPage > totalPageCount) {
      break;
    }
  }

  return paginations;
};

export default getPagination;
