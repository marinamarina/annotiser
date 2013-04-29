<?php
    //$posted = sprintf("Today is %s, %s %d", 'June', '7th', 2012);
    //echo $posted;
    
    $results = sscanf("June 7th, 2012", "%s%[^,],%d", $month, $day, $year);//this is an array
    print($day);