export const selectUserColumnsWithId = () =>  ({
  id: true,
  name: true,
  email: true,
});

export const selectUserColumnsMini = () =>  ({
  name: true,
  email: true,
});

export const selectUserColumnsWithIdAndPass = () =>  ({
  id: true,
  name: true,
  email: true,
  hashedPassword: true,
});

