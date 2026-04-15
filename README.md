# Prototype Design Skill - AI 辅助原型设计技能

> 基于多种设计风格（默认Figma 风格） UI 的复杂性 HTML 原型开发技能（如wms等），58+ 设计系统支持

![Preview](docs/preview.png)

## 🎯 项目简介

这是一个 **AI 辅助原型设计技能**，可以帮助你快速开发前端原型页面。

- **无需设计基础**：AI 帮你生成 UI 代码
- **58+ 设计系统**：可选择 Figma、Linear、Vercel 等风格
- **纯前端实现**：HTML/CSS/JS，无框架依赖
- **配套案例**：包含完整的 WMS（仓库管理系统）原型作为参考

## 📦 技能内容

```
prototype-design-skill/
├── SKILL.md                 # 核心技能文档 ⭐
├── references/               # 参考资料
│   ├── design-systems.md    # 设计系统说明
│   └── ...
├── src/
│   └── wms-prototype/       # WMS 原型案例（50+页面）
│       ├── index.html
│       ├── pages/
│       ├── styles/
│       └── scripts/
└── docs/
    └── preview.png          # 预览图
```

## 🚀 快速开始

### 1. 安装技能

将 `SKILL.md` 复制到你的 OpenClaw 技能目录：

```bash
cp SKILL.md ~/.openclaw/workspace/skills/prototype-design/SKILL.md
```

### 2. 使用技能

告诉 AI：

```
我需要创建一个商品管理页面，使用 Figma 风格
```

AI 会自动按照技能文档中的规范帮你生成页面。

### 3. 选择设计系统

支持 58+ 设计系统，指定 `DESIGN_SYSTEM=<名称>`：

| 设计系统 | 说明 |
|---------|------|
| figma | 默认 Figma 风格 |
| linear | Linear App 风格 |
| vercel | Vercel 官网风格 |
| ... | 还有 55+ 个 |

## 📝 技能功能

- ✅ 创建管理页面原型
- ✅ 实现业务文档中的功能模块
- ✅ 设计弹窗和详情页
- ✅ 构建带看板和列表视图的页面
- ✅ 纯前端实现，快速出效果

## 💡 AI 辅助开发方法

### 核心流程

```
需求分析 → 原型规划 → 页面生成 → 细节优化
```

### 关键技巧

1. **提供参考**：给 AI 一个现有页面作为风格参考
2. **分步生成**：不要一次生成整个项目，一点一点来
3. **明确约束**：告诉 AI 你的技术栈、命名规范
4. **迭代优化**：边做边调整

### 示例对话

```
你：请帮我生成一个商品库页面，需要列表展示和筛选功能

AI：我来帮你生成一个商品库页面...
（生成代码）

你：很好，但表格列宽需要调整一下，库存状态用颜色区分

AI：好的，我来调整...
```

## 📄 WMS 原型案例

技能配套了一个完整的 WMS（仓库管理系统）原型，包含 50+ 页面：

| 模块 | 页面数 |
|------|--------|
| 概览 | 1 |
| 基础档案 | 8 |
| 作业配置 | 4 |
| 库存中心 | 4 |
| 单据中心 | 8 |
| 异常管理 | 3 |
| 物流管理 | 2 |
| 日志中心 | 3 |
| 数据统计 | 5 |
| 系统管理 | 3 |

**总页面数：50+**

## 🎨 技术栈

- **HTML5**：语义化标签
- **CSS3**：Flexbox + Grid 布局
- **JavaScript**：原生 ES6+
- **设计系统**：支持 58+ 种风格

## 📚 详细文档

- [技能文档](SKILL.md) - 完整使用说明
- [设计系统列表](references/design-systems.md) - 支持的设计系统

## 🤝 贡献

设计风格用引用了VoltAgent大神的设计能力，项目文档：[awesome-design](https://github.com/VoltAgent/awesome-design-md)，
项目约束结构引用了卡兹卡大神的约束先行原则。感谢两位大神。
欢迎提交 Issue 和 PR！

## 📄 License

MIT License

---

_star 使用技能过程中遇到问题？欢迎在 GitHub 提 Issue！_
