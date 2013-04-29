<?php 
///Functions////
include 'Person.php';

$post = array(
    'title' => 'My blog first post',
    'name'  =>'Martyn',
   'age'    =>'28',
   'publish-date'=>'6-08-2013',
    'category' => 'php category'
);
extract($post);
//$email = "<h2>{$post['title']}</h2>";
//$email.= "<p>{$post['name']}</p>";
//$email.="<p>{$post['publish-date']}</p>";

$email = <<<EOT
    <h1>{$title}</h1><br/>
    <p>{$category}</p>
EOT;
    
echo $email;
<<<EOT

EOT;
