const db = require('../database');

let count = 0;

console.log('****************************************');
console.log('Deleting data...');

const sql = 'DELETE FROM followers';

db.run(sql, [], function (err) {
  if (err) throw err;

  console.log('Followers: All data deleted');
  count++;

  const sql = 'DELETE FROM likes';

  db.run(sql, [], function (err) {
    if (err) throw err;

    console.log('Likes: All data deleted');
    count++;

    const sql = 'DELETE FROM posts';

    db.run(sql, [], function (err) {
      if (err) throw err;

      console.log('Posts: All data deleted');
      count++;

      const sql = 'DELETE FROM users';

      db.run(sql, [], function (err) {
        if (err) throw err;

        console.log('Users: All data deleted');
        count++;

        const sql = "UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = 'users'";

        db.run(sql, [], function (err) {
          if (err) throw err;

          console.log('Users: reset ID counter');
          count++;

          const sql = "UPDATE `sqlite_sequence` SET `seq` = 0 WHERE `name` = 'posts'";
          db.run(sql, [], function (err) {
            if (err) throw err;

            console.log('Posts: reset ID counter');
            count++;

            console.log('All data deleted from all tables');
            console.log('****************************************');
          });
        });
      });
    });
  });
});
