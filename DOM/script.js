console.log(document.querySelectorAll(".one")[0].innerHTML);
console.log(document.querySelectorAll(".one")[1].innerText);
console.log(document.querySelector('#two').innerHTML);
console.log(document.querySelector('[user-id]').innerHTML);

function inputSubmit(e) {
    if(e.code == 'Enter') {
        const input = {
            value: document.querySelector(".input").value,
        }; 
        if(!input) {
            return;
        }
        localStorage.setItem("input", JSON.stringify(input));
    }
}