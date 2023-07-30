const skills = document.querySelector(".skills");
let n = 0;
const photoInput = document.getElementById("photoInput");
const header = document.querySelector("header");
let height = 210;
const addNewSection = target =>{
    const skillsForm =  target.closest(".skills__form");
    const skillsInput = skillsForm.cloneNode(true);
    const btnDelete = skillsInput.querySelector(".btn-deleted");
    btnDelete.classList.remove("hidden");
    const skillItem = skillsForm.closest(".skills__item")
    
    const skillsChilds = Array.from(skillsInput.querySelectorAll("[data-name]"));
    skillsChilds.map(childs =>{
        childs.value = "";
        const regexp = new RegExp(/\d/);
        const indexNumber = regexp.exec(childs.dataset.name);
        if(indexNumber){
            childs.dataset.name = childs.dataset.name.replace(childs.dataset.name[indexNumber.index],n);
        }else{
            childs.dataset.name = childs.dataset.name + n;
        }
    })
    skillItem.appendChild(skillsInput);

    const dataBtnAttribute = target.dataset.section;
    console.log(dataBtnAttribute);
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

photoInput.addEventListener('change',(e)=>{
    const file = e.target.files[0];
    console.log(file);
    if(!file) throw new Error("Se debe seleccionar una imagen valida")
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load',()=>{
        const dataSrc = fileReader.result;
        const profile = document.getElementById("profile");
        profile.src = dataSrc
    })
})

const deletedSection = (target) =>{
    const skillsForm =  target.closest(".skills__form");
    const data = skillsForm.querySelector("[data-name]");
    console.log(data.dataset.name)
    const cvData = document.querySelector(`.containerCv [data-name="${data.dataset.name}"]`);
    console.log(cvData);
    const cvSection = cvData.closest(".section__container");
    cvSection.remove();
    skillsForm.remove();
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
        height+=10;
    }

    if(target.matches(".btn-deleted")){
        deletedSection(target);
        (height > 210)? height-=10 : 210; 
    }

}

const createPDF = () =>{
    const pdfContent = document.querySelector(".containerCv");
    const widthDocument = 784;
    const heightDocument = 635;

    // Convertir el contenido HTML a imagen utilizando html2canvas
    html2canvas(pdfContent, {
        scale: 2,
      onrendered: function(canvas) {
        const imgData = canvas.toDataURL('image/png');
        const width = 210;
        // Crear el documento PDF y agregar la imagen
        const doc =new jsPDF( 'p', 'mm', [width, height]);
        doc.addImage(imgData, 'PNG', -2, 15);
  
        // Generar el archivo PDF y descargarlo
        doc.save("mi_archivo.pdf");
      }
    });
}

header.addEventListener("click",(e)=>{
    const target = e.target;
    if(target.matches(".btn-pdf")){
        createPDF();
    }
})

skills.addEventListener("click",ChangeData);
skills.addEventListener('input',ChangeData);