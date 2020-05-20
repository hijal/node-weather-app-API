// console.log('hello , inside the public ');

const form = document.querySelector('form');
const search = document.querySelector('input');

const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');


form.addEventListener('submit', e => {
    e.preventDefault();
    msgOne.textContent = 'Loading...';
    msgOne.style.color = 'green';
    msgTwo.textContent = '';

    console.log(search.value);
    fetch('/weather?address='+ search.value).then(res => {
    res.json().then((data) => {
        if(data.error){
            msgOne.textContent = data.error;
            msgOne.style.color ='red';
        }
        else {
            msgOne.style.color = '';
            msgOne.textContent = data.location;
            msgOne.style.color = 'white';
            msgTwo.textContent = data.forecast;
            msgTwo.style.color = 'white';
        }
    })
})
});