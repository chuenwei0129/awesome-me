import storage from '@js/storage';

test('storage', () => {
  it('设置值', () => {
    storage.set('key', 'value');
    expect(localStorage.getItem('my-app-key')).toEqual('value');
  });

  it('获取值', () => {
    localStorage.setItem('my-app-newKey', 'newValue');
    expect(storage.get('newKey')).toEqual('newValue');
  });
});
