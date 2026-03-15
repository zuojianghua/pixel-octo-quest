# 像素修仙卡牌网页游戏 MVP

## TL;DR

&gt; **Quick Summary**: 使用 Phaser.js 开发一个复古像素风格的修仙主题卡牌网页游戏，包含自动战斗、经典修仙境界、装备法宝、灵根天赋系统，数据保存在浏览器本地。
&gt; 
&gt; **Deliverables**:
&gt; - 完整的可运行游戏
&gt; - 自动战斗系统 + 卡牌组合
&gt; - 经典修仙境界体系
&gt; - 装备/法宝 + 灵根/天赋养成
&gt; - 浏览器本地存档
&gt; 
&gt; **Estimated Effort**: Large
&gt; **Parallel Execution**: YES - 6 waves
&gt; **Critical Path**: 项目搭建 → 状态管理 → 修仙系统 + 卡牌系统 → 战斗系统 → 集成 → QA

---

## Context

### Original Request
开发一个像素风格的修仙主题卡牌网页游戏

### Interview Summary
**Key Discussions**:
- 核心玩法：自动战斗 + 卡牌组合
- 修仙体系：经典体系（练气→筑基→金丹→元婴...）
- 技术栈：Phaser.js 游戏引擎
- MVP范围：战斗 + 养成，重点是装备/法宝、灵根/天赋
- 卡牌类型：攻击、防御、辅助、特殊（法宝/功法）
- 美术风格：复古像素风格（8x8/16x16），使用开源素材
- 存档方式：浏览器本地存档（localStorage）
- 测试：手动/代理QA，无自动化测试

**Research Findings**:
- Phaser.js 原生支持像素艺术模式，有专门的 Phaser PixUI 库
- 参考项目：Princess Okoku（像素卡牌游戏）、Phaser TCG 框架

### Metis Review
**Identified Gaps** (addressed with defaults):
- MVP修仙境界数量：默认包含练气→筑基→金丹三个境界
- 卡牌数量：默认每种类型至少5张卡牌
- 自动战斗细节：默认完全自动化，只支持战前组牌
- 设备支持：默认桌面优先，不做移动端优化
- 语言：默认简体中文
- 存档数据：保存境界、卡牌、装备、灵根、天赋、资源

---

## Work Objectives

### Core Objective
使用 Phaser.js 开发一个功能完整的像素风格修仙卡牌网页游戏 MVP，包含自动战斗、经典修仙境界、装备法宝、灵根天赋系统。

### Concrete Deliverables
- 可运行的网页游戏
- 自动战斗系统
- 卡牌收集与组牌系统
- 修仙境界系统
- 装备/法宝系统
- 灵根/天赋系统
- 浏览器本地存档

### Definition of Done
- [ ] 游戏可在现代浏览器中正常运行
- [ ] 完整的游戏流程可正常走通
- [ ] 所有主要功能无严重bug
- [ ] 存档功能正常工作

### Must Have
- 自动战斗系统
- 4种卡牌类型（攻击、防御、辅助、特殊）
- 经典修仙境界（练气→筑基→金丹）
- 装备/法宝系统
- 灵根/天赋系统
- 浏览器本地存档
- 复古像素风格

### Must NOT Have (Guardrails)
- 多人联机对战
- 云存档
- 商城/内购
- 自定义像素美术创作（仅使用开源素材）
- 后端集成（纯客户端）
- 多语言支持
- 难度调节
- 模组支持

---

## Verification Strategy

&gt; **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO
- **Automated tests**: None
- **Framework**: N/A
- **If TDD**: N/A

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright — Navigate, interact, assert DOM, screenshot
- **Game Logic**: Use interactive_bash (tmux) with browser automation
- **Save System**: Use browser DevTools to verify localStorage

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — Foundation):
├── Task 1: Phaser.js 项目搭建与配置 [quick]
└── Task 2: 需求确认与最终范围确定 [quick]

Wave 2 (After Wave 1 — Core Infrastructure):
├── Task 3: 游戏状态管理与存档系统 [deep]
└── Task 4: UI 框架与像素资源整合 [visual-engineering]

Wave 3 (After Wave 2 — Game Systems):
├── Task 5: 修仙境界系统实现 [deep]
└── Task 6: 卡牌系统与组牌功能 [deep]

Wave 4 (After Wave 3 — Combat):
└── Task 7: 自动战斗系统实现 [ultrabrain]

Wave 5 (After Wave 4 — Integration):
└── Task 8: 全系统集成与修复 [deep]

Wave 6 (After Wave 5 — QA):
└── Task 9: QA 测试与平衡调整 [deep]

Critical Path: Task 1 → Task 3 → Task 5 + 6 → Task 7 → Task 8 → Task 9
Parallel Speedup: ~35% faster than sequential
Max Concurrent: 2 tasks per wave
```

### Dependency Matrix

- **1**: — — 3, 4
- **2**: — — 3, 4
- **3**: 1, 2 — 5, 6
- **4**: 1, 2 — 8
- **5**: 3 — 7
- **6**: 3 — 7
- **7**: 5, 6 — 8
- **8**: 7, 4 — 9
- **9**: 8 — FINAL

### Agent Dispatch Summary

- **1**: **2** — T1→`quick`, T2→`quick`
- **2**: **2** — T3→`deep`, T4→`visual-engineering`
- **3**: **2** — T5→`deep`, T6→`deep`
- **4**: **1** — T7→`ultrabrain`
- **5**: **1** — T8→`deep`
- **6**: **1** — T9→`deep`

---

## TODOs

- [ ] 1. Phaser.js 项目搭建与配置

  **What to do**:
  - 初始化 Phaser.js v3 项目，使用 Vite 作为构建工具
  - 配置像素艺术模式（`pixelArt: true`）
  - 搭建项目目录结构
  - 配置开发服务器与生产构建
  - 验证项目可以正常运行

  **Must NOT do**:
  - 不要实现任何游戏逻辑
  - 不要添加自定义美术资源
  - 不要配置后端

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 标准的项目初始化任务
  - **Skills**: [`web-artifacts-builder`]
    - `web-artifacts-builder`: 用于现代前端项目配置
  - **Skills Evaluated but Omitted**:
    - `frontend-design`: 不需要，只是基础配置
    - `playwright`: 不需要，还没到测试阶段

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 2)
  - **Blocks**: Task 3, Task 4
  - **Blocked By**: None (can start immediately)

  **References**:
  - Phaser.js 官方文档: https://phaser.io/tutorials/getting-started-phaser3
  - Vite + Phaser 模板: https://github.com/phaserjs/template-vite-ts
  - Phaser 像素模式配置: https://newdocs.phaser.io/docs/3.80.0/Phaser.Types.Core.RenderConfig#pixelArt

  **Acceptance Criteria**:
  - [ ] 项目可以在 `http://localhost:5173` 正常访问
  - [ ] 像素模式配置生效，渲染无模糊
  - [ ] `npm run build` 可以生成生产构建

  **QA Scenarios**:
  ```
  Scenario: 项目启动验证
    Tool: Playwright
    Preconditions: 项目已初始化，依赖已安装
    Steps:
      1. 运行 `npm run dev`
      2. 等待服务器启动
      3. 访问 `http://localhost:5173`
      4. 验证页面正常加载
    Expected Result: 页面显示 Phaser 欢迎界面，无错误
    Evidence: .sisyphus/evidence/task-1-project-start.png

  Scenario: 像素模式验证
    Tool: Playwright
    Preconditions: 项目已运行
    Steps:
      1. 检查 Phaser 配置
      2. 验证 `pixelArt: true` 已设置
      3. 检查渲染使用 nearest-neighbor 插值
    Expected Result: 像素渲染清晰，无模糊
    Evidence: .sisyphus/evidence/task-1-pixel-mode.png
  ```

  **Commit**: YES
  - Message: `chore: init Phaser.js project with Vite and pixel mode`
  - Files: `package.json`, `vite.config.ts`, `index.html`, `src/main.ts`
  - Pre-commit: `npm run build`

- [ ] 2. 需求确认与最终范围确定

  **What to do**:
  - 确认 MVP 包含的修仙境界数量（默认练气→筑基→金丹）
  - 确认每种卡牌类型的数量（默认每种至少5张）
  - 确认自动战斗的细节（默认完全自动化，战前组牌）
  - 确认设备支持（默认桌面优先）
  - 确认语言（默认简体中文）
  - 确认存档数据的具体内容

  **Must NOT do**:
  - 不要修改代码
  - 不要实现任何功能

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 简单的需求确认任务
  - **Skills**: []
    - 不需要特殊技能
  - **Skills Evaluated but Omitted**:
    - 所有技能都不需要

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Task 1)
  - **Blocks**: Task 3, Task 4
  - **Blocked By**: None (can start immediately)

  **References**:
  - 草稿文件: `.sisyphus/drafts/pixel-xiuxian-card-game.md`

  **Acceptance Criteria**:
  - [ ] 所有需求问题得到明确回答
  - [ ] 最终范围文档完成

  **QA Scenarios**:
  ```
  Scenario: 需求确认完成
    Tool: Read
    Preconditions: 已与用户沟通
    Steps:
      1. 检查所有需求问题是否有答案
      2. 验证范围文档是否完整
    Expected Result: 所有需求明确，范围文档完成
    Evidence: .sisyphus/evidence/task-2-requirements-confirmed.md
  ```

  **Commit**: NO (no code changes)

- [ ] 3. 游戏状态管理与存档系统

  **What to do**:
  - 实现中心化的游戏状态管理
  - 实现 localStorage 保存/加载功能
  - 实现存档数据损坏处理（优雅降级）
  - 确保状态更改的不可变性

  **Must NOT do**:
  - 不要使用 IndexedDB（用 localStorage 即可）
  - 不要实现云存档

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 需要仔细的架构设计确保状态一致性
  - **Skills**: []
    - 核心逻辑实现
  - **Skills Evaluated but Omitted**:
    - 不需要特殊技能

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 4)
  - **Blocks**: Task 5, Task 6
  - **Blocked By**: Task 1, Task 2

  **References**:
  - Phaser 数据管理: https://newdocs.phaser.io/docs/3.80.0/Phaser.Data.DataManager
  - localStorage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

  **Acceptance Criteria**:
  - [ ] 状态可以在页面刷新后保持
  - [ ] 存档数据损坏时可以优雅重置
  - [ ] 所有状态更改都是不可变的

  **QA Scenarios**:
  ```
  Scenario: 存档功能验证
    Tool: Playwright
    Preconditions: 游戏已运行
    Steps:
      1. 修改游戏状态
      2. 触发保存
      3. 检查 localStorage 中有存档数据
      4. 刷新页面
      5. 验证状态正确恢复
    Expected Result: 状态正确保存和恢复
    Evidence: .sisyphus/evidence/task-3-save-load.png

  Scenario: 损坏存档处理
    Tool: Playwright
    Preconditions: 游戏已运行
    Steps:
      1. 写入损坏的 JSON 到 localStorage
      2. 刷新页面
      3. 验证游戏优雅重置而非崩溃
    Expected Result: 游戏正常启动，存档被重置
    Evidence: .sisyphus/evidence/task-3-corrupted-save.png
  ```

  **Commit**: YES
  - Message: `feat(core): implement state management and save system`
  - Files: `src/stores/gameStore.ts`, `src/utils/save.ts`
  - Pre-commit: `npm run build`

- [ ] 4. UI 框架与像素资源整合

  **What to do**:
  - 寻找并整合 CC0/CC BY 开源像素艺术素材
  - 实现所有 UI 界面：主菜单、修仙界面、组牌界面、战斗界面、设置
  - 添加基础动画效果
  - 使用 Phaser PixUI 或类似库

  **Must NOT do**:
  - 不要创建自定义像素美术
  - 不要使用非开源素材

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI/UX 和视觉实现
  - **Skills**: [`frontend-design`, `web-artifacts-builder`]
    - `frontend-design`: 用于精美的像素艺术 UI 设计
    - `web-artifacts-builder`: 用于现代 UI 组件实现
  - **Skills Evaluated but Omitted**:
    - 其他技能不相关

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 3)
  - **Blocks**: Task 8
  - **Blocked By**: Task 1, Task 2

  **References**:
  - Phaser PixUI: https://github.com/phaserjs/pixui
  - OpenGameArt.org: https://opengameart.org/
  - itch.io 免费素材: https://itch.io/game-assets/free/tag-pixel-art

  **Acceptance Criteria**:
  - [ ] 所有 UI 界面可以正常导航
  - [ ] 像素资源渲染正确，无变形
  - [ ] 所有按钮在 100ms 内响应点击

  **QA Scenarios**:
  ```
  Scenario: UI 导航验证
    Tool: Playwright
    Preconditions: 游戏已运行
    Steps:
      1. 点击主菜单按钮
      2. 验证可以导航到各个界面
      3. 验证可以返回主菜单
    Expected Result: 所有界面可正常导航
    Evidence: .sisyphus/evidence/task-4-ui-navigation.png

  Scenario: 像素资源渲染
    Tool: Playwright
    Preconditions: 游戏已运行
    Steps:
      1. 检查所有像素资源
      2. 验证渲染清晰无模糊
      3. 验证没有变形
    Expected Result: 像素资源渲染正确
    Evidence: .sisyphus/evidence/task-4-pixel-assets.png
  ```

  **Commit**: YES
  - Message: `feat(ui): integrate pixel art assets and implement all UI screens`
  - Files: `src/scenes/`, `src/assets/`, `src/ui/`
  - Pre-commit: `npm run build`

- [ ] 5. 修仙境界系统实现

  **What to do**:
  - 实现修仙境界系统（练气→筑基→金丹）
  - 实现修为/经验值计算
  - 实现突破机制
  - 实现灵根/天赋加成
  - 实现属性计算

  **Must NOT do**:
  - 不要实现超过金丹的境界（MVP范围）
  - 不要实现太复杂的突破机制

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 需要复杂的逻辑和平衡
  - **Skills**: []
    - 核心游戏逻辑实现
  - **Skills Evaluated but Omitted**:
    - 不需要特殊技能

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 6)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3

  **References**:
  - 经典修仙境界体系

  **Acceptance Criteria**:
  - [ ] 所有修仙境界功能正常
  - [ ] 属性加成正确应用
  - [ ] 突破机制按预期工作

  **QA Scenarios**:
  ```
  Scenario: 境界提升验证
    Tool: Playwright
    Preconditions: 游戏已运行
    Steps:
      1. 增加修为到突破临界点
      2. 触发突破
      3. 验证境界提升
      4. 验证属性正确增加
    Expected Result: 境界成功提升，属性增加
    Evidence: .sisyphus/evidence/task-5-realm-upgrade.png

  Scenario: 灵根加成验证
    Tool: Playwright
    Preconditions: 游戏已运行
    Steps:
      1. 分配不同灵根
      2. 验证对应属性有正确加成
    Expected Result: 灵根加成正确应用
    Evidence: .sisyphus/evidence/task-5-spirit-root.png
  ```

  **Commit**: YES
  - Message: `feat(cultivation): implement realm system, spirit roots, and talents`
  - Files: `src/systems/cultivation.ts`, `src/types/cultivation.ts`
  - Pre-commit: `npm run build`

- [ ] 6. 卡牌系统与组牌功能

  **What to do**:
  - 实现4种卡牌类型（攻击、防御、辅助、特殊）
  - 实现卡牌背包管理
  - 实现组牌功能（包含最小/最大限制）
  - 实现卡牌获取逻辑

  **Must NOT do**:
  - 不要实现超过4种卡牌类型
  - 不要实现卡牌交易系统

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 复杂的卡牌系统架构
  - **Skills**: []
    - 核心游戏逻辑实现
  - **Skills Evaluated but Omitted**:
    - 不需要特殊技能

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 5)
  - **Blocks**: Task 7
  - **Blocked By**: Task 3

  **References**:
  - Princess Okoku 卡牌系统
  - Phaser TCG 框架

  **Acceptance Criteria**:
  - [ ] 卡牌可以被收集
  - [ ] 可以在限制范围内组牌
  - [ ] 所有卡牌类型有正确的基础属性

  **QA Scenarios**:
  ```
  Scenario: 组牌功能验证
    Tool: Playwright
    Preconditions: 游戏已运行，有卡牌可用
    Steps:
      1. 打开组牌界面
      2. 添加卡牌到卡组
      3. 验证不能超过最大限制
      4. 验证不能少于最小限制
      5. 保存卡组
    Expected Result: 组牌功能正常，限制生效
    Evidence: .sisyphus/evidence/task-6-deck-building.png

  Scenario: 卡牌类型验证
    Tool: Read
    Preconditions: 代码已实现
    Steps:
      1. 检查4种卡牌类型都已实现
      2. 验证每种类型有正确的属性
    Expected Result: 所有卡牌类型实现正确
    Evidence: .sisyphus/evidence/task-6-card-types.md
  ```

  **Commit**: YES
  - Message: `feat(cards): implement card system, inventory, and deck building`
  - Files: `src/systems/cards.ts`, `src/types/cards.ts`, `src/data/cards/`
  - Pre-commit: `npm run build`

- [ ] 7. 自动战斗系统实现

  **What to do**:
  - 实现回合制自动战斗逻辑
  - 实现卡牌抽取/使用算法
  - 实现战斗计算
  - 实现胜负判定
  - 实现奖励分发

  **Must NOT do**:
  - 不要实现玩家战斗中的手动操作
  - 不要实现 PvP 战斗

  **Recommended Agent Profile**:
  - **Category**: `ultrabrain`
    - Reason: 复杂的战斗系统，有很多边缘情况
  - **Skills**: []
    - 高复杂度逻辑实现
  - **Skills Evaluated but Omitted**:
    - 不需要特殊技能

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 4 (sequential)
  - **Blocks**: Task 8
  - **Blocked By**: Task 5, Task 6

  **References**:
  - 自动战斗系统设计模式

  **Acceptance Criteria**:
  - [ ] 自动战斗可以在无用户输入的情况下运行
  - [ ] 战斗计算准确
  - [ ] 胜利时奖励正确分发

  **QA Scenarios**:
  ```
  Scenario: 自动战斗运行
    Tool: Playwright
    Preconditions: 游戏已运行，有卡组
    Steps:
      1. 开始战斗
      2. 观察战斗自动进行
      3. 验证战斗完整结束
      4. 验证胜负判定正确
    Expected Result: 战斗自动完整运行，结果正确
    Evidence: .sisyphus/evidence/task-7-auto-battle.gif

  Scenario: 1000次战斗无崩溃
    Tool: Playwright + script
    Preconditions: 游戏已运行
    Steps:
      1. 运行脚本执行1000次连续战斗
      2. 验证没有崩溃
    Expected Result: 1000次战斗全部成功运行
    Evidence: .sisyphus/evidence/task-7-1000-battles.md
  ```

  **Commit**: YES
  - Message: `feat(combat): implement auto-battle system with turn logic and rewards`
  - Files: `src/systems/combat.ts`, `src/scenes/CombatScene.ts`
  - Pre-commit: `npm run build`

- [ ] 8. 全系统集成与修复

  **What to do**:
  - 将所有游戏逻辑与 UI 集成
  - 修复跨系统的 bug
  - 确保所有功能无缝协作

  **Must NOT do**:
  - 不要添加新功能
  - 只修复现有问题

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 复杂的集成任务
  - **Skills**: [`playwright`]
    - `playwright`: 用于自动化集成测试
  - **Skills Evaluated but Omitted**:
    - 其他技能不相关

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 5 (sequential)
  - **Blocks**: Task 9
  - **Blocked By**: Task 7, Task 4

  **References**:
  - 集成测试最佳实践

  **Acceptance Criteria**:
  - [ ] 没有严重 bug
  - [ ] 所有功能端到端正常工作

  **QA Scenarios**:
  ```
  Scenario: 完整游戏流程
    Tool: Playwright
    Preconditions: 游戏已运行
    Steps:
      1. 从主菜单开始
      2. 进行组牌
      3. 进入战斗
      4. 战斗结束后查看奖励
      5. 查看修仙境界
      6. 保存游戏
    Expected Result: 完整流程无 bug
    Evidence: .sisyphus/evidence/task-8-full-playthrough.gif
  ```

  **Commit**: YES
  - Message: `fix: integrate all systems and fix cross-system bugs`
  - Files: `src/` (multiple files)
  - Pre-commit: `npm run build`

- [ ] 9. QA 测试与平衡调整

  **What to do**:
  - 执行完整的 QA 测试
  - 调整卡牌和战斗平衡
  - 修复剩余的边缘情况 bug

  **Must NOT do**:
  - 不要添加新功能
  - 只修复和调整

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 需要彻底的测试和平衡
  - **Skills**: [`playwright`]
    - `playwright`: 用于批量战斗模拟测试
  - **Skills Evaluated but Omitted**:
    - 其他技能不相关

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 6 (sequential)
  - **Blocks**: None
  - **Blocked By**: Task 8

  **References**:
  - 游戏平衡最佳实践

  **Acceptance Criteria**:
  - [ ] 所有验收标准满足
  - [ ] 没有严重 bug
  - [ ] 没有单张卡牌胜率超过 60%

  **QA Scenarios**:
  ```
  Scenario: 卡牌平衡测试
    Tool: Playwright + script
    Preconditions: 游戏已运行
    Steps:
      1. 运行脚本测试每张卡牌的胜率
      2. 验证没有单张卡牌胜率超过 60%
    Expected Result: 所有卡牌胜率在合理范围内
    Evidence: .sisyphus/evidence/task-9-balance-report.md

  Scenario: 全面 QA 检查
    Tool: Playwright
    Preconditions: 游戏已运行
    Steps:
      1. 执行所有任务的 QA 场景
      2. 记录结果
    Expected Result: 所有 QA 场景通过
    Evidence: .sisyphus/evidence/task-9-full-qa.md
  ```

  **Commit**: YES
  - Message: `fix: QA testing, balance adjustments, and edge case fixes`
  - Files: `src/` (multiple files)
  - Pre-commit: `npm run build`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns. Check evidence files exist in .sisyphus/evidence/.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill)
  Start from clean state. Execute EVERY QA scenario from EVERY task. Test cross-task integration. Test edge cases. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff. Verify 1:1 — everything in spec was built, nothing beyond spec was built. Check "Must NOT do" compliance.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **1**: `chore: init Phaser.js project with Vite and pixel mode` — package.json, vite.config.ts, index.html, src/main.ts, npm run build
- (后续任务待添加)

---

## Success Criteria

### Verification Commands
```bash
npm run dev  # Expected: 项目在 http://localhost:5173 正常运行
npm run build  # Expected: 生成 dist 目录，无构建错误
```

### Final Checklist
- [ ] 所有 "Must Have" 功能已实现
- [ ] 所有 "Must NOT Have" 功能未实现
- [ ] 游戏可以正常运行
- [ ] 存档功能正常工作
