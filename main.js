function areaFill(){
    fetch("https://api.cadif1.com/areadeestudio")
    .then(response => response.json())
    .then((data)=> {
        console.log(data);
        let areas = data.areas;
        areas.forEach(area => {
            $("#areaContainer").append(` <div  onclick="CursosFill(${area.id})" class="flex flex-col items-center p-4 w-20% h-200px border-gray-300 border-2 border-solid cursor-pointer">
        <div class="w-12 h-5 bg-[#F25822] rounded-md"> </div>
        <p class="font-bold text-[#00548F] text-center">${area.nombre}</p>
       <p class="text-center">${area.descripcion == null || area.descripcion === "" ? "Lorem ipsum dolor, sit amet consectetur adipisicing elit." : area.descripcion}</p>
       </div>`)
        });
    });
}

areaFill();

function CursosFill(id){
    $("#areasContainer").addClass("hidden")
    $("#Cursos").removeClass("hidden")
    fetch(`https://api.cadif1.com/curso/de_un_area/${id}`)
    .then(response => response.json())
    .then((data)=> {
        console.log(data);
        let cursos = data.cursos;
        $("#cursosContainer").html("")
        cursos.forEach(curso => {
            $("#cursosContainer").append(
                `<div onclick="inforCursos(${curso.id})" class="flex flex-col items-center p-4 w-20% min-h-200px border-gray-300 border-2 border-solid cursor-pointer">
        <div class="w-12 h-5 bg-[#F25822] text-center rounded-md">${curso.codigo} </div>
        <p class="font-bold text-[#00548F] text-center">${curso.nombre}</p>
       <p class="text-center text-ellipsis overflow-hidden">${curso.objetivoresumido}</p>
       <div class="bg-[#2B6EA2] rounded-md p-1 box-border">Tiene ${curso.niveles} niveles</div>
    </div>`
            )
        });
    });
}

function CarrerasFill(){
    fetch(" https://api.cadif1.com/carrera")
    .then(response => response.json())
    .then((data) =>{
        console.log(data);
        let carreras = data.carreras
        carreras.forEach(carrera => {
            if(carrera.activa === "1"){
                $("#carrerasContainer").append(
                    `<div class="flex flex-col items-center p-4 w-20%  border-gray-300 border-2 border-solid">
            <div class="w-12 h-5 bg-[#F25822] text-center rounded-md">${carrera.codigo} </div>
            <p class="font-bold text-[#00548F] text-center">${carrera.nombre}</p>
           <p class="text-center overflow-hidden text-ellipsis">${carrera.objetivo}</p>
            <button onclick="infoCarrera(${carrera.id})" class="bg-[#2B6EA2] rounded-md p-1 box-border">Ver info</button>
        </div>`
                )
            }
            
        });
    })
}
CarrerasFill();


$("#btn-ct").on("click",  ()=>{
    $("#areasContainer").addClass("hidden");
    $("#infoCurso").addClass("hidden")
    $("#Cursos").addClass("hidden");
    $("#Carreras").removeClass("hidden")
    $("#infoCarrera").addClass("hidden")
});

$("#btn-ae").on("click",  ()=>{
    $("#areasContainer").removeClass("hidden");
    $("#infoCurso").addClass("hidden")
    $("#Cursos").addClass("hidden");
    $("#Carreras").addClass("hidden");
    $("#infoCarrera").addClass("hidden")
});

function inforCursos(id){
    fetch(`https://api.cadif1.com//curso/${id}`)
    .then(response => response.json())
    .then((data) =>{
        console.log(data);
        let curso = data.curso
        let niveles =""
        $("#infoCurso").removeClass("hidden")
        $("#Cursos").addClass("hidden")
        for (let i = 0; i < curso.niveles.length; i++) {
            niveles += `
             <div class="flex flex-col items-center mt-1">
                <div class="text-center p-3 w-[209px] rounded-sm text-xs bg-[#2B6EA2] text-white">
                    <p class="w-full">${curso.niveles[i].nombre}<br>
                        ${curso.niveles[i].objetivoprincipal}
                    </p>
                </div>
                <p class="w-[90%] text-xs text-center">
                    No hay secciones planificadas porque este curso se inicia solo con grupos.
                </p>
                
                <button class="bg-[#F25822] rounded-md p-1 box-border text-xs text-white w-[70%]">${curso.niveles[i].precio}Bs</button>
            </div>
        

            `;
            
        }

        $("#infoCurso").html("");
        $("#infoCurso").append(`
            <div class="w-[75%] mx-auto">
        <div class="flex">
            <p class="bg-[#F25822] w-20 rounded-md flex justify-center items-center h-14">${curso.codigo}</p>
            <div class="w-full">
                <h2 class="font-semibold text-3xl ml-3">Curso ${curso.nombre}</h2>
                <hr class="border-gray-400">
                <p class="ml-3 text-xs">${curso.objetivoresumido}</p>
            </div>
        </div>
        <div class="flex justify-around">
        <div class="w-[70%]">
            <h2 class="text-[#00548F] font-bold text-xl">Informacion general</h2>
            <p>${curso.infmateria}</p>
            <h2 class="text-[#00548F] font-bold text-xl">Objetivos general del curso</h2>
            <p>${curso.objetivogeneral}</p>
            <h2 class="text-[#00548F] font-bold text-xl">Hacia quien esta orientado</h2>
            <p>${curso.haciaquienestaorientado}</p>
            <h2 class="text-[#00548F] font-bold text-xl">Recuperacion de la inversion</h2>
            <p>${curso.recuperacioninversion}</p>
            <h2 class="text-[#00548F] font-bold text-xl">certificado a obtener</h2>
            <p class="font-bold">${curso.titulo}</p>
            </div>
        <div class="border-solid border-[.5px] h-[40%] w-[25%] border-gray-400 flex flex-col items-center p-2">
            <p class="bg-[#00548F] w-[90%] rounded-sm p-2 mt-2 text-sm text-white text-center">NiVELES DEL CURSO</p>
            ${niveles}
        </div>
        
            `);
    })
}

function infoCarrera(id){
    fetch(`https://api.cadif1.com/carrera/${id}`)
    .then(response => response.json())
    .then(data => {
        carrera = data.carrera;
        console.log(carrera);
        let pensum = ""
        for (let i = 0; i < carrera.pensum.length; i++) {
            pensum += `
    <details class="w-[80%] my-1">
    <summary class="p-2 text-sm bg-gray-300 focus:bg-[#f25822] hover:bg-[#F25822] cursor-pointer rounded-md list-none">Modulo ${i + 1}</summary>
        <ul class="bg-[#ec9f83b1] rounded-md">
            <li class="hover:bg-[#f25822] rounded-md text-xs cursor-pointer p-2">${carrera.pensum[i][0].materia} ${carrera.pensum[i][0].nivel}</li>
            <li class="hover:bg-[#f25822] rounded-md text-xs  cursor-pointer p-2">${carrera.pensum[i][1].materia} ${carrera.pensum[i][1].nivel}</li>
        </ul>
    </details>
                `;
        }


        $("#infoCarrera").html("");
        $("#infoCarrera").removeClass("hidden")
        $("#Carreras").addClass("hidden");
        $("#infoCarrera").append(`
             <div class="w-[75%] mx-auto">
        <div class="flex">
            <p class="bg-[#F25822] w-20 rounded-md flex justify-center items-center h-14">${carrera.codigo}</p>
            <div class="w-full">
                <h2 class="font-semibold text-3xl ml-3">Curso ${carrera.nombre}</h2>
                <hr class="border-gray-400">
                <p class="ml-3 text-xs">${carrera.objetivoresumido}</p>
            </div>
        </div>
        <div class="flex justify-around">
        <div class="w-[70%]">
            <h2 class="text-[#00548F] font-bold text-xl">Informacion general</h2>
            <p>${carrera.descripcion}</p>
            <h2 class="text-[#00548F] font-bold text-xl">Objetivos general del curso</h2>
            <p>${carrera.objetivo}</p>
            <h2 class="text-[#00548F] font-bold text-xl">Inscripciones</h2>
            <p>Las inscripciones se abren 30 dias antes del inicio y se cierran un dia antes o al agotarse los cupos.</p>
            <h2 class="text-[#00548F] font-bold text-xl">Horarios disponibles para las carreras tecnicas</h2>
            <ul>
            <li>
            Mañana: de 7:15 am a 11:00 am
            </li>
             <li>
            Medio dia: de 11:00 am a 2:45 pm
            </li>
             <li>
            Tarde: de 2:45 pm a 6:30 pm
            </li>
             <li>
            Noche: de 6:30 pm a 10:15 pm
            </li>
            </ul>
            <h2 class="text-[#00548F] font-bold text-xl">Certificado a obtener</h2>
            <p class="font-bold">${carrera.titulo}</p>
            </div>
        <div class="border-solid border-[.5px] h-[40%] w-[25%] border-gray-400 flex flex-col items-center p-2">
            <p class="bg-[#00548F] w-[90%] rounded-sm p-2 mt-2 text-sm text-white text-center">PENSUM DE ESTUDIO</p>
            ${pensum}
        </div>
        
            `);
    })

}