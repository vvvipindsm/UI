finalStyle  = {}
styleCode = ''
htmlCode = ''
htmlDom = ''
 screenName = ''
$(function(){
   screenName = prompt('Enter Screen Name');
  // var bar = confirm('Confirm or deny');
 if(screenName !== null){
  screenName = screenName
 }
 else {
  screenName = 'Styles';
 }
  $('#code_sec').hide()
    //  alert("sdfsdf")
    styleCode = $('#styleCopytext')
    htmlDom = $('#htmlCopytext')
    //  generateCode()
 })
function generateCode() {
  
    var htmlcodeFromView = $('#view_sec').html()
    $('#code_sec').show(1000)
    $('#view_sec_copy').html(htmlcodeFromView)
    var htmlDoms = $('#view_sec_copy *')  

    counter = 0;
   
    htmlDoms.map(function(i,ele){
        styles = $(ele).attr('style')
        var classNameDom = $(ele).attr('specifyclass')
     
        if(typeof styles != 'undefined'){
       
            var regex = /;/gm;
           
            var subst = `,`;   

            var removeSemicolunTocommaStyle = styles.replace(regex, subst);

            addSingleDoudsToStyle(removeSemicolunTocommaStyle,classNameDom)
          
            var styleString = JSON.stringify(finalStyle,null,2)
       
            stndardString = styleConvertStndardForamt(styleString)
            // console.log(stndardString)
            stndardString  = removeDoubleQuotesOfIndex(stndardString)
            var appendString = "import {StyleSheet } from 'react-native';\nconst styles = StyleSheet.create({  \n"
            var prependString = '})\n export default '+screenName+';'
             totalStyle = appendString + stndardString + prependString
           
      

        }
        
       createHtmlDOm(i,ele)
        counter = i

    }) 
    htmlContent = AlignHTML()
    $('#htmlCopytext').val(htmlContent)
    styleCode.html(totalStyle)

    
  
 }
 function AlignHTML() {
  var elehtml = $('#view_sec_copy').html()
  
  // change class to className
  var regex = /class="/gm;
  var subst = `style={[`;
  elehtml = elehtml.replace(regex, subst);


  //session "  => }
  var regex = /section"/gm;
  var subst = `]}`;
  elehtml = elehtml.replace(regex, subst);

  var regex = /section activeDom"/gm;
  var subst = `}`;
  elehtml = elehtml.replace(regex, subst);
//remove _A
  var  regex =  /__.__/gm;
  var subst = ``;
  elehtml = elehtml.replace(regex, subst);


  var  regex =  /___/gm;
  var subst = ``;
  elehtml = elehtml.replace(regex, subst);


  //enter after >
  var  regex =  />/;
  var subst =  `>\n`;
  elehtml = elehtml.replace(regex, subst);

  var  regex = /view/mg;
  var subst =  `View`;
  elehtml = elehtml.replace(regex, subst);

  var  regex = /text/mg;
  var subst =  `Text`;
  elehtml = elehtml.replace(regex, subst);

  var  regex = /<\/View>/mg;
  var subst =  `</View>\n`;
  elehtml = elehtml.replace(regex, subst);


  return elehtml
 }
 function createHtmlDOm(i,ele){
 
    $(ele).removeAttr('specifyclass').removeAttr('onclick').removeAttr('id').removeAttr('style').removeAttr('counter')
    $(ele).removeClass('activeDom')
     var classes =  $(ele).attr('class')
    var classArray = classes.split(' ')
    classArray.map(function(a,i){
      if(a != 'section'){
        classArray[i] = a
      }
    })
    var returnClass = classArray.toString()
   
    $(ele).attr('class',returnClass)
 }
 function removeDoubleQuotesOfIndex(style){
     var commonIndex = ['"flex-flow"','"justify-content"','"align-items"','"flex-direction"','"flex-wrap"','"flex-shrink"','"flex-grow"','"flex-basic"','"display"']
     commonIndex.map(function(a,i) {
        var regex = new RegExp(a , 'gm'); 
      
        var replaceValue = handleStyleTocamel(a)
         style = style.replace(regex,  eval(replaceValue));
        
     })
     var commonNumber = ['"1"','"2"','"3"','"4"','"5"','"6"','"7"','"8"','"9"']
     commonNumber.map(function(search,i) {
        var regex = new RegExp(search , 'gm'); 
        
        var replaceValueNumber = handleStyleTocamel(search,true)
         style = style.replace(regex,  eval(replaceValueNumber));
        
     })
  
     return style
 }
 function handleStyleTocamel(stylePropty,onlyRemoveDoubleQuotes = false){
     
     var regex = /"/gm;
    
    var subst = ``;

// The substituted value will be contained in the result variable
    
      stylePropty = stylePropty.replace(regex, subst);
      if(onlyRemoveDoubleQuotes){
        return stylePropty
      }
        stylePropty = toCamelCase(stylePropty)
     return '"'+stylePropty+'"'
 }
 function styleConvertStndardForamt(styelString){
    var regex = /"__/gm;
 
    var subst = ``;
    

    styelString = styelString.replace(regex, subst);

     regex = /__"/gm;
 
     subst = ``;

    styelString = styelString.replace(regex, subst);

    regex = /,/gm;
 
    subst = `,\n`;

   styelString = styelString.replace(regex, subst);

   regex = /{/gm;
 
   subst = `{\n`;

  styelString = styelString.replace(regex, subst);

  regex = /},/gm;
 
  subst = `}\n`;

 styelString = styelString.replace(regex, subst);


  regex = /}/gm;
 
    subst = `},\n`;
 
   styelString = styelString.replace(regex, subst);



  regex ='/:/m';
 
  subst =':\\n';

 styelString = styelString.replace(regex, subst);

 regex =  /},,/gm;
 
 subst  = ``;


styelString = styelString.replace(regex, subst);


regex =   /" /gm;
 
subst  = `"`


styelString = styelString.replace(regex, subst);
    // console.log(styelString)
     return styelString
 }
function addSingleDoudsToStyle(style,className){
 
    
    var splitedStyle = style.split(',')
    
    mystyle = {}
    
    counter = 1
    splitedStyle.map(function(ele){
         var particularStyleParse = ele.split(':')
        if(particularStyleParse.length > 1) { 
            

          mystyle[particularStyleParse[0]] = particularStyleParse[1]
        }
        
     counter += 1
    })
    mystyle['display'] = 'flex'
    finalStyle[className] = mystyle
   
   
}


 function styleConvertIntoObejct(style){
    var splitedStyle = style.split(';')
    
    
    
    splitedStyle.map(function(ele){
         var particularStyleParse = ele.split(':')
        //  console.log()
    })
 }
 function handleCopy(ele){
     var me = $(ele)
     me.text('copied')
    
     
     var $temp = $("<input>");
     $("body").append($temp);
     $temp.val(styleCode.html()).select();
     document.execCommand("copy");
     $temp.remove();
     setTimeout(function(){
        me.text('click to copy')
     },2000)

 }
 function toCamelCase(s) {
    // remove all characters that should not be in a variable name
    // as well underscores an numbers from the beginning of the string
    s = s.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, "").trim().toLowerCase();
  
    // uppercase letters preceeded by a hyphen or a space
    s = s.replace(/([ -]+)([a-zA-Z0-9])/g, function(a,b,c) {
      return c.toUpperCase();
    });
  
    // uppercase letters following numbers
    s = s.replace(/([0-9]+)([a-zA-Z])/g, function(a,b,c) {
      return b + c.toUpperCase();
    });
  
    return s;
  }