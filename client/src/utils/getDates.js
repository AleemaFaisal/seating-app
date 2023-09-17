//const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getDates = function (weekNum)
{
    //weekNum is measured onwards from the current week i.e. week 0
    const dates = [];
    let date = new Date();
    date.setDate(date.getDate() - date.getDay() + 1 + weekNum*7);

    for (let i=0; i<5; i++)
    {
        dates.push(date.toDateString());
        date.setDate(date.getDate() + 1);
    }
    console.log("dates: ", dates);
    return dates;
}

