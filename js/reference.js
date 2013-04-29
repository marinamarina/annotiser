propublica.models.Carswell = propublica.Model.extend({
  
  annotationState : "off",
  
  init : function() {
    _.bindAll(this, "setState");
    this.bind("changed", this.setState);
  },
  
  setState : function(e, state) {
    this.annotationState = state;
  },
  
  template : function(query) {
    return _.template($(query).html());
  },
  dcEmbedUrl : function(doc_id, anno_id) {
    return "https://www.documentcloud.org/documents/" + doc_id + "/annotations/" + anno_id + ".js";
  }
});

var Carswell = new propublica.models.Carswell();

propublica.views.annotationHover = propublica.View.extend({
  cssClass : "annotated",
  tag : "span",
  
  bindings : {
    click : "show"
  },
  
  render : function() {
    var that = this;
    _.bindAll(this, 'show', 'afterLoad');
    $("body, .annotation-close-box").live('click', function() {
      that.hide();
    });
    $(document).keyup(function(e) {
      if (e.keyCode == 27 || e.which == 27) { that.hide(); }   // esc
    });
  },
  
  show : function(e) {
    if (Carswell.annotationState === "off") return;
    this.curEl       = $(e.currentTarget);
    this.curEmbed    = $("#annotation_popup");
    var documentId   = this.curEl.attr("data-document");
    var annotationId = this.curEl.attr("data-annotation");
    var tmpl = Carswell.template("#note_container_tmpl");
    this.curEmbed.html(tmpl({id : annotationId}));
    dc.embed.loadNote(Carswell.dcEmbedUrl(documentId, annotationId), { afterLoad : this.afterLoad });
  },
  
  inlineOffset : function() {
    var offset, placeholder;
    var nodeWords = this.curEl.html().split(" ");
    nodeWords[0] = nodeWords[0] + "<span class='annotationPlaceholder'><\/span>";
    this.curEl.html(nodeWords.join(" "));
    placeholder = $(".annotationPlaceholder");
    offset = placeholder.offset().left;
    placeholder.remove();
    return offset;
  },
  
  afterLoad : function() {
    // muck about with the embed
    $(".DC-note").append("<div class='annotation-close-box'>&nbsp;<\/div>").append("<div class='annotation-arrow'>&nbsp;<\/div>");    
    this.curEmbed.show().offset({
      top  : this.curEl.offset().top - $(".DC-note-container").height() - 40
    });
    $(".annotation-arrow").offset({"left" : this.inlineOffset() - 25 });
    // scroll to the top of the note
    if ( (this.curEmbed.offset().top - $(window).scrollTop() < 0 ) ) {
      $('html, body').animate({scrollTop: this.curEmbed.offset().top }, 750);
    }
  },
  
  hide : function() {
    if (Carswell.annotationState === "off") return;
    
    $("#annotation_popup").hide();
  }
});

propublica.views.annotationMode = propublica.View.extend({
  tag : "span",
  cssClass : "annotation-toggle",
  
  bindings : {
    click : "toggle"
  },
  
  render : function() {
    _.bindAll(this, 'enbolden');
    Carswell.bind("changed", this.enbolden);
    
    if (window.location.hash.length > 0 && window.location.hash.match(/annotated/)) {
      Carswell.fire("changed", "on");
    }
  },
  
  toggle : function(e) {
    var curEl = $(e.currentTarget);
    Carswell.fire("changed", curEl.attr("data-state"));
  },
  
  enbolden : function(e, state) {
    var article = $(".article");
    this.el.css("font-weight", "normal");
    article.removeClass("annotationMode");
    $(".annotation-toggle[data-state=" + state +"]").css("font-weight", "bold");
    if (state === "on") { article.addClass("annotationMode"); }
  }
});