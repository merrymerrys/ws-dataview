---
title: 更新记录
icon: clock
date: 2023-08-26
---

::: info
该页记录了 **Ws DataView** 的更新日志
:::

## ws-dataview v1.0.0 (2022-10-06)

+ 国庆节赶工制作，第一版release
+ 文档构建基于 [vuepress-theme-reco v1.6.0](https://vuepress-theme-reco.recoluan.com/)

## ws-dataview v1.1.0 (2023-05-03)

+ 优化：部分选项调整为默认使能
+ 优化：状态管理重构，持久化方案由手动管理转为 `vuex-persistedstate` 自动管理
+ 新增：数据统计组件 statistic，记录网络日志与报警次数
+ 新增：图表页添加转速、轴心轨迹图
+ 优化：WebSocket新增数据包类型，以适应新增图表功能
+ 改动：移除了服务器留言功能

## ws-dataview v1.2.0 (2023-08-26)

+ 优化：优化了自动采集部分的计算逻辑，并提供一组工艺信号的数据接口
+ 优化：提供配置参数热更新
+ 新增：工艺信号数据校准组件
+ 新增：数据库统计条数与数据库抽检结果展示组件
+ 新增：文档基于 [vuepress-theme-hope 2.0.0-beta.235](https://theme-hope.vuejs.press/zh/) 重构
