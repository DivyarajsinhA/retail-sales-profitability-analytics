// ============================================================================
// POWER QUERY (M) — ETL & STAR SCHEMA PREPARATION
// Replace the FilePath parameter below with the local path to
// Retail_Sales_Analytics_Dataset.xlsx on your machine.
// ============================================================================

// --- Query 1: Fact_Sales ---
let
    Source = Excel.Workbook(File.Contents("C:\PowerBI_Projects\Retail_Sales_Analytics_Dataset.xlsx"), null, true),
    Fact_Sales_Sheet = Source{[Item="Fact_Sales",Kind="Sheet"]}[Data],
    PromotedHeaders = Table.PromoteHeaders(Fact_Sales_Sheet, [PromoteAllScalars=true]),
    ChangedTypes = Table.TransformColumnTypes(PromotedHeaders, {
        {"Order_ID", type text},
        {"Order_Date", type date},
        {"Ship_Date", type date},
        {"Customer_ID", type text},
        {"Product_ID", type text},
        {"Region_ID", type text},
        {"Sales_Channel", type text},
        {"Payment_Mode", type text},
        {"Quantity", Int64.Type},
        {"Unit_Price", Currency.Type},
        {"Discount_Pct", Percentage.Type},
        {"Gross_Sales", Currency.Type},
        {"Net_Revenue", Currency.Type},
        {"COGS", Currency.Type},
        {"Profit", Currency.Type},
        {"Profit_Margin_Pct", Percentage.Type},
        {"Shipping_Days", Int64.Type}
    }),
    RemovedNullOrders = Table.SelectRows(ChangedTypes, each ([Order_ID] <> null and [Order_ID] <> "")),
    AddedDiscountTier = Table.AddColumn(RemovedNullOrders, "Discount_Tier", each
        if [Discount_Pct] = 0 then "0% (Full Price)"
        else if [Discount_Pct] <= 0.15 then "5% - 15% (Standard)"
        else "20%+ (Heavy Discount)", type text)
in
    AddedDiscountTier

// --- Query 2: Dim_Calendar ---
let
    Source = Excel.Workbook(File.Contents("C:\PowerBI_Projects\Retail_Sales_Analytics_Dataset.xlsx"), null, true),
    Dim_Calendar_Sheet = Source{[Item="Dim_Calendar",Kind="Sheet"]}[Data],
    PromotedHeaders = Table.PromoteHeaders(Dim_Calendar_Sheet, [PromoteAllScalars=true]),
    ChangedTypes = Table.TransformColumnTypes(PromotedHeaders, {
        {"Date", type date},
        {"Year", Int64.Type},
        {"Quarter", type text},
        {"Month_Num", Int64.Type},
        {"Month_Name", type text},
        {"Year_Month", type text},
        {"Day_of_Week", type text},
        {"Is_Weekend", type text},
        {"Fiscal_Year", type text}
    })
in
    ChangedTypes

// --- Query 3: Dim_Products ---
let
    Source = Excel.Workbook(File.Contents("C:\PowerBI_Projects\Retail_Sales_Analytics_Dataset.xlsx"), null, true),
    Dim_Products_Sheet = Source{[Item="Dim_Products",Kind="Sheet"]}[Data],
    PromotedHeaders = Table.PromoteHeaders(Dim_Products_Sheet, [PromoteAllScalars=true]),
    ChangedTypes = Table.TransformColumnTypes(PromotedHeaders, {
        {"Product_ID", type text},
        {"Product_Name", type text},
        {"Category", type text},
        {"Sub_Category", type text},
        {"Unit_Cost", Currency.Type},
        {"Unit_Price", Currency.Type},
        {"Brand", type text}
    })
in
    ChangedTypes

// --- Query 4: Dim_Customers ---
let
    Source = Excel.Workbook(File.Contents("C:\PowerBI_Projects\Retail_Sales_Analytics_Dataset.xlsx"), null, true),
    Dim_Customers_Sheet = Source{[Item="Dim_Customers",Kind="Sheet"]}[Data],
    PromotedHeaders = Table.PromoteHeaders(Dim_Customers_Sheet, [PromoteAllScalars=true]),
    ChangedTypes = Table.TransformColumnTypes(PromotedHeaders, {
        {"Customer_ID", type text},
        {"Customer_Name", type text},
        {"Segment", type text},
        {"City", type text},
        {"State", type text},
        {"Region_ID", type text},
        {"Acquisition_Date", type date},
        {"Loyalty_Tier", type text}
    })
in
    ChangedTypes

// --- Query 5: Dim_Regions ---
let
    Source = Excel.Workbook(File.Contents("C:\PowerBI_Projects\Retail_Sales_Analytics_Dataset.xlsx"), null, true),
    Dim_Regions_Sheet = Source{[Item="Dim_Regions",Kind="Sheet"]}[Data],
    PromotedHeaders = Table.PromoteHeaders(Dim_Regions_Sheet, [PromoteAllScalars=true]),
    ChangedTypes = Table.TransformColumnTypes(PromotedHeaders, {
        {"Region_ID", type text},
        {"Region_Name", type text},
        {"Regional_Manager", type text},
        {"States_Covered", type text},
        {"Target_3Yr_Revenue", Currency.Type}
    })
in
    ChangedTypes
