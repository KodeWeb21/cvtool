const skills = document.querySelector(".skills");
let n = 0;
const addNewSection = target =>{
    const skillsForm =  target.closest(".skills__form");
    const skillsInput = skillsForm.cloneNode(true);
    const skillItem = skillsForm.closest(".skills__item")
    
    const skillsChilds = Array.from(skillsInput.querySelectorAll("[data-name]"));
    skillsChilds.map(childs =>{
        childs.value = "";
        childs.dataset.name = childs.dataset.name + n;
    })
    skillItem.appendChild(skillsInput);

    const dataBtnAttribute = target.dataset.section;
    if(dataBtnAttribute){
        const skillsDataCV = document.querySelector(`.containerCv [data-section="${dataBtnAttribute}"] `);
        const skillContainer = skillsDataCV.closest(".section");
        const skillDataClone = skillsDataCV.cloneNode(true);
        const editsCV = Array.from(skillDataClone.querySelectorAll("[data-name]"));
        editsCV.map(edit =>{
            edit.textContent = "";
            edit.dataset.name = edit.dataset.name + n;
        })
        skillContainer.appendChild(skillDataClone);
        n++;
    }
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