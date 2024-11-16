interface Item {
  id: number;
  name: string;
  pid: number;
}

const _list: Item[] = [
  { id: 11, name: '公司1', pid: 0 },
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
];

interface Tree extends Item {
  children: Tree[];
}

const list2tree = (list: Item[], pid: number): Tree[] => {
  return list
    .filter((item) => item.pid === pid)
    .map((item) => ({
      ...item,
      children: list2tree(list, item.id),
    }));
};

console.dir(list2tree(_list, 0), { depth: 10 });

// 可能不止一个 pid === 0
const another = (list: Item[]) => {
  const treeGroup: Tree[] = [];
  const cache = new Map<Item['id'], Tree>();
  list.forEach((item) => {
    const currNode = { ...item, children: [] };
    if (!cache.has(item.pid)) {
      cache.set(item.id, currNode);
      treeGroup.push(currNode);
    } else {
      // 插入父节点
      cache.get(item.pid)?.children.push(currNode);
      cache.set(item.id, currNode);
    }
  });

  return treeGroup;
};

console.dir(another(_list), { depth: 10 });
