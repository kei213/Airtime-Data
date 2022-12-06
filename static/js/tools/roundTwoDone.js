export function roundTwoDone() {

    const displayMessage = document.querySelector('#display-message'); 
    displayMessage.innerHTML = " All rounds done, excellent."   
                                         
    const sectionText = document.querySelector("#sectionTextTop");
    /*sectionText.innerText = "- Today all done";*/

    const roundOneDoneIcon = document.querySelector("#roundOneDoneIcon");
    roundOneDoneIcon.style.display = 'block';
    const roundOneText = document.querySelector("#roundOneText");
    roundOneText.innerText = 'Done';   
    const roundTwoDoneIcon = document.querySelector("#roundTwoDoneIcon");                                                           
    roundTwoDoneIcon.style.display = 'block';        
    const roundTwoText = document.querySelector("#roundTwoText");
    roundTwoText.innerText = 'Done';   

    document.querySelector('#addDataBtn').addEventListener('click', (e) => {
        e.preventDefault()
        //add data button modal                                                       
        var elemsAddData = document.querySelector('#add-data-btn-modal');
        var instancesAddData = M.Modal.init(elemsAddData);
                                               
    })
}