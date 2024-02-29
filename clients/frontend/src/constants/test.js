
const datas = fetch('/dashboard_data').then(data =>{
    console.log(data)
    return data
})

export default datas