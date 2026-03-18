# 🌌 潛意識畫布 Subconscious Canvas

> AI 深度夢境解析工具 — 結合榮格心理學、佛洛伊德精神分析與認知神經科學，由 Gemini AI 驅動

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Gemini](https://img.shields.io/badge/Powered%20by-Gemini%20AI-4285F4.svg)
![Version](https://img.shields.io/badge/version-1.0.0-purple.svg)

---

## ✨ 功能特色

### 🧠 六大解析面向
1. **🌊 情緒共鳴與接納** — 精準描繪夢中情緒的質地，讓你感覺被深刻理解
2. **🔮 符號深度解碼** — 3-5 個關鍵符號的榮格原型、跨文化象徵與個人意義解析
3. **🧩 敘事結構分析** — 將夢境視為「故事」，解讀起承轉合中的心理歷程
4. **🪞 陰影與自我對話** — 從榮格「陰影」角度，溫柔揭示被壓抑的自我面向
5. **💡 成長行動建議** — 心理、行動、關係三層面的具體可操作建議
6. **🎨 AI 繪圖指令** — 生成高品質英文 prompt，可直接用於 Midjourney / DALL·E / Stable Diffusion

### 🎨 16 種視覺風格
| 風格 | 說明 |
|------|------|
| 🌀 超現實主義 | 達利風格的融化夢境景觀 |
| 🌃 賽博龐克 | 雨中霓虹反烏托邦城市 |
| 🍃 吉卜力風 | 宮崎駿水彩田園奇幻 |
| 🎨 莫內印象派 | 斑駁光影與水中倒影 |
| 🖤 暗黑奇幻 | Beksinski 風格的有機恐怖 |
| ✨ 空靈夢幻 | 飄浮天體般的粉彩柔軟 |
| 🌊 浮世繪 | 北齋風格的木版畫 |
| 🌺 新藝術風格 | 慕夏裝飾性流線 |
| 🌴 蒸氣波 | 粉紫復古數位故障 |
| 🖼️ 古典油畫 | 卡拉瓦喬的戲劇性明暗法 |
| 💧 水彩畫 | 濕中濕暈染顏料 |
| 👾 像素藝術 | 16-bit SNES 風格奇幻場景 |
| 🏔️ 水墨風 | 中國水墨山水 |
| 🍄 迷幻藝術 | 60 年代萬花筒碎形圖案 |
| ⚙️ 蒸汽龐克 | 維多利亞時代黃銅齒輪 |
| ◻️ 極簡主義 | 幾何形狀與留白 |

### 🛠️ 其他功能
- 📊 **4 種 Gemini 模型**可選（2.5 Flash / 2.0 Flash / 2.5 Pro / 1.5 Pro）
- 🏷️ **8 種夢境類型**標記（清醒夢、反覆夢、惡夢、飛行夢等）
- 😌 **12 種情緒標籤**（最多 4 個）
- 📚 **夢境紀錄**功能（自動保存最近 20 筆）
- 📋 **一鍵複製**完整報告或繪圖指令
- 🔍 **風格搜尋**快速找到想要的視覺風格
- 📱 **完全響應式**設計，支援桌面與手機

---

## 🚀 快速開始

### 方法一：直接開啟（零安裝）

1. 下載 `index.html`
2. 用瀏覽器直接開啟
3. 輸入你的 [Gemini API Key](https://aistudio.google.com/app/apikey)（免費）
4. 開始解析夢境！

### 方法二：部署到 Antigravity.ai

1. 前往 [Antigravity.ai](https://antigravity.ai)
2. 建立新專案
3. 將 `index.html` 的完整內容貼入
4. 發布即可

### 方法三：部署到 GitHub Pages

```bash
# 1. Fork 或 Clone 此專案
git clone https://github.com/YOUR_USERNAME/subconscious-canvas.git

# 2. 進入專案目錄
cd subconscious-canvas

# 3. 推送到 GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 4. 在 GitHub 設定中啟用 Pages
# Settings > Pages > Source: main branch > / (root)
```

### 方法四：部署到 Vercel / Netlify

直接拖曳 `index.html` 到 Vercel 或 Netlify 的部署介面即可。

---

## 📁 專案結構

```
subconscious-canvas/
├── index.html          # 完整的單頁應用（可獨立運行）
├── dream-canvas.jsx    # React 版本（用於 Claude Artifact 或 React 專案）
├── README.md           # 本文件
└── LICENSE             # MIT License
```

---

## 🔑 API Key 說明

本工具使用 Google Gemini API，你需要一個免費的 API Key：

1. 前往 [Google AI Studio](https://aistudio.google.com/app/apikey)
2. 登入 Google 帳號
3. 點擊「Create API Key」
4. 複製 Key 貼入工具中

> ⚠️ **安全提醒**：API Key 只在你的瀏覽器端使用，直接呼叫 Google API，不經過任何第三方伺服器。

---

## 🧠 心理學理論基礎

本工具的解析系統建立在以下心理學理論之上：

- **榮格分析心理學**：原型理論、集體潛意識、陰影概念、個體化歷程
- **佛洛伊德精神分析**：夢的願望滿足理論、壓抑機制、象徵解讀
- **認知神經科學**：記憶整合理論、情緒調節假說、REM 睡眠研究
- **完形治療**：夢工作技術、存在現象學觀點

> ⚠️ **免責聲明**：夢境解析是一種心理探索與自我認識的工具，不構成醫療診斷或心理治療。如你持續受到夢境困擾或有心理健康需求，請尋求專業心理諮商師的協助。

---

## 🎨 技術架構

| 面向 | 技術 |
|------|------|
| 前端 | 純 HTML/CSS/JavaScript（零依賴，單文件） |
| AI 引擎 | Google Gemini API（REST API 直接呼叫） |
| Markdown 渲染 | marked.js（CDN） |
| 字體 | Google Fonts（Noto Sans TC、Noto Serif TC、Playfair Display） |
| 儲存 | localStorage（夢境紀錄） |
| 部署 | 靜態檔案，任何靜態託管服務皆可 |

---

## 📄 授權條款

本專案採用 [MIT License](LICENSE) 授權。

---

## 🙏 致謝

- [Google Gemini AI](https://ai.google.dev/) — AI 分析引擎
- [marked.js](https://marked.js.org/) — Markdown 渲染
- [Google Fonts](https://fonts.google.com/) — 字體
- Carl Jung、Sigmund Freud — 心理學理論基礎

---

<div align="center">

**🌙 每一個夢，都是潛意識寫給你的一封信 🌙**

</div>
