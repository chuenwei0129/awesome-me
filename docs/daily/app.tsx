/**
 * defaultShowCode: true
 */
import React from 'react';

const ScriptComponent = () => {
  const runScript = () => {
    async function async2() {
      console.log('async2');
    }

    async function async1() {
      console.log('async1 start');
      await async2();
      console.log('async1 end');
    }

    console.log('script start');

    setTimeout(function () {
      console.log('setTimeout');
    }, 0);

    async1();

    new Promise(function (resolve) {
      console.log('promise1');
      resolve();
    }).then(function () {
      console.log('promise2');
    });

    console.log('script end');
  };

  return (
    <div className="p-4">
      <button type="button" onClick={runScript} className="px-4 py-2 bg-blue-500 text-white rounded">
        打印顺序是什么？
      </button>
    </div>
  );
};

export default ScriptComponent;
