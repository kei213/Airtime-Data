export function snapshotEmpty() {

    const displayMessage = document.querySelector('#display-message');                     
    displayMessage.innerHTML = "please submit today's Round 1 amounts. Thanx..";
    const addButton = document.querySelector("#addDataBtnText");
    addButton.innerText = "Add Round 1 Data";
    const sectionText = document.querySelector("#sectionTextTop");
    /*sectionText.innerText = "Round 1";*/

    const roundOneCancelIcon = document.querySelector("#roundOneCancelIcon");
    roundOneCancelIcon.style.display = 'block';
    const roundOneText = document.querySelector("#roundOneText");
    roundOneText.innerText = 'Not Done';   
    const roundTwoCancelIcon = document.querySelector("#roundTwoCancelIcon");                                                           
    roundTwoCancelIcon.style.display = 'block';        
    const roundTwoText = document.querySelector("#roundTwoText");
    roundTwoText.innerText = 'Not Done';  

    document.querySelector('#addDataBtn').addEventListener('click', (e) => {
        e.preventDefault() 
        const roundToBeDone = 1
        sessionStorage.setItem("roundToBeDone", roundToBeDone)
        window.location = '/airtime-center-form'
    }) 
}