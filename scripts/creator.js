const skills = document.querySelector(".skills");

const addNewSection = target =>{
    const skillsForm =  target.closest(".skills__form");
    const skillsInput = skillsForm.cloneNode(true);
    const skillItem = skillsForm.closest(".skills__item")
    skillItem.appendChild(skillsInput);
}

const ChangeData = (e) =>{
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

    if(target.matches(".btn-saved")){
        addNewSection(target);
    }
}

skills.addEventListener("click",ChangeData);
skills.addEventListener('input',ChangeData);