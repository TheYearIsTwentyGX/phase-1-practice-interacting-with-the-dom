//Get the counter and set a bool for whether it's paused
const counter = document.getElementById('counter');
let paused = false;
//Get the buttons and lists needed
const pause = document.getElementById('pause');
const likes = document.querySelector('ul.likes');
const comment = document.querySelector('#comment-input');
const commentList = document.querySelector('#list');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const heart = document.getElementById('heart');
const submit = document.getElementById('submit');
//Yes I'm bad at naming variables, I know

//Run on load
document.addEventListener("DOMContentLoaded", () => startTimer());

//Create a reset button
const btmDiv = document.querySelector('div');
const reset = newElement('input', {'type': 'button', 'onclick': "resetPage()", 'value': 'reset' });
btmDiv.appendChild(reset);

//Set events
minus.addEventListener('click', (e) => counter.textContent = parseInt(counter.textContent) -  1);
plus.addEventListener('click', (e) => counter.textContent = parseInt(counter.textContent) + 1);
pause.addEventListener('click', togglePause);
heart.addEventListener('click', likeNum);
submit.addEventListener('click', addComment);

function startTimer() {
    //I don't know what the nicest way to format this is? 
    //For readability, I want the anon fn to be on multiple lines due to the if block
    //But setTimeout()'s 2nd arg looks bad no matter where I put it
    //And no I'm not making it a named function
    setTimeout(() => {
        if (!paused)
            counter.textContent = parseInt(counter.textContent) + 1; 
        startTimer();}, 
        1000);
}

function togglePause() {
    //Realistically I could just do a an if/else based on the pause button's textContent, but I used an external bool for readability
    paused = !paused; 
    pause.textContent = (!paused) ? 'pause' : 'resume';
    for (const btn in [minus, plus, heart, submit, reset]) {
        btn.disabled = (!paused) ? true : false;
    }
}

function likeNum() {
    const num = counter.innerText;
    let numInQ = likes.querySelector(`li[num="${num}"]`);
    if (numInQ === null) {
        numInQ = newElement('li', {'num': num, 'count': 1});
        likes.appendChild(numInQ);
    }
    else {
       numInQ.setAttribute('count', parseInt(numInQ.getAttribute('count')) + 1);
    }
    const likeCount = numInQ.getAttribute('count');
    numInQ.textContent = `${num} has been liked ${likeCount} time${(likeCount > 1 ? "s" : "")}`;
}

function addComment(event) {
    event.preventDefault();
    const newComment = newElement('li');
    newComment.textContent = comment.value;
    commentList.appendChild(newComment);
    comment.value = "";
}

function newElement(tagName, attributes) {
    const newElement = document.createElement(tagName);
    if (attributes != null)
        Object.keys(attributes).forEach(k => newElement.setAttribute(k, attributes[k]));
    return newElement;
}

function resetPage() {
    counter.textContent = '0';
    commentList.innerHTML = '';
    likes.innerHTML = '';
    if (paused)
        togglePause();
}