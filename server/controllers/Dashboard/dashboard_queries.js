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
    console.log(sums)
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
                { case: { $eq: [{ $month: "$createdAt" }, 2] }, then: "February" },
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

module.exports = {
    GetTodaySales, 
    GetTodaySalesGroupedByCategory, 
    GetYesterdaySales, 
    GetYesterdaySalesGroupedByCategory,
    GetMonthlySales,
}