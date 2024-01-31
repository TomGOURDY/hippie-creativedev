document.querySelectorAll(".button").forEach((button)=>{
    button.addEventListener("click", ()=>{
        button.classList.add("clicked");
        setTimeout(()=>{
            button.classList.remove("clicked");
        }, 1000);
    });
});

//# sourceMappingURL=index.9345d665.js.map
