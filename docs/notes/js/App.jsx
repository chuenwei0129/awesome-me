// App.jsx
import { useMemo, useState } from 'react';
import BitSet from './BitSet';
import { allBrands, allColors, priceRanges, products } from './products';
import './t.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceKeys, setSelectedPriceKeys] = useState([]);

  const total = products.length;

  // 预构建：每个条件对应一个 BitSet（位图索引）
  const { brandBitmap, colorBitmap, priceBitmap } = useMemo(() => {
    const brandBitmap = {};
    allBrands.forEach((b) => (brandBitmap[b] = new BitSet(total)));

    const colorBitmap = {};
    allColors.forEach((c) => (colorBitmap[c] = new BitSet(total)));

    const priceBitmap = {};
    priceRanges.forEach((pr) => {
      priceBitmap[pr.key] = new BitSet(total);
    });

    products.forEach((p, index) => {
      // 品牌
      brandBitmap[p.brand].set(index);
      // 颜色
      colorBitmap[p.color].set(index);
      // 价格区间
      priceRanges.forEach((pr) => {
        if (p.price >= pr.min && p.price < pr.max) {
          priceBitmap[pr.key].set(index);
        }
      });
    });

    return { brandBitmap, colorBitmap, priceBitmap };
  }, [total]);

  // 位运算过滤
  const filteredProducts = useMemo(() => {
    if (total === 0) return [];

    // 先建一个全 1 的 BitSet（全部商品都候选）
    const result = new BitSet(total);
    for (let i = 0; i < total; i++) {
      result.set(i);
    }

    // 品牌：多选 OR，然后 AND 汇总
    if (selectedBrands.length > 0) {
      const union = brandBitmap[selectedBrands[0]].clone();
      for (let i = 1; i < selectedBrands.length; i++) {
        union.or(brandBitmap[selectedBrands[i]]);
      }
      result.and(union);
    }

    // 颜色
    if (selectedColors.length > 0) {
      const union = colorBitmap[selectedColors[0]].clone();
      for (let i = 1; i < selectedColors.length; i++) {
        union.or(colorBitmap[selectedColors[i]]);
      }
      result.and(union);
    }

    // 价格区间
    if (selectedPriceKeys.length > 0) {
      const union = priceBitmap[selectedPriceKeys[0]].clone();
      for (let i = 1; i < selectedPriceKeys.length; i++) {
        union.or(priceBitmap[selectedPriceKeys[i]]);
      }
      result.and(union);
    }

    // 从位图拿出真正的商品列表
    let res = [];
    for (let i = 0; i < total; i++) {
      if (result.get(i)) {
        res.push(products[i]);
      }
    }

    // 最后再做文本搜索（按名称）
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      res = res.filter((p) => p.name.toLowerCase().includes(kw));
    }

    return res;
  }, [
    total,
    brandBitmap,
    colorBitmap,
    priceBitmap,
    selectedBrands,
    selectedColors,
    selectedPriceKeys,
    keyword,
  ]);

  const toggleArrayItem = (arr, value) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>React + 位图索引 Demo：多条件过滤</h2>

      {/* 搜索 */}
      <div style={{ marginBottom: 16 }}>
        <label>
          搜索（按名称）：
          <input
            style={{ marginLeft: 8 }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="iphone / galaxy / mate..."
          />
        </label>
      </div>

      {/* 品牌 */}
      <div style={{ marginBottom: 16 }}>
        <div>品牌（多选 OR）：</div>
        {allBrands.map((b) => (
          <label key={b} style={{ marginRight: 12 }}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(b)}
              onChange={() =>
                setSelectedBrands((prev) => toggleArrayItem(prev, b))
              }
            />
            {b}
          </label>
        ))}
      </div>

      {/* 颜色 */}
      <div style={{ marginBottom: 16 }}>
        <div>颜色（多选 OR）：</div>
        {allColors.map((c) => (
          <label key={c} style={{ marginRight: 12 }}>
            <input
              type="checkbox"
              checked={selectedColors.includes(c)}
              onChange={() =>
                setSelectedColors((prev) => toggleArrayItem(prev, c))
              }
            />
            {c}
          </label>
        ))}
      </div>

      {/* 价格区间 */}
      <div style={{ marginBottom: 16 }}>
        <div>价格区间（多选 OR）：</div>
        {priceRanges.map((pr) => (
          <label key={pr.key} style={{ marginRight: 12 }}>
            <input
              type="checkbox"
              checked={selectedPriceKeys.includes(pr.key)}
              onChange={() =>
                setSelectedPriceKeys((prev) => toggleArrayItem(prev, pr.key))
              }
            />
            {pr.label}
          </label>
        ))}
      </div>

      {/* 结果 */}
      <div>
        <h3>
          结果（{filteredProducts.length} / {products.length}）
        </h3>
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: 'collapse', minWidth: 500 }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>品牌</th>
              <th>颜色</th>
              <th>价格</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.color}</td>
                <td>{p.price}</td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  没有符合条件的商品
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
