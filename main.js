componetTempHtml = [];
errorNode = ""
styleDom = ""
componetClassHtml = [];
counter = 0;
activeDom = ''
extraClass = ' section'
lastCreatedDom=''
configure_sec= ''

blockShortKey = false
$(function(){

 
    configure_sec= $('#configure_sec').html()
    styleDom = $('<style>')
   
    errorNode =  $('#error')
    $('input[type=text]').click(function(){
        blockShortKey = true
    })
    $('input[type=text]').blur(function(){
        blockShortKey = false
    })
    commonStyleConfig()
})
function commonStyleConfig(){
    dataList = $('#common_class')
   commonStyle.map(function(className){
    //    console.log(className)
       dataList.append('<option value="'+className+'"></option>')

   })
}
function handleDeleteDom(){
    if(activeDom !== ''){
   
        var person = confirm("Are your sure to delete");

        if (person) {
            
            activeDom.remove()
            activeDom = $('#view_sec')
        }
      
    }
}
function removeStyle(ele,id){
    var stylecss = id
    var id =  $('#'+id)
    // $(ele).text('')

    //sibling doms
     id.siblings().removeClass('radio_btn_active')
    var styleConvertToCamelTocss = stylecss.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^_/, "");
    // console.log(styleConvertToCamelTocss)
    if(activeDom == ''){
        alert("please select any dom")
        return null;
    }
  
    activeDom.css(styleConvertToCamelTocss, "");

}
function resetConfig() {
    $('#configure_sec').html(configure_sec)
}


document.onkeypress = function (e) {
    e = e || window.event;
   
    if(e.key =='d' && !blockShortKey){
        handleDeleteDom()
    }
  
    if(e.key == 'c' && !blockShortKey){
        handleComponent('s')
    }
    if(e.key == 'a' && !blockShortKey){
        handlelastCreatedDom()
    }
    if(e.key == 'r' && !blockShortKey){
       resetConfig()
    }
    if(e.key == 'b' && !blockShortKey){
        generateCode()
     }
     if(e.key == 'x' && !blockShortKey){
        closeModel()
     }

};
function closeModel(){
    $('#code_sec').hide(1000)
}
function removeCommonClass(cuEle){
    var className  = $(cuEle).text()
    activeDom.removeClass(className)
    $(cuEle).remove();
}   
function addCommonClass(currtDom){
    activeDom.addClass($(currtDom).val())
    activeDom.removeClass('section')
 
 var commonClassListele = $('#commonClassList')
    commonClassListele.append('<div class="addClassitems" onclick="removeCommonClass(this)">'+$(currtDom).val()+'</div>')
    $(currtDom).val('')
    activeDom.addClass('section')

}
function inputStyleToElement(thisEle){
    var selectedValue = $(thisEle).val()
    var tagetInput= $(thisEle).attr('id')
    // alert(selectedValue)
   
   var styleConvertToCamelTocss = tagetInput.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^_/, "");

//    console.log(styleConvertToCamelTocss)
    if(selectedValue != 0) {
    activeDom.css(styleConvertToCamelTocss,selectedValue)
    }else {
        activeDom.css(styleConvertToCamelTocss,"")
    }
}
function handleRadioBoxSeletion(thisEle,tagetInput){
    var selectedValue = $(thisEle).text()
    // alert(selectedValue)
    var targetDom =  $('#'+tagetInput)
    targetDom.val(selectedValue)

    //sibling doms
     targetDom.siblings().removeClass('radio_btn_active')
    $(thisEle).addClass('radio_btn_active')
   if(activeDom == ''){
       alert("please select any dom")
       return null;
   }
   var styleConvertToCamelTocss = tagetInput.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "-" + y.toLowerCase()}).replace(/^_/, "");

//    console.log(styleConvertToCamelTocss)
    activeDom.css(styleConvertToCamelTocss,selectedValue)
}
function handleActiveDom(e,ele){
    e.stopPropagation();
    if(activeDom !== ''){
        activeDom.removeClass('activeDom')
    }
    activeDomTemp = $(ele)
    activeDom = activeDomTemp
    activeDomTemp.addClass('activeDom')
   var info = $('#info')
   info.fadeIn();
   console.log(activeDomTemp.attr('class'))
   info.text('className :'+activeDomTemp.attr('class').replace("section activeDom", "")+"\n\n"+"styles  :"+activeDomTemp.attr('style'))
}
function handleComponent(ele){
    
     try {

        
         var className = $('#className').val()
         if(className == '') {
            var classNamePromt = prompt('Enter Class Name');
            // var bar = confirm('Confirm or deny');
           if(classNamePromt !== null){
            className =classNamePromt
           }
           else {
               return null;
           }
         }
         var prefix = $('#Prefix').val()
         var commonClass = $('#commonClass').val()
        var component = parseAttribute('compoment')

        createDom(className,counter,component,commonClass,prefix)
        //counter 
        counter = counter + 1;
      }
      catch(err) {
         errorNode.html(err.message);
      }
}
function handlelastCreatedDom(){
    if(activeDom !== ''){
        activeDom.removeClass('activeDom')
    }
    activeDomTemp = lastCreatedDom
    activeDom = activeDomTemp
    activeDomTemp.addClass('activeDom')
}

function createDom(className,counter_temp,component,commonClass,prefix) {
   
    try {
      
        var dom = '';
        dom += '<'+component+' ';
        dom += 'id="dom'+counter_temp+'" counter="'+counter_temp+'" '
        dom += 'onclick="handleActiveDom(event,this)"'
        dom += ' class = "'+screenName+"."+className+' '+commonClass+extraClass+'"'
        dom += ' specifyClass = "__'+className+'__">'
        if(component != 'div' ) {
            dom +="__"+prefix+"__"
        }
        dom += '</'+component+'>'
        if(activeDom == '') {
            $('#view_sec').append(dom).show('slow');
        }
        else {
            activeDom.append(dom).show('slow');
        }
        lastCreatedDom = $('#dom'+counter_temp)
        var html_code = $('#view_sec').html()
      
        // $('#html_code_sec').text(html_code)
    }   
    catch(err) {
        console.log(err);
    }
}
function parseAttributeStyle(id) {
    try {

     var tagetInput = $('#'+id)
     if(tagetInput.val() !== '') {
        
        var parms = id.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
     return classNameObj =  parms+':'+tagetInput.val()+';\n'
     }
     else {
         return ''
     }
    
      
    }
    catch(err){
        errorNode.html(err.message);
    }
}
function parseAttribute(id) {
    try {
     var tagetInput = $('#'+id)
     if(tagetInput.val() == 'View') {
        return 'View'
      }
      else {
        return 'Text'
     }
     
    }
    catch(err){
        errorNode.html(err.message);
    }
}