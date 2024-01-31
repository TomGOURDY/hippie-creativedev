document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 1000); // 1000 milliseconds = 1 second
    });
});


document.querySelector('.button3').addEventListener('click', () => {
    motionInstance = new Motion();
    motionInstance.initialize();
});

