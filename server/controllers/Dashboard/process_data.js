const {dashboardDataTemplate} = require('./constant/data_template')

class DashboardData{
    constructor(data) {
        this.monthlySales =  data.monthly_sales
        this.todaySales = data.today_sales
        this.yesterdaySales = data.yesterday_sales
        this.todaySalesGroupedByCategory = data.today_sales_by_category
        this.yesterdaySalesGroupedByCategory = data.yesterday_sales_by_category
        this.total = data.total
        this.month = [] // months e.g [january, february, march ...]
        this.monthRevenue = [] // matching month revenue e.g [22, 23, 24, ...]
        this.monthQuantity = [] //matching month quantity
        this.todayQuantiy = data.today_sales.quantity
        this.revenueByCategory = data.revenue_by_category
        this.topCategoryRevenue = []
        this.totalRevenueYearly = []
        this.allTotal = []
    }
    
    #todayProfit(){
        const profit = this.todaySales.totalSales - this.todaySales.totalCost;
        return profit;
        
    }

    #yesterdayProfit(){
        const profit = this.yesterdaySales.totalSales - this.yesterdaySales.totalCost;
        return profit;
    }

    #todayProfitChanges(){
        const changes = ((this.#todayProfit() - this.#yesterdayProfit())/this.#yesterdayProfit()) * 100;
        return changes;
    }

    #todayRevenueChanges(){
        const changes = ((this.todaySales.totalSales - this.yesterdaySales.totalSales)/this.yesterdaySales.totalSales) * 100;
        return changes;
    }

    #todayQuantityChanges(){
        const changes = ((this.todaySales.quantity - this.yesterdaySales.quantity)/this.yesterdaySales.quantity) * 100;
        return changes;
    }

    #groupedMonthsRevenue() {
        this.monthlySales.map(data =>{
            
            this.month.push(data._id)
            this.monthRevenue.push(data.total)
            this.monthQuantity.push(data.quantity)
        })
    }

    #totalRevenueYearly(){
        this.monthlySales.map(data =>{
            this.totalRevenueYearly.push(data.total)
        })
        return this.totalRevenueYearly.reduce((a, b) => a + b, 0)

    }

    #topCategoryByRevenue() {
        const totalRevenue = this.#totalRevenueYearly()
        this.revenueByCategory.map(data => {
            const percentage = Math.floor((data.total/totalRevenue) * 100)
            this.topCategoryRevenue.push({title: data._id, value : percentage}) 
        })
        return this.topCategoryRevenue
    }

    #allTotal() {
        console.log(this.total)
        for (let [key, value] of Object.entries(this.total)) {
            if (value == null){
                continue
            }
            this.allTotal.push({value:value, title:key}) 
        }
        return this.allTotal 
    }

    getDashboardData(){
        this.#groupedMonthsRevenue()
        const processedData = {
            "today_profit" : this.#todayProfit(),
            "yesterday_profit" : this.#yesterdayProfit(),
            "today_profit_changes" : this.#todayProfitChanges(),
            "months" : this.month,
            "month_revenue" : this.monthRevenue,
            "month_quantity" : this.monthQuantity,
            "today_revenue_changes" : this.#todayRevenueChanges(),
            "today_quantity" : this.todayQuantiy,
            "today_quantity_changes" : this.#todayQuantityChanges(),
            "top_revenue_by_category" : this.#topCategoryByRevenue(),
            "all_total" : this.#allTotal(),

        }
        return dashboardDataTemplate(processedData)
    }
}

module.exports = DashboardData;

