export const compare = (key, order = "asc") => {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

    const varA = parseInt(a[key]);
    const varB = parseInt(b[key]);

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return order === "desc" ? comparison * -1 : comparison;
  };
};
