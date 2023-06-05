const skills = document.querySelector(".skills");

skills.addEventListener("click",(e)=>{
    const target = e.target;
    if(target.matches(".btn-desc") || target.matches(".btn-desc *")){
        const skillsItem = target.closest(".skills__item");
        const formSkills = skillsItem.querySelector(".skills__form");

        skillsItem.classList.toggle("activeSkill")
        formSkills.classList.toggle("hidden")
    }
})