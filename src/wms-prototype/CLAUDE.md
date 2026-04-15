# WMS 原型项目规范

> 基于「约束先行」原则，为 WMS 仓储管理系统原型建立规范

---

## 项目概述

- **项目路径**: `/Users/ai/.openclaw/workspace/wms-prototype/`
- **入口文件**: `index.html`
- **本地服务**: `http://localhost:8080/`
- **技术栈**: HTML + CSS + JavaScript (原生，无框架依赖)

---

## 目录结构

```
wms-prototype/
├── CLAUDE.md              # 本规范文件
├── README.md              # 项目说明
├── index.html              # 主入口（所有模块集成）
├── pages/                  # 模块 HTML（部分独立页面）
├── styles/                 # 样式文件
├── scripts/                # JavaScript 脚本
├── docs/                  # 需求文档、业务流程图
├── screenshots/           # 测试截图（按模块分类）
├── backups/               # 备份文件
└── test-results/          # 测试结果
```

---

## 截图分类规范

截图按模块分类存放于 `screenshots/` 目录：

| 目录 | 模块 | 说明 |
|------|------|------|
| `01_dashboard/` | 综合业务看板 | 统计数据、图表、任务预警 |
| `02_purchase_return/` | 采购退货 | ASN、入库、退货处理 |
| `03_exception/` | 货损定责/异常 | 异常处理、货损审批 |
| `04_pickup/` | 到仓自提 | 自提列表、批量核销 |
| `05_complaint/` | 客诉管理 | 工单列表、客诉处理 |
| `06_freight/` | 运费计算 | 承运商、计费规则 |
| `07_system/` | 系统管理 | 组织、用户、模块管理 |
| `08_delivery/` | 配送管理 | 配送返仓、到仓自提 |
| `09_quality/` | 质检管理 | 质检流程、质量报告 |
| `99_misc/` | 其他测试 | 滚动测试、样式调试、临时文件 |

### 截图命名规范

```
test-{功能}-{状态}.png
示例：
- test-delivery-scroll-0.png
- test-modal-final.png
- test-scroll-fixed.png
```

---

## 已完成模块

| 模块 | 状态 | 说明 |
|------|------|------|
| 综合业务看板 | ✅ 完成 | 统计卡片、图表、任务预警 |
| 采购退货管理 | ✅ 完成 | ASN、收货、退货 |
| 货损定责 | ✅ 完成 | 异常处理、审批流程 |
| 货损报废处理 | ✅ 完成 | 报废申请、审批 |
| 配送返仓 | ✅ 完成 | 横向滚动、sticky 固定列 |
| 到仓自提 | ✅ 完成 | 自提列表、批量核销 |
| 客诉与配送异常 | ✅ 完成 | 工单、批量指派 |
| 运费计算 | ✅ 完成 | 规则管理、批量设置 |
| 系统管理 | ✅ 完成 | 组织、用户、模块管理 |

---

## 关键开发规范

### HTML 规范
- 使用语义化标签
- 确保 div 标签平衡（修改后检查）
- 弹窗放在页面 div 内部，不要放在外部

### JavaScript 规范
- 函数名使用驼峰命名
- 括号和花括号匹配（修改后检查）
- 事件处理函数要绑定到 onclick

### CSS 规范
- 优先使用 CSS 类，少用内联样式
- 按钮样式：`padding: 6px 12px; font-size: 12px; border-radius: 50px`
- 滚动容器：`overflow-x: hidden`（父）+ `overflow-x: auto`（子）

---

## 测试规范

### 横向滚动测试
1. 访问 `http://localhost:8080/#delivery_return`
2. 使用触控板手势或 Shift+滚轮横向滚动
3. 验证首列（复选框+单号）和末列（操作）是否固定

### 弹窗测试
1. 点击按钮打开弹窗
2. 验证弹窗是否显示在页面内
3. 验证表单提交和关闭功能

---

## 相关文档

- 入口测试: `http://localhost:8080/`
- 配送返仓: `http://localhost:8080/#delivery_return`
- 原型设计技能: `skills/prototype-design/SKILL.md`
