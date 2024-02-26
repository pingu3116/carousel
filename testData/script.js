let currentDate = document.querySelector('.current-date'),
    daysTag = document.querySelector('.days'),
    prevNextIcon = document.querySelectorAll('.icons span');

//取得目前日期與年月
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
const months =["January", "February", "March", "April", "May", "June", "July",
               "August", "September", "October", "November", "December"];

//日期與月份變化
const renderCalendar = () => {
    let firstDateOfMonth = new Date(currYear, currMonth, 1).getDay(),//取月份的首日
        lastDateOfMonth = new Date(currYear, currMonth +1, 0).getDate(),//取該月份的最後日的日期
        lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),//取月份的最後日
        lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();//取上月份最後日的日期
    let liTag ="";
    for(let i = firstDateOfMonth; i > 0; i--){ //製作上個月的最後日期
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for(let i = 1; i <= lastDateOfMonth; i++){ //製作當月日期
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() //加入當天日期的CSS效果
                      && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for(let i = lastDayOfMonth; i < 6; i++){ //製作下個月的開始日期
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`
    }
    
    currentDate.innerText = `${months[currMonth]} ${currYear}`;  
    daysTag.innerHTML = liTag;
}
renderCalendar();

//點擊icon事件的月變化
prevNextIcon.forEach( icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth +1;

        if(currMonth < 0 || currMonth >11){ //跨年份時"月"的修正
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); //更新點擊後的新年份
            currMonth = date.getMonth(); //更新點擊後的新月份
        }else{
            date = new Date();
        }
        renderCalendar();
    });

})
