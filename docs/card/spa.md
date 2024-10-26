---
title: SPA
---

在 web 中，一次页面刷新意味着资源重置，延迟非常大（缓存策略又会导致更新不及时），请求数据量的增多也会对服务器造成负担。

为了解决这些问题，web 引入了单页面，防止刷新资源引起的网络和 js 重复编译的延迟，并增强了用户体验。

所以，当资源大小已经使你不得不采用 SPA 的时候，当用户的网络延迟已经使你不得不采用 SPA 的时候，才是 SPA 出马的时候。比如银行系统数以千万记的一次请求，比如企业 CMS 的增加效率，使得操作零延迟，比如复杂的功能实现，步骤繁琐到使用“静态页面”用户使用体验会极差。如果不是上诉情况，根本没有使用 SPA 的必要。