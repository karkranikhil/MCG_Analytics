const CateringData = require('./Data/Catering.js');
const POS_DATA = require('./Data/POS_DATA.js');
const EventRefData = require('./Data/Event_Ref_Data.js');
var _ = require('lodash');

function generateEventDate(){
    var Months = {
        "January":'01',
        "February":'02',
        "March":'03',
        "April":'04',
        "May":'05',
        "June":'06',
        "July":'07',
        "August":'08',
        "September":'09',
        "October":'10',
        "November":'11',
        "December":'12'}
    EventRefData.forEach((item,index)=>{
        let month= Months[item.EventMonth]
        EventRefData[index].attendedDate=  item.EventYearName +'-'+ month+'-'+item.EventDay
    })
    return EventRefData
}
function generateFinalData(resultWithEventDates, resultWithSameCenterId){
    var finalData=[]
    resultWithEventDates.forEach((item)=>{
        resultWithSameCenterId.forEach((data)=>{
            if(item.attendedDate === data.tendered_date){
                var obj1={...item, ...data}
                finalData.push(obj1)
            }
        })
        
    })
    console.log(finalData)
    var result=_.chain(finalData).groupBy("ProfitCentreId")
    console.log(result)
}
function abc(){
    var resultWithSameCenterId =[]
    CateringData.forEach((catItem)=>{
        POS_DATA.forEach((posdata)=>{
             if(posdata.profit_center_id == catItem.ProfitCentreId){
                 var newObj={...posdata,...catItem}
                 resultWithSameCenterId.push(newObj)
             }
        
        })
    })
    var resultWithEventDates = generateEventDate()
    generateFinalData(resultWithEventDates, resultWithSameCenterId)
}
abc()