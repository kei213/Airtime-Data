export function roundOneDone() {

    const displayMessage = document.querySelector('#display-message'); 
    displayMessage.innerHTML = " Round 1 has been done, Round 2 left";

    const addButton = document.querySelector("#addDataBtnText");
    addButton.innerText = "Add Round 2 Data";
    const sectionText = document.querySelector("#sectionTextTop");
    /*sectionText.innerText = "Round 2";*/
                                                     
    const roundOneDoneIcon = document.querySelector("#roundOneDoneIcon");
    roundOneDoneIcon.style.display = 'block';
    const roundOneText = document.querySelector("#roundOneText");
    roundOneText.innerText = 'Done';   
    const roundTwoCancelIcon = document.querySelector("#roundTwoCancelIcon");                                                           
    roundTwoCancelIcon.style.display = 'block';        
    const roundTwoText = document.querySelector("#roundTwoText");
    roundTwoText.innerText = 'Not Done';                                                       

    document.querySelector('#addDataBtn').addEventListener('click', (e) => {
        e.preventDefault()
        const roundToBeDone = 2
        sessionStorage.setItem("roundToBeDone", roundToBeDone) ;
        window.location = '/airtime-center-form'                                                     
    })
}