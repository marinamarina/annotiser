(function() {
    var annotationStateOn = false,
        article = $('.article'),
        curEl, 
        dir,
        noteId, 
        tmpl,
        url = "http://www.documentcloud.org/documents/520177/annotations/",
        popup = $('#annotation_popup');

    //Template helper
    window.template = function(id) {
      return _.template($('#' + id).html()); //get a template and compile it straight away
    } 

    //Handling On-Off state  
    $('.annotation-toggle').click( function(e) {
      enbolden(e, true);    
    });
    
    //Add the pop-up annotations
    $('.article').delegate('.annotated', 'click', function(e) {
        curEl = $(e.currentTarget);
                
        noteId = $(this).attr('data-annotation');         
        tmpl = template("note_container_tmpl");
        $('#annotation_popup').html("")
                              .append(tmpl({noteId: noteId}));  
        loadNote(noteId);
    });
    
    //Close annotations
    $(".annotation-close-box").live('click', hide);
    
    //////////////////////FUNCTIONS/////////////////////////////////////////////
  function enbolden (e) {
      var $this = $(e.currentTarget);
      $this.css('font-weight', 'bold')
           .siblings().css('font-weight', 'normal');
      article.removeClass("annotationMode");
      if ($this.attr('data-state') === "on") { article.addClass("annotationMode"); }
    }

  function hide() {
      popup.hide();
  }
  

   function arrowOffset(curEl) {
    var offset, placeholder,
        nodeWords = curEl.html().split(" ");

    nodeWords[0] = nodeWords[0] + "<span class='annotationPlaceholder'><\/span>";
    curEl.html(nodeWords.join(" "));
    placeholder = $(".annotationPlaceholder");
    offset = placeholder.offset().left;
    placeholder.remove();
    return offset;
  }

  function verticalPositionArrowDown (curEl) {    
    $('#annotation_popup').show().offset({
         top  : curEl.offset().top - $(".DC-note-container").height() - 40
    });
  }

  function verticalPositionArrowUp (curEl) {
    var height = $('#annotation_popup').height();

    $('#annotation_popup').show().offset({
         top  : curEl.offset().top - $(".DC-note-container").height() + height + 8//-40 
    }).find('.DC-note').css('margin-top', '8px');
  }

  function loadNote (noteId) {
    dc.embed.loadNote(url + noteId + '.js',
      {afterLoad: function() { 
            afterLoad(curEl);
                    }
      });
  }

  function afterLoad (curEl) {
    
    //step 1: position vertically
    if(curEl.position().top < $('#annotation_popup').height()) {
      dir = 'up';
      verticalPositionArrowUp(curEl);
    } else {
      dir = 'down';
      verticalPositionArrowDown(curEl);
    }
        
    $(".DC-note").append("<div class='annotation-close-box'>&nbsp;<\/div>").append("<div class='annotation-arrow-" + dir +"'>&nbsp;<\/div>");
    
    //step 2: position the arrow
    $(".annotation-arrow-" + dir + "").offset({"left" : arrowOffset(curEl) - 25 }); 
            
    //step 3: scroll the page, if can't see the whole note
    if ( ($('#annotation_popup').offset().top - $(window).scrollTop() < 0 ) ) {
      $('html, body').animate({scrollTop: $('#annotation_popup').offset().top }, 750);
    }      
  } 
}());