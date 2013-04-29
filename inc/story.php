<?php include 'header.php'; ?>

   <!-- annotizer -->
    <script src="http://s3.documentcloud.org/notes/loader.js"></script>
    <script type="text/javascript" src="//s3.amazonaws.com/s3.documentcloud.org/note_embed/note_embed.js"></script>
  	<div id="annotation_popup"></div>
    <script id="note_container_tmpl" type="text/template">
        <div id="DC-note-<%=noteId%>" class="DC-note-container"></div>
    </script>    
      <div id="annotation-onoff" class="wFull" style="width:310px">
        <p>Explore Sources:&nbsp;&nbsp; 
   	 	      <span class="annotation-toggle" data-state="off">OFF</span> | <span class="annotation-toggle" data-state="on">ON</span>
        </p>
      </div>
    <!-- /annotizer -->
    <!-- story -->
    <div class="article">
        <p>&#8220;Your husband is dead,&#8221; the doctor told Linda Carswell.</p>

        <p>This was not supposed to happen. Jerry Carswell had been admitted to Christus St. Catherine
            Hospital in Katy, Texas, <span class="annotated annotated_1" data-document="520177-kweku-adoboli-email" 
            data-annotation="81825">with kidney stones</span>. The previous night, he&#8217;d been
            walking around his room, <span class="annotated annotated_2" data-document="520177-kweku-adoboli-email"
            data-annotation="81827">talking about basketball and the upcoming presidential
            election</span> with his son, Jordan. The plan was for the 61-year-old to be discharged that morning.</p>
            <p>Upon learning the news, Linda and Jordan Carswell rushed to Jerry&#8217;s bedside. Lying there, sheets
            and blankets folded halfway up his chest, <span class="annotated annotated_3" data-document="520177-kweku-adoboli-email"
            data-annotation="81825">he looked as if he could be dozing</span>,
            except for the tubes running out of his mouth &#8212; remnants of the failed resuscitation
            effort. Linda shrieked and grabbed her husband&#8217;s cold hands, trying in vain to
            stir him. </p>
            <p>The <span class="annotated annotated_4" data-document="520177-kweku-adoboli-email" data-annotation="81827">on-call
            doctor suggested</span> that the Carswells authorize an autopsy, launching the family
            on a traumatic journey that still isn&#8217;t over. </p>
        </div>
      <!-- /story -->
      <script id="taskTemplate" type="text/template">
        <span><%=title%></span><button class="edit">Edit</button><button class="delete">Delete</button>
      </script>
  
<?php include 'footer.php'; ?>