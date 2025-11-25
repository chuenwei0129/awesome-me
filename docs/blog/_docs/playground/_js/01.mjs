const queryUsers = () => {
  let byPage = false;
  return Object.assign(
    Promise.resolve(null).then(() => {
      if (!byPage) {
        console.log('Querying all users');
      }
    }),
    {
      byPage: (options) => {
        byPage = true;
        console.log('Querying users by page', options);
      },
    },
  );
};

await queryUsers();

await queryUsers().byPage({});
