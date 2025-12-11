let barsContainer = document.getElementById("bars-container");
let array = [];
console.log(barsContainer);

// Generate random array
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


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort with visualization
async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            // Highlight bars being compared
            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";

            if (array[j] > array[j + 1]) {
                // Swap values in array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap heights visually
                bars[j].style.height = array[j] + "px";
                bars[j + 1].style.height = array[j + 1] + "px";
            }

             await sleep(150); // wait to show animation

            // Reset color
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
            await sleep(150)
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
        await sleep(120);

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
        await sleep(80);
        bars[low + i].style.background = "steelblue";
    }
}

// Button Listeners
document.getElementById("generate").addEventListener("click", generateArray);
document.getElementById("sort").addEventListener("click", bubbleSort);
document.getElementById("selection").addEventListener("click",SelectionSort);
document.getElementById("insertion").addEventListener("click", InsertionSort);

document.getElementById("merge").addEventListener("click",async()=>{
    await mergeSortVisualizer(0,array.length-1)});

generateArray();
