type Color = 'red' | 'blue';
type Quantity = 'one' | 'two';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SeussFish = `${Quantity | Color} fish`; // 类型为 'one fish' | 'two fish' | 'red fish' | 'blue fish'
