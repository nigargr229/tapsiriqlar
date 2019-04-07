const manufacturer = document.forms['myForm']['manufacturer'],
      model = document.forms['myForm']['model'],
      release = document.forms['myForm']['release'];

const addButton =  document.getElementById('addButton'),
      editButton = document.getElementById('editButton');


const myObjectList =  document.getElementById('myObjectList');


const formAlert =  document.getElementById('formAlert');      

const onlyLetter = /^[a-zA-Z]+$/;  
const letterAndNumber =  /^([a-zA-Z0-9 _-]+)$/;
const number = /^[0-9]+$/;

const carObjectList = [];

let myLocalData;

let nowDate =  new Date();


function Car(id, manufacturer, model, release)
{
    this.id = id;
    this.manufacturer = manufacturer;
    this.model = model;
    this.release = release;
}


function validateForm()
{   
    validateEditing(manufacturer, model, release)
    if(validateEditing(manufacturer, model, release) == false)
    {
      return false;   
    }
    else
    {
     
      if(checkLocalStorage() == true)
      {
        if(carObjectList.length == 0)
         {  
           var idCounter = 1;
           localStorage.setItem('localIdCounter', idCounter);
     
           let localIdCounter = localStorage.getItem('localIdCounter');
           var plusLocalIdCounter = Number(localIdCounter);
        }
        else if(carObjectList.length != 0)
        { 
           let localIdCounter = localStorage.getItem('localIdCounter');
           localIdCounter++

           localStorage.setItem('localIdCounter', localIdCounter);
           var plusLocalIdCounter = Number(localIdCounter);
           }
         }
         else
            {
             console.log('error');
            }       

       let newCar = new Car(plusLocalIdCounter, manufacturer.value, model.value, release.value);

       carObjectList.push(newCar);    
    
       localStorage.setItem('myLocalData', JSON.stringify(carObjectList));    
    
       createNewListItem(newCar)

       return false; 
    }  
}

function showAlert(message)
{     formAlert.innerHTML = '';
   let node =  document.createElement('P');
   let textNode = document.createTextNode(message);
       node.appendChild(textNode);
       formAlert.appendChild(node);
       formAlert.classList.remove('d-none');
}

function hideAlert(){formAlert.classList.add('d-none')};


function cleanInputs()
{
    manufacturer.value = '';
    model.value = '';
    release.value = '';
}


function myLocalDataEelemets()
{ 
    myLocalData = JSON.parse(localStorage.getItem('myLocalData'));
  
   if(myLocalData!=null){
        for(let i = 0; i < myLocalData.length; i++)
        {
            carObjectList.push(myLocalData[i]);
        }
        displayList(carObjectList);
   }
};


function displayList(item)
{

  for(let i = 0; i < item.length; i++)
  {
    
     let node = document.createElement('LI');
         node.classList.add('list-group-item');
         node.addEventListener('click', ()=>
         {
            return editLiItem(node);
         }, false);
     
     let textNode =  document.createTextNode(`${item[i].id} ${item[i].manufacturer} ${item[i].model} ${item[i].release} `);
         node.appendChild(textNode);
    
    
     let iconNode =  document.createElement('I');
         iconNode.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger');
         iconNode.addEventListener('click', ()=>
         { return deleteLiItem(iconNode);}, false);
         node.appendChild(iconNode);
        
         myObjectList.appendChild(node);
    } 
}


function createNewListItem(item)
{
    let node = document.createElement('LI');
    node.classList.add('list-group-item');
    node.addEventListener('click', ()=>
    {
       return editLiItem(node);
    }, false);

let textNode =  document.createTextNode(`${item.id} ${item.manufacturer} ${item.model} ${item.release} `);
    node.appendChild(textNode);

let iconNode =  document.createElement('I');
    iconNode.classList.add('fas', 'fa-trash-alt', 'ml-5', 'float-right', 'text-danger');
    iconNode.addEventListener('click', ()=>
    {return deleteLiItem(iconNode);});
    node.appendChild(iconNode);
    myObjectList.appendChild(node);
}

function checkLocalStorage()
{
    if(typeof(Storage) != "undefined")
    {return true;}
    else
    {return false;}
}


function deleteLiItem(item)
{   
    const parentLi =  item.parentElement;
    const liText  = parentLi.innerText;
    for(let i = 0; i < carObjectList.length; i++)
    {
        if(liText[0] == carObjectList[i].id)
        { 
            carObjectList.splice(i, 1);
            localStorage.setItem('myLocalData', JSON.stringify(carObjectList));
            myLocalData = JSON.parse(localStorage.getItem('myLocalData'));
            
        }
    }
          parentLi.parentNode.removeChild(parentLi);
        
}

editButton.addEventListener('click', ()=>
{

    validateEditing(manufacturer, model, release);

     if(validateEditing(manufacturer, model, release)  == false)
     {

     }
     else
     {
        let editingItem = document.getElementById('editing');
        let textNode = editingItem.innerText;
        for(let i = 0; i < carObjectList.length; i++)
        {
           if(textNode[0] == carObjectList[i].id)
           { 
              let oldChild =  editingItem.firstChild;
              carObjectList[i].manufacturer = manufacturer.value;
              carObjectList[i].model = model.value;
              carObjectList[i].release = release.value;
              let newChild = document.createTextNode(`${carObjectList[i].id} ${carObjectList[i].manufacturer}  ${carObjectList[i].model} ${carObjectList[i].release}`)
              editingItem.replaceChild(newChild, oldChild);
              localStorage.setItem('myLocalData', JSON.stringify(carObjectList));
              editingItem.removeAttribute('id');
              editButton.classList.add('d-none');
              addButton.classList.remove('d-none');
              
              hideAlert();
              cleanInputs();
           }
            
        
        }
       
     }


  
});

function validateEditing(manufacturer, model, release)
{    

  if(!manufacturer.value.match(manufacturer))
    {
     showAlert('only letter');
     return false;
    }
    else if(release.value > nowDate.getFullYear() || release.value < 1970)
    {
        showAlert('False');
        return false;
    }     
    else if(!model.value.match(letterAndNumber))
    {
        showAlert('letter or number');
        return false;
    }
    
   
    else if(!release.value.match(number))
    {
         showAlert('only number');
         return false;
    }

}




