let barsContainer = document.getElementById("bars-container");
let speedbtn=150;
let array = [];
console.log(barsContainer);


function generateArray() {
    let size=20;
    array = [];
    barsContainer.innerHTML = "";

    for (let i = 0; i < size; i++) {
        let height = Math.floor(Math.random() * 250) + 20;
        array.push(height);

        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = height + "px";
        barsContainer.appendChild(bar);
    }
  
} 

document.getElementById("speed").addEventListener("input",(e)=>{
    speedbtn=400-Number(e.target.value);
    
});
function sleep() {
    return new Promise(resolve => setTimeout(resolve, speedbtn));
}


async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

           
            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            if (array[j] > array[j + 1]) {
               
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

               
                bars[j].style.height = array[j] + "px";
                bars[j + 1].style.height = array[j + 1] + "px";
            }

             await sleep(speedbtn); 

         
            bars[j].style.background = "steelblue";
            bars[j + 1].style.background = "steelblue";
        }
    }
}
let min_idx;

async function SelectionSort(){
     let bars = document.getElementsByClassName("bar");

    for(let a=0;a<array.length;a++){
        min_idx=a;
        for(let b=a+1;b<array.length;b++){
            if(array[b]<array[min_idx]){
                min_idx=b;
          
            }
        }
         bars[min_idx].style.background = "red";
         bars[a].style.background = "red";

         temp=array[a];
         array[a]=array[min_idx];
         array[min_idx]=temp;

           bars[a].style.height = array[a] + "px";
           bars[min_idx].style.height = array[min_idx] + "px";
           await sleep(150)
              bars[min_idx].style.background = "steelblue";
         bars[a].style.background = "steelblue";
    }
}

async function InsertionSort(){
    let temp;
    let j;
    let bars = document.getElementsByClassName("bar");
    for( let i=1;i<array.length;i++){
        j=i
        while(array[j-1]>array[j] && j>0){

            bars[j].style.background="red";
            bars[j-1].style.background="red";

            temp=array[j];
            array[j]=array[j-1];
            array[j-1]=temp;

            bars[j].style.height= array[j] +"px";
            bars[j-1].style.height= array[j-1] +"px";
            await sleep(speedbtn)
              bars[j].style.background="steelblue";
            bars[j-1].style.background="steelblue";
            j--;
        }
    }
}



async function mergeSortVisualizer(low, high) {
    if (low >= high) return;

    let mid = Math.floor((low + high) / 2);

    await mergeSortVisualizer(low, mid);
    await mergeSortVisualizer(mid + 1, high);

    await merge(low, mid, high);
}

async function merge(low, mid, high) {
    let bars = document.getElementsByClassName("bar");

    let left = low;
    let right = mid + 1;
    let temp = [];

    while (left <= mid && right <= high) {
        bars[left].style.background = "red";
        bars[right].style.background = "red";
        await sleep(speedbtn);

        if (array[left] < array[right]) {
            temp.push(array[left]);
            bars[left].style.background = "steelblue";
            left++;
        } else {
            temp.push(array[right]);
            bars[right].style.background = "steelblue";
            right++;
        }
    }

    while (left <= mid) {
        bars[left].style.background = "red";
        await sleep(120);
        temp.push(array[left]);
        bars[left].style.background = "steelblue";
        left++;
    }

    while (right <= high) {
        bars[right].style.background = "red";
        await sleep(120);
        temp.push(array[right]);
        bars[right].style.background = "steelblue";
        right++;
    }

 
    for (let i = 0; i < temp.length; i++) {
        array[low + i] = temp[i];
        bars[low + i].style.height = temp[i] + "px";
        bars[low + i].style.background = "steelblue";
        await sleep(speedbtn);
        bars[low + i].style.background = "steelblue";
    }
}
async function quickSortVisualizer(low, high) {
    if (low < high) {
        let p = await partition(low, high);
        await quickSortVisualizer(low, p - 1);
        await quickSortVisualizer(p + 1, high);
    }
}

async function partition(low, high) {
    let bars = document.getElementsByClassName("bar");

    let pivot = array[low];
    let i = low;
    let j = high;

    bars[low].style.background = "purple";

    while (i < j) {
        while (array[i] <= pivot && i < high) {
            bars[i].style.background = "yellow";
            await sleep(speedbtn);
            bars[i].style.background = "steelblue";
            i++;
        }

        while (array[j] > pivot && j > low) {
            bars[j].style.background = "orange";
            await sleep(80);
            bars[j].style.background = "steelblue";
            j--;
        }

        if (i < j) {
            swapBars(bars, i, j);
            await sleep(speedbtn);
        }
    }

    swapBars(bars, low, j);
    bars[j].style.background = "green";
    await sleep(speedbtn);

    return j;
}

function swapBars(bars, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    bars[i].style.height = array[i] + "px";
    bars[j].style.height = array[j] + "px";
}


// Button Listeners
document.getElementById("generate").addEventListener("click", generateArray);
document.getElementById("sort").addEventListener("click", bubbleSort);
document.getElementById("selection").addEventListener("click",SelectionSort);
document.getElementById("insertion").addEventListener("click", InsertionSort);

document.getElementById("merge").addEventListener("click",async()=>{
    await mergeSortVisualizer(0,array.length-1)});
document.getElementById("quick").addEventListener("click", async () => {
    await quickSortVisualizer(0, array.length - 1);
});

generateArray();
