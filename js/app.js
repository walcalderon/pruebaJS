var calculadora={
    init:function(){
        this.asignarEfectosTeclas()
    },
    operadoo1:"",
    operador2:"",
    tipooperacion:"",
    resultado:0,
    punto:0,
    signo:"+",
    memoria:"",
    //para efecto de tecla presionada y captura de numeros en display
    zoomTeclaPress:function(event)
    {
        var element = event.currentTarget.id
        
        document.getElementById(element).style.borderRadius="14px"
        document.getElementById(element).style.borderStyle="inset"

        if (element=="punto" && calculadora.punto==0){
            element="."
            calculadora.punto=1
        }
        switch (element) {
            case "por":
            calculadora.tipooperacion="por"
                document.getElementById("display").innerHTML=" "
                calculadora.punto=0
                break;
            case "menos":
                calculadora.tipooperacion="menos"
               document.getElementById("display").innerHTML=" "
               calculadora.punto=0
           break;
            case "mas":
                calculadora.tipooperacion="mas"
               document.getElementById("display").innerHTML=" "
               calculadora.punto=0
           break;
            case "dividido":
               calculadora.tipooperacion="dividido"
               document.getElementById("display").innerHTML=" "
               calculadora.punto=0
           break;
           case "punto":
                alert("ya hay un punto decimal")
           break;

           case "igual":
                calculadora.calculo();
           break;

            case "on":
                calculadora.borrar()
            break;

            case "sign":
                calculadora.Fsigno();
            break;

            default:
            //solo se permiten 8 caracteres en pantalla
            if(document.getElementById("display").childNodes[0].textContent.length<=7)
            {            
            var op=""  
            if(calculadora.operadoo1=="" || calculadora.tipooperacion==""){
                op=calculadora.operadoo1+element
                calculadora.operadoo1=op
                
            }else{
                op=calculadora.operador2+element
                calculadora.operador2=op
                
            }
            document.getElementById("display").innerHTML=op
            
            }
            break;
        }
    },
    //regresa la vista del boton a lo normal
    zoomTeclaUp:function(event){
        var element = event.currentTarget.id
        
        document.getElementById(element).style.borderRadius="0px"
        document.getElementById(element).style.borderStyle="none"
        
    },
    asignarEfectosTeclas:function(){
        var teclas=document.getElementsByClassName("tecla")
        for( i=0;i<teclas.length;i++){
            teclas[i].onclick=this.zoomTeclaPress
            teclas[i].onmouseout=this.zoomTeclaUp
            
        }
    },
    borrar:function(){
        this.operadoo1=""
        this.operador2=""
        this.tipooperacion=""
        this.resultado=0
        this.punto=0
        document.getElementById("display").innerHTML="0"
    },
    calculo:function(){
        var tipoOperacion=calculadora.tipooperacion
        if (tipoOperacion=="M")
        {
            calculadora.operador2=calculadora.memoria
            tipoOperacion="mas"
        }
        switch (tipoOperacion){
            case "por":
                calculadora.resultado=parseFloat(calculadora.operadoo1)*parseFloat(calculadora.operador2)
                
            break;
            case "menos":
                calculadora.resultado=parseFloat(calculadora.operadoo1)-parseFloat(calculadora.operador2)
                
            break;
            case "mas":
                calculadora.resultado=parseFloat(calculadora.operadoo1)+parseFloat(calculadora.operador2)
                
            break;
            case "dividido":
                calculadora.resultado=parseFloat(calculadora.operadoo1)/parseFloat(calculadora.operador2)
                
            break;
    
        }
        var resultadoMostrar=String(calculadora.resultado)
        if(resultadoMostrar.length>8){
            resultadoMostrar=resultadoMostrar.substr(0,7)
        }
        document.getElementById("display").innerHTML=resultadoMostrar
        
        //reseteando las variables
        calculadora.operadoo1=String(calculadora.resultado)  //para que quede ne memoria
        calculadora.memoria=String(calculadora.operador2)  //para igual mas de una vez
        calculadora.operador2=""
        calculadora.tipooperacion="M"
        calculadora.punto=0
    },
    Fsigno:function(){
        //verifica si el elemento diplay no un cero
        var pantalla=document.getElementById("display").childNodes[0].textContent
        if(pantalla.substring(0,1)=="-")
            calculadora.signo="-"
        else{
            calculadora.signo="+"
        }
        pantalla=pantalla.replace(" ","0")
    
        if(pantalla!="0"){
    
        if(calculadora.operadoo1!="" && calculadora.operador2==""){
            
            if(calculadora.signo=="+"){
                calculadora.operadoo1="-"+calculadora.operadoo1 
                
            }else{
                calculadora.operadoo1=String(calculadora.operadoo1).substring(1)
                
            }
            document.getElementById("display").innerHTML=calculadora.operadoo1
            
        }else{
            if(calculadora.signo=="+"){
                calculadora.operador2="-"+calculadora.operador2 
            
            }else{
                calculadora.operador2=String(calculadora.operador2).substring(1)
            
            }
            document.getElementById("display").innerHTML=calculadora.operador2
            //reiniciando propiedad signo
            
        }
        }
    }

}

calculadora.init()