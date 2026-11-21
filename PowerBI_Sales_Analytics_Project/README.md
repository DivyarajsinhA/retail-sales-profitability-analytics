# Retail Sales & Profitability Analytics — Power BI Project

An end-to-end **Power BI & Microsoft Excel Business Intelligence** project built on a multi-year Star Schema sales dataset (**1,200 omnichannel transactions across Jan 2024 – Oct 2026, 150 customers, 30 products, and 5 Indian commercial regions**). Designed to uncover regional target attainment, category profitability, and discount-driven margin erosion.

---

## Executive KPI Snapshot (QA Verified Against Excel Formulas)

| Metric | Value | Business Context |
| :--- | :---: | :--- |
| **Total Net Revenue** | **₹33,214,180** | Jan 2024 – Oct 2026 (34 months) |
| **Total Net Profit** | **₹9,715,460** | After COGS & Promotional Discounts |
| **Overall Profit Margin** | **29.3%** | Weighted Net Profit / Net Revenue |
| **Total Orders** | **1,200** | 3,734 total units shipped |
| **Average Order Value (AOV)** | **₹27,678** | Across Consumer, Corporate & SMB |
| **2024 → 2025 YoY Growth** | **+33.8%** | Revenue grew from ₹93.4L to ₹1.25 Cr |

---

## Star Schema Data Model

Connect the 5 tables from `Retail_Sales_Analytics_Dataset.xlsx` in Power BI **Model View** using 1-to-Many (`1:*`) single-direction relationships:

- `Dim_Calendar[Date]` (1) ──▶ (*) `Fact_Sales[Order_Date]` *(Mark `Dim_Calendar` as Date Table)*
- `Dim_Products[Product_ID]` (1) ──▶ (*) `Fact_Sales[Product_ID]`
- `Dim_Customers[Customer_ID]` (1) ──▶ (*) `Fact_Sales[Customer_ID]`
- `Dim_Regions[Region_ID]` (1) ──▶ (*) `Fact_Sales[Region_ID]`

---

## Key Business Insights Discovered

1. **Discount-Driven Margin Erosion (-23.1 pp):** Full-price orders (0% discount) achieve a **36.0% profit margin**, standard discounts (5%–15%) hold **27.8%**, whereas heavy discounts (20%+, 107 orders) collapse margins to **12.9%** — concentrated heavily in Furniture.
2. **Regional Revenue vs. Efficiency:** **West** leads total revenue (**₹1.01 Cr**, 320 orders), followed by **South** (**₹87.9L**, 305 orders), while **Central** delivers the highest regional margin (**30.8%**).
3. **Category Portfolio Mix:** **Electronics** drives the highest top-line revenue (**₹1.40 Cr**, 24.8% margin), while **Corporate Merch** (**42.5%**) and **Office Supplies** (**37.6%**) act as high-margin profit engines.
4. **Strong YoY Momentum:** Revenue expanded **+33.8% YoY** from 2024 (₹93.4L) to 2025 (₹1.25 Cr), with 2026 YTD (Jan–Oct) already at **₹1.14 Cr** across 420 orders.

---

## 15-Minute Power BI Desktop Build Guide

1. **Load Data:** Open Power BI Desktop → **Get Data → Excel Workbook** → select `Retail_Sales_Analytics_Dataset.xlsx` → check `Fact_Sales`, `Dim_Products`, `Dim_Customers`, `Dim_Regions`, and `Dim_Calendar` → click **Transform Data**.
2. **Apply Power Query (Optional):** Use `power_query_transformations.m` to add the `Discount_Tier` conditional column (`0%`, `5% - 15%`, `20%+`) and verify data types → **Close & Apply**.
3. **Verify Star Schema:** Switch to **Model View**, confirm the 4 one-to-many relationships above, and mark `Dim_Calendar` as the Date Table (`Table tools → Mark as date table → Date`).
4. **Import Theme:** Go to **View → Themes → Browse for themes** → select `powerbi_theme.json`.
5. **Add DAX Measures:** Click **Home → Enter Data** → create a table named `_Measures` → paste measures from `dax_measures.dax`.
6. **Build 3 Report Pages (matching the included Interactive HTML Preview):**
   - **Page 1 (Executive Overview):** 4 KPI Cards, Monthly Revenue & Profit Line/Column Chart, Regional Revenue vs. Target Bar Chart, Sales Channel Donut, Top Slicers (Year, Region, Category).
   - **Page 2 (Product & Discount Analysis):** Discount Tier Margin Erosion Bar Chart, Category Revenue vs. Margin Combo Chart, Top 10 Products Matrix with Conditional Formatting.
   - **Page 3 (Regional & Customer Insights):** Regional Manager Target Attainment Table, Segment AOV Comparison, Payment Mode Breakdown.
7. **QA Check:** Verify your top-level cards match `Executive_KPI_Summary` in Excel (**₹33,214,180** Revenue | **₹9,715,460** Profit | **29.3%** Margin | **1,200** Orders).
8. **Save & Publish:** Save as `Retail_Sales_Analytics.pbix`, export screenshots, and upload the `.pbix` + this repository to your GitHub (`github.com/DivyarajsinhA`).

---

## ATS-Optimized Resume Bullet Points (Target: 90+ Score)

Copy and paste directly into the **Projects** section of your Business Analyst / Data Analyst resume:

**Retail Sales & Profitability Analytics Dashboard | Power BI, DAX, Power Query, Microsoft Excel**
- Engineered a 5-table Star Schema sales data model (`Fact_Sales` + 4 dimension tables) in **Microsoft Excel** and **Power BI**, cleaning and transforming 1,200+ multi-year omnichannel transactions (₹3.32 Cr revenue) via **Power Query (M)**.
- Authored 25+ dynamic **DAX** measures—including Time Intelligence (`TOTALYTD`, `SAMEPERIODLASTYEAR`, `DATEADD`), `RANKX` regional rankings, and target attainment KPIs—reconciling 100% against an automated Excel QA summary sheet.
- Uncovered a **23.1 percentage-point profit margin erosion** on heavily discounted orders (20%+ discount tier dropping margin from 36.0% to 12.9%) and identified +33.8% YoY revenue growth across 5 regional markets.
- Designed an executive 3-page interactive dashboard with custom JSON theming, cross-filtering slicers, and drill-down views to track AOV (₹27,678), regional target attainment, and category profitability.
