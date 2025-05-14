export const formatCurrency = (amount: number, prefix = 'R$ ') => {
  const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(amount)
    .replace(/R\$\s{1}/g, prefix);

  return value;
};
