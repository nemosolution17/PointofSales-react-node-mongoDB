const DashboardData = require('./process_data')

const salesSchema = require('../../models/Sales/sales')
const productSchema = require('../../models/Product/products')

async function GetTodaySales(){
  try{
    const sums = await salesSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().setHours(0,0,0,0)), // find documents where createdAt is greater than or equal to today
              $lt: new Date(new Date().setHours(23,59,59,999)) // and less than tomorrow
            }

          }
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: { $multiply: ["$price", "$quantity"] } },
            totalCost: { $sum: { $multiply: ["$cost_price", "$quantity"] } }, // multiply field1 and field2 and sum the result         
            quantity: {$sum: "$quantity"}
          }
        }
      ]);
    return sums[0]
  }
  catch(error){
    console.log(error)
  }
}

async function GetTodaySalesGroupedByCategory(){
  try{
    const sums = await salesSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().setHours(0,0,0,0)), // find documents where createdAt is greater than or equal to today
              $lt: new Date(new Date().setHours(23,59,59,999)) // and less than tomorrow
            }
            
          }
        },
        {
          $group: {
            _id: "$category",
            // category: { "$last": "$category" },
            totalSales: { $sum: { $multiply: ["$price", "$quantity"] } }, // multiply field1 and field2 and sum the result
          
          }
        }
      ]);
    return sums
  }
  catch(error){
    console.log(error)
  }
}


const yesterdayStart = new Date();
yesterdayStart.setDate(yesterdayStart.getDate() - 1);
// Set to the start of yesterday
yesterdayStart.setHours(0, 0, 0, 0);
const yesterdayEnd = new Date();
yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
// Set to the end of yesterday
yesterdayEnd.setHours(23, 59, 59, 999);
async function GetYesterdaySales(){
  try{
    const sums = await salesSchema.aggregate([
      {
        $match: {
          createdAt: {
            $gte: yesterdayStart,
            $lt: yesterdayEnd // Only include records up to the end of yesterday
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: { $multiply: ["$price", "$quantity"] } },
          totalCost: { $sum: { $multiply: ["$cost_price", "$quantity"] } },
          quantity: {$sum: "$quantity"},
        }
      }
    ]);
    return sums[0]
  }
  catch(error){
    console.log(error)
  }
}

async function GetYesterdaySalesGroupedByCategory(){
  try{
    const sums = await salesSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gte: yesterdayStart, // find documents where createdAt is greater than or equal to today
              $lt: yesterdayEnd // and less than tomorrow
            }
            
          }
        },
        {
          $group: {
            _id: "$category",
            // category: { "$last": "$category" },
            total: { $sum: { $multiply: ["$price", "$quantity"] } }, // multiply field1 and field2 and sum the result
          }
        }
      ]);
    return sums[0]
  }
  catch (error){
    console.log(error)

  }
}

// Monthly Sales
async function GetMonthlySales(){
  try{
    const yearBegining = new Date(new Date().getFullYear(), 0, 1)
    const currentDate = new Date()
    const sums = await salesSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gte: yearBegining, // find documents where createdAt is greater than or equal to today
              $lte: currentDate // and less than tomorrow
            }
            
          }
        },
        {
          $group: {
            _id: {
            $switch: {
              branches: [
                { case: { $eq: [{ $month: "$createdAt" }, 1] }, then: "January" },
                { case: { $eq: [{ $month: "$createdAt" }, 2] }, then: "February"},
                { case: { $eq: [{ $month: "$createdAt" }, 3] }, then: "March" },
                { case: { $eq: [{ $month: "$createdAt" }, 4] }, then: "April" },
                { case: { $eq: [{ $month: "$createdAt" }, 5] }, then: "May" },
                { case: { $eq: [{ $month: "$createdAt" }, 6] }, then: "June" },
                { case: { $eq: [{ $month: "$createdAt" }, 7] }, then: "July" },
                { case: { $eq: [{ $month: "$createdAt" }, 8] }, then: "August" },
                { case: { $eq: [{ $month: "$createdAt" }, 9] }, then: "September" },
                { case: { $eq: [{ $month: "$createdAt" }, 10] }, then: "October" },
                { case: { $eq: [{ $month: "$createdAt" }, 11] }, then: "November" },
                { case: { $eq: [{ $month: "$createdAt" }, 12] }, then: "December" }
              ],
              default: "Invalid month"
            }
          },
            total: { $sum: { $multiply: ["$price", "$quantity"] } }, // multiply field1 and field2 and sum the result
            quantity: {$sum: "$quantity"}
          }
        }
      ]);
    return sums
  }
  catch(error){
    console.log(error)
  }
}

async function GetRevenueCategory(){
  try{
    const yearBegining = new Date(new Date().getFullYear(), 0, 1)
    const currentDate = new Date()
    const sums = await salesSchema.aggregate([
        {
          $match: {
            createdAt: {
              $gte: yearBegining, // find documents where createdAt is greater than or equal to today
              $lt: currentDate // and less than tomorrow
            }
            
          }
        },
        {
          $group: {
            _id: "$category",
            total: { $sum: { $multiply: ["$price", "$quantity"] } }, // multiply field1 and field2 and sum the result
            quantity: {$sum: "$quantity"},
          }
        },
      ]);
    return sums
  }
  catch (error){
    console.log(error)
  }
}

async function Total(){
  try{
    const result = await salesSchema.aggregate([
        {
          $group: {
            _id: null,
            revenue: { $sum: { $multiply: ["$price", "$quantity"] } }, // multiply field1 and field2 and sum the result
            quantity: {$sum: "$quantity"},
            cost: { $sum: { $multiply: ["$cost_price", "$quantity"] } },
          }
        },
      ]);
    return result[0] 
  }
  catch (error){
    console.log(error)
  }
}

async function dataTemplate(){
  const getMonthlySales =  await GetMonthlySales()
  const todaySales = await GetTodaySales()
  const yesterdaySales = await GetYesterdaySales()
  const getTodaySalesGroupedByCategory = await GetTodaySalesGroupedByCategory()
  const getYesterdaySalesGroupedByCategory = await GetYesterdaySalesGroupedByCategory()
  const getRevenueCategory = await GetRevenueCategory()
  const total = await Total()

  const dataTemplate = {
    'monthly_sales' : getMonthlySales,
    'today_sales':todaySales,
    'yesterday_sales':yesterdaySales,
    'today_sales_by_category': getTodaySalesGroupedByCategory,
    'yesterday_sales_by_category':getYesterdaySalesGroupedByCategory,
    'revenue_by_category' : getRevenueCategory,
    'total' : total,
  }
  return dataTemplate
}

const dashboardData = async (req, res) => {
  const template = await dataTemplate()
  try{
    const dataObject = await new DashboardData(template)
    const datas = await dataObject.getDashboardData()
    const data = datas
    console.log(data) 
    res.status(200).json(data)
    } catch(error){
        console.log(error)
        res.status(400).json({error})
    }
}

module.exports = {dashboardData}