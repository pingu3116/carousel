//顯示的圖片index
let index = 0;

//圖片數量
let imageCount = document.querySelectorAll(".carousel .container img").length;

const bottom = document.querySelector(".carousel .bottom");
for(let i =0; i < imageCount; i++){
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    indicator.onclick = () => setIndex(i);

    bottom.append(indicator);
}

//自動輪播
function createAuto(){
  return  setInterval( () =>{
        index++;
        refresh();
    }, 3000);
};

let autoTimer = createAuto();

//輪播主程式
function refresh(){
    if(index < 0){  //index小於0，設置最右邊圖片
        index = imageCount -1;
    }else if(index >= imageCount){ //index大於imageCount，設置最左邊圖片
        index = 0;
    }

    //輪播框元素
    let carousel = document.querySelector(".carousel");


    //輪播框的寬度
    let width = getComputedStyle(carousel).width;
    width = Number(width.slice(0, -2)); //取值最末2單位之前的文字並轉為數字
    console.log("width:"+width);

    carousel.querySelector(".container").style.left = //container的left屬性變化
        index * width * -1  +"px";
}

//refresh裝置器
let refreshWrapper = (func) =>{
    return function(...args){
        let result = func(...args);
        refresh();

        //重置自動輪播時間
        clearInterval(autoTimer);
        autoTimer = createAuto();
        return result;
    }
}

let leftShift = refreshWrapper( () =>{
    index--;
})

let rightShift = refreshWrapper( () =>{
    index++;
})

let setIndex = refreshWrapper( (idx) =>{
    index = idx;
})

refresh();

