---
title: SWR 缓存策略
toc: content
order: -1000
---

# SWR (Stale-While-Revalidate) 缓存策略 🎉

## SWR 策略思想 🌟

**SWR** 是一种缓存控制协议，思想就是在指定的时间范围内，可以先使用失效的旧数据，同时请求最新的数据进行刷新。

### 示例：网页返回头 🖥️

```http
Cache-Control: max-age=60, stale-while-revalidate=3600
```

- **max-age=60**：表示数据可以缓存 60 秒
- **stale-while-revalidate=3600**：在 60 秒之后的 3600 秒之内，可以先使用失效的缓存数据并请求新的数据进行刷新

### 时间线 ⏳

1. **1 分钟**后，缓存失效
2. **接下来 1 小时**内，请求数据时仍可使用旧的缓存数据，并异步获取最新的数据以更新缓存

## SWR 在前端的数据请求缓存 📲

对于前端，SWR 常见的实现原理如下：

1. **优先使用本地缓存 (stale) 数据，立即显示**：即使缓存数据已过期也无妨，用户能立即看到数据
2. **重新请求检查最新数据是否更新 (revalidate)**：如果有变化，则更新本地状态

### 核心功能 ✨

- **维护请求的数据缓存**：减少重复请求，提升性能
- **自动检查和更新服务器端数据**：保持数据最新状态

## SWR 的名称来源 📚

**SWR**（stale-while-revalidate）这个名字来源于 HTTP RFC 5861 中推广的一种缓存失效策略。  
具体过程如下：

1. **stale**：首先从缓存中返回数据，即使缓存数据是过期的
2. **revalidate**：然后发送请求来验证数据是否更新
3. **更新数据**：最终获取最新的数据并再次更新缓存

这允许前端应用在不牺牲用户体验的情况下保持数据较为新鲜。 🚀
