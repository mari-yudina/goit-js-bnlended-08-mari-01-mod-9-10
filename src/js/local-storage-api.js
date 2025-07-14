// 3.2 - створюємо функцію збереження тасок в ЛС і для діставання їх з ЛС
export const saveInLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLS = key => {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    return parsedData;
  }
  return null;
};
