const STORAGE_KEY = "listContact";

function onSaveData(data) {
    try {
     const json = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, json);  
    } catch (error) {
        console.log(error);
   }
   
}

function onGetData() {

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data === null ? [] : JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
    
}

function createArrayObj(obj) {

    const arrayObj = onGetData();
    arrayObj.push(obj);
    onSaveData(arrayObj);

}

export { onSaveData, onGetData, createArrayObj };