import { atom, useAtomValue, useSetAtom } from "jotai"
import React from "react"
// 首先定义了一个 animeAtom 原生原子，其次再定义了一个 watchedAnimeAtom 派生原子，同时它也是一个只读派生原子。可以看出，watchedAnimeAtom 依赖于 animeAtom，它会过滤掉 animeAtom 中 watched 为 false 的元素，得到一个新的只读原子。这个例子中，点击 button 触发 animeAtom 的值改变，watchedAnimeAtom 也会重新计算自己的值，触发组件 Re-Render。
/**
 * 定义一个AnimeType类型，用于描述动漫的信息
 */
type AnimeType = {
  name: string
  episodes: number
  watched: boolean
}

/**
 * 创建一个jotai的atom，用于存储动漫列表
 * 初始化时包含三部动漫，每部动漫都包含名称、集数和是否观看过的信息
 */
export const animeAtom = atom<AnimeType[]>([
  { name: 'Naruto', episodes: 220, watched: true },
  { name: 'One Piece', episodes: 1000, watched: false },
  { name: 'Dragon Ball', episodes: 153, watched: true }
])

/**
 * 创建一个派生的atom，用于存储观看过的动漫列表
 * 它会根据animeAtom中的数据过滤出所有观看过的动漫
 */
export const watchedAnimeAtom = atom<AnimeType[]>((get) => {
  const anime = get(animeAtom)
  return anime.filter((a) => a.watched)
})

/**
 * App组件，用于展示观看过的动漫列表，并提供添加新动漫的功能
 */
export default function App() {
  const watchedAnime = useAtomValue(watchedAnimeAtom)
  const setAnime = useSetAtom(animeAtom)

  /**
   * 处理添加按钮点击事件的函数
   * 点击后会在动漫列表中添加一部新的观看过的动漫
   */
  const handleAddClick = () => {
    setAnime((prev: AnimeType[]) => [
      ...prev,
      { name: 'Cowboy Bebop', episodes: 26, watched: true }
    ])
  }

  return (
    <div>
      <div>
        {Math.random()}
        <h1>Watched Anime:</h1>
        <ul>
          {watchedAnime.map((anime, index) => (
            <li key={index}>
              {anime.name}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleAddClick}
      >
        Add Cowboy Bebop
      </button>
    </div>
  )
}

// 对于只读派生原子而言，可以通过 useAtomValue 来获取它的值。
// 需要注意的是：只能通过修改原生原子的值来触发只读派生原子状态值的改变。
// 因为只读派生原子本身是没有 setter 方法，不能利用 useSetAtom(readOnlyDerivedAtom) 来修改它的值。
