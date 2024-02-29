function dashboardDataTemplate(processedData){
    const data = {
        user: {
            name: "LOVE",
            img: "images",
        },
        summary: [
            {
            title: "Sales",
            subtitle: "Total sales today",
            value: processedData.today_profit,
            percent: processedData.today_revenue_changes,
            },
            {
            title: "Orders",
            subtitle: "Total orders today",
            value: processedData.today_quantity,
            percent: processedData.today_quantity_changes,
            },
            {
            title: "Revenue",
            subtitle: "Total revenue today",
            value: processedData.today_profit,
            percent: processedData.today_profit_changes,
            },
            {
            title: "Visits",
            subtitle: "Total visits today",
            value: "2345",
            percent: 55,
            },
        ],
        revenueSummary: {
            title: "Revenue",
            value: "$678",
            chartData: {
            labels: processedData.months,
            data: processedData.month_revenue,
            },
        },
        overall: processedData.all_total,
        revenueByChannel: processedData.top_revenue_by_category,
        revenueByMonths: {
            labels: processedData.months,
            data: processedData.month_revenue,
        }, 
    }
    return data
};

module.exports = {dashboardDataTemplate}