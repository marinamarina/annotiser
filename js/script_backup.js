(function() {
    var annotationStateOn = false, 
        curEl;

    //Template helper
    window.template = function(id) {
      return _.template($('#' + id).html()); //get a template and compile it straight away
    } 

    //Handling On-Off state  
    $('#annotation-onoff').delegate('.annotation-toggle', 'click', function() {
      var $this = $(this);
      $this.siblings().css('font-weight', 'normal');
      $this.css('font-weight', 'bold');
      if ($this.attr('data-state') == 'on') {
       $('.article').addClass('annotationMode'); 
       annotationStateOn = true; 
      } else { 
        $('.article').removeClass('annotationMode');
      }
      
    });
    
    //Add the pop-up annotations
    $('.article').delegate('.annotated', 'click', function(e) {
        curEl = $(e.currentTarget);
                
        var noteId = $(this).attr('data-annotation');         
        var tmpl = template("note_container_tmpl");

        $('#annotation_popup').html("");
        $('#annotation_popup').append(tmpl({noteId: noteId}));  
        dc.embed.loadNote('http://www.documentcloud.org/documents/520177/annotations/' + noteId + '.js', {afterLoad: function() {
            $(".DC-note").append("<div class='annotation-close-box'>&nbsp;<\/div>").append("<div class='annotation-arrow'>&nbsp;<\/div>");
            //step 1
            $('#annotation_popup').show().offset({
                      top  : curEl.offset().top - $(".DC-note-container").height() - 40
            });
            //step 2
            $(".annotation-arrow").offset({"left" : noteOffset(curEl) - 25 }); 
            //step 3
            if ( ($('#annotation_popup').offset().top - $(window).scrollTop() < 0 ) ) {
                $('html, body').animate({scrollTop: $('#annotation_popup').offset().top }, 750);
            }
        }});
    });
    
    //Close annotations
    $(".annotation-close-box").live('click', function() { //add body, .annotation-close-box
      $('#annotation_popup').hide();
    });
    
    //////////////////////FUNCTIONS/////////////////////////////////////////////
   function enbolden (e, state) {
    var article = $(".article");
    this.el.css("font-weight", "normal");
    article.removeClass("annotationMode");
    $(".annotation-toggle[data-state=" + state +"]").css("font-weight", "bold");
    if (state === "on") { article.addClass("annotationMode"); }
  }
  function show() {
    if (annotationStateOn === false) return;
    this.curEl       = $(e.currentTarget);
    this.curEmbed    = $("#annotation_popup");
    var documentId   = this.curEl.attr("data-document");
    var annotationId = this.curEl.attr("data-annotation");
    var tmpl = Carswell.template("#note_container_tmpl");
    this.curEmbed.html(tmpl({id : annotationId}));
    dc.embed.loadNote(Carswell.dcEmbedUrl(documentId, annotationId), { afterLoad : this.afterLoad });
    
  }
  function afterLoad(){
    $(".DC-note").append("<div class='annotation-close-box'>&nbsp;<\/div>").append("<div class='annotation-arrow'>&nbsp;<\/div>");
    //$(".annotation-arrow").offset({"left" : inlineOffset(curEl) - 25 });        
   }
  function noteOffset(curEl) {
    var offset, placeholder,
        nodeWords = curEl.html().split(" ");

    nodeWords[0] = nodeWords[0] + "<span class='annotationPlaceholder'><\/span>";
    curEl.html(nodeWords.join(" "));
    placeholder = $(".annotationPlaceholder");
    offset = placeholder.offset().left;
    placeholder.remove();
    return offset;
  }
}());




