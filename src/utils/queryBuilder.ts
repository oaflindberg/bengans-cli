export const queryBuilder = async () => {
  let query = process.argv[2];

  if (process.argv[3]) {
    query = `${process.argv[2]} ${process.argv[3]}`;
  }

  if (process.argv[4]) {
    query = `${process.argv[2]} ${process.argv[3]} ${process.argv[4]}`;
  }

  if (process.argv[5]) {
    query = `${process.argv[2]} ${process.argv[3]} ${process.argv[4]} ${process.argv[5]}`;
  }

  if (process.argv[6]) {
    query = `${process.argv[2]} ${process.argv[3]} ${process.argv[4]} ${process.argv[5]} ${process.argv[6]}`;
  }

  if (process.argv[7]) {
    query = `${process.argv[2]} ${process.argv[3]} ${process.argv[4]} ${process.argv[5]} ${process.argv[6]} ${process.argv[7]}`;
  }

  return query;
};
