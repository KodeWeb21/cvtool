const skills = document.querySelector(".skills");
skills.addEventListener("click",(e)=>{
    const target = e.target;
    if(target.matches(".btn-desc") || target.matches(".btn-desc *")){
        const skillsItem = target.closest(".skills__item");
        const formSkills = skillsItem.querySelector(".skills__form");

        skillsItem.classList.toggle("activeSkill")
        formSkills.classList.toggle("hidden")
    }

    if((target.matches("input") || target.matches("select") || target.matches("textarea")) && target.dataset.name){
        target.addEventListener("input",()=>{
          const dataAttribute = target.dataset.name;
          const rowCv = document.querySelector(`.containerCv [data-name="${dataAttribute}"]`);
          rowCv.textContent = target.value;
        })

    }
})