# WMS 仓储管理系统原型

基于 HTML + CSS + JavaScript 的单页应用原型，用于演示 WMS 仓储管理系统的各个模块。

## 快速开始

```bash
# 启动本地服务
cd /Users/ai/.openclaw/workspace/wms-prototype
python3 -m http.server 8080

# 访问
open http://localhost:8080/
```

## 模块列表

| 模块 | Hash | 说明 |
|------|------|------|
| 综合业务看板 | `#dashboard` | 统计卡片、图表、任务预警 |
| 采购退货 | `#purchase_return` | ASN、收货、退货 |
| 货损定责 | `#exception` | 异常处理、审批 |
| 货损报废 | `#disposal` | 报废申请 |
| 配送返仓 | `#delivery_return` | 横向滚动表格 |
| 到仓自提 | `#pickup` | 自提管理 |
| 客诉异常 | `#complaint` | 工单管理 |
| 运费计算 | `#freight` | 规则管理 |
| 系统管理 | `#system` | 组织、用户、模块 |

## 项目规范

详见 [CLAUDE.md](CLAUDE.md)

## 技术说明

- **无框架依赖**: 原生 HTML/CSS/JS
- **设计系统**: Ant Design 风格
- **图标**: Font Awesome
- **字体**: 阿里巴巴普惠体 / PingFang SC
