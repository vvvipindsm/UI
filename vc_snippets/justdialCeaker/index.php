<?php 
$c = curl_init('http://localhost/justDial/just.php');
curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
//curl_setopt(... other options you want...)

$html = curl_exec($c);


   preg_match_all ("/:before{.*}/", $html, $result);
   $filterBefore = explode('.',$result[0][0]);
    $filterData = array();
    foreach($filterBefore as $re) {
        if(preg_match('/:before{content:"/',$re)) {
            // filter number only
            $filterstep2 = '/".*"/m';
            preg_match_all($filterstep2, $re, $matches, PREG_SET_ORDER, 0);
            // // get "\9d001" to 01"
            $filterStep3 = substr($matches[0][0],-3,-1);

            // icon-yz:before{content:"\9d002"}' tp icon-yz:
                $getClassclassreg = '/.*:b/m';
             

            preg_match_all($getClassclassreg, $re, $classStep1, PREG_SET_ORDER, 0);
            // icon-yz:b to icon-yz
               $classStep1[0][0] = substr($classStep1[0][0],0,-2);
            
            //  01" t0 01
            
            $finaldata = array(
                'class'=> $classStep1[0][0],
                'number' => classtoOrginalNumber($filterStep3,$classStep1[0][0])
        );
            array_push($filterData,$finaldata);
        }
        
    }

 

if (curl_error($c))
    die(curl_error($c));

// Get the status code
$status = curl_getinfo($c, CURLINFO_HTTP_CODE);

curl_close($c);
function classtoOrginalNumber($data,$class) {

if($class == ''){
  return '+';
}
    switch ($data) {
        case 11:
            return '+';
            break;
        case 14:
            return '(';
            break;
        case 13:
            return ')';
            break;
           

        default:
           return $data -1;
            break;
    }
}
?>