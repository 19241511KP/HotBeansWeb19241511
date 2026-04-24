document.addEventListener("DOMContentLoaded", function() {
  // Choice group feature
  const choiceGroup = document.getElementById("choiceGroup");
  if (choiceGroup) {
    choiceGroup.addEventListener("click", (event) => {
      if (!event.target.classList.contains("choiceBtn")) return;
      
      document.querySelectorAll("#choiceGroup .choiceBtn")
        .forEach(btn => btn.classList.remove("choiceBtnActive"));
      
      event.target.classList.add("choiceBtnActive");
    });
  }
  
  // Drag & drop feature
  const dropZone = document.getElementById("dropZone");
  if (dropZone) {
    dropZone.addEventListener("dragover", (e) => e.preventDefault());
    dropZone.addEventListener("dragenter", (e) => {
      e.preventDefault();
      dropZone.classList.add("dragging");
    });
    dropZone.addEventListener("dragleave", (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragging");
    });
    
    // File type validation dragover
    dropZone.addEventListener("dragover", (e) => {
      const fileItems = [...e.dataTransfer.items].filter(item => item.kind === "file");
      if (fileItems.length === 1) {
        e.preventDefault();
        const item = fileItems[0];
        const isPdf = item.type === "application/pdf";
        const isDocx = item.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        
        if (isPdf || isDocx) {
          e.dataTransfer.dropEffect = "copy";
        } else {
          e.dataTransfer.dropEffect = "none";
          alert("Resume accepted only .docx or .pdf formats");
        }
      }
    });
    
    dropZone.addEventListener("drop", dropHandler);
  }
  
  // Global drag handlers (safe even without dropZone)
  window.addEventListener("drop", (e) => {
    if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
      e.preventDefault();
    }
  });
  
  window.addEventListener("dragover", (e) => {
    const fileItems = [...e.dataTransfer.items].filter(item => item.kind === "file");
    if (fileItems.length > 0) {
      e.preventDefault();
      if (dropZone && !dropZone.contains(e.target)) {
        e.dataTransfer.dropEffect = "none";
      }
    }
  });
  
  // File preview & handlers
  const preview = document.getElementById("preview");
  if (preview) {
    window.displayDocument = displayDocument; // Global for dropHandler
  }
  
  function displayDocument(files) {
    if (!preview) return;
    
    for (const file of files) {
      const isPdf = file.type === "application/pdf";
      const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      
      if (isPdf || isDocx) {
        const li = document.createElement("li");
        li.style.listStyle = "none";
        
        const icon = document.createElement("span");
        icon.textContent = isPdf ? "📄 PDF" : "📄 DOCX";
        icon.style.marginRight = "8px";
        li.appendChild(icon);
        
        const nameSpan = document.createElement("span");
        nameSpan.textContent = file.name;
        nameSpan.style.cursor = "pointer";
        nameSpan.style.textDecoration = "underline";
        nameSpan.style.color = "#303859";
        
        nameSpan.addEventListener("click", () => {
          const url = URL.createObjectURL(file);
          window.open(url, "_blank");
        });
        
        li.appendChild(nameSpan);
        preview.appendChild(li);
      }
    }
  }
  
  function dropHandler(ev) {
    ev.preventDefault();
    const files = [...ev.dataTransfer.items]
      .map((item) => item.getAsFile())
      .filter((file) => file);
    displayDocument(files);
  }
  
  // File input
  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => displayDocument(e.target.files));
  }
  
  // Clear button
  const clearBtn = document.getElementById("clearBtn");
  if (clearBtn && preview) {
    clearBtn.addEventListener("click", () => preview.textContent = "");
  }
  

  function applicationFormRedirect() {
    window.location.href = "applicationForm.html";
  }
  
  const applyBtns = document.querySelectorAll(".applyForVacanciesBtn");
  applyBtns.forEach(button => { 
    button.addEventListener("click", applicationFormRedirect);
  });
  const courseApplyBtns = document.querySelectorAll(".courseRedirect");
  courseApplyBtns.forEach(button => { 
    button.addEventListener("click", applicationFormRedirect);
  });
  const learningOptions = document.getElementById("learningOptions");
  const courseOptions = document.getElementById("courseOptions");
  const courseLabel = document.getElementById("courseLabel");

  learningOptions.addEventListener("change", function(){
    let options = [];

    if(this.value === "apprenticeship"){
      courseLabel.textContent = "Choose apprenticeship you want to apply:"
      options = ["Frontend Software Engineer", "Backend Software Engineer", "Mobile Developer"]
      courseOptions.innerHTML = "";

      options.forEach(item =>{
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        courseOptions.appendChild(option);
      });
    }else if(this.value === "trainingCourse"){
      courseLabel.textContent = "Choose training course you want to apply"
      options = 
      [
        "Foundations of Web Design", 
        "JavaScript Essentials",
        "Pythond Fundamentals", 
        "Introduction to Kotlin"
      ]

      courseOptions.innerHTML = "";

      options.forEach(item =>{
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        courseOptions.appendChild(option);
      });
    }
  })

});