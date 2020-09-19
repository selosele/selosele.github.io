---
layout: null
---

var idx = lunr(function () {
  this.field('title')
  this.field('summary')
  this.field('categories')
  this.field('tags')
  this.ref('id')

  this.pipeline.remove(lunr.trimmer)

  for (var item in store) {
    this.add({
      title: store[item].title,
      summary: store[item].summary,
      categories: store[item].categories,
      tags: store[item].tags,
      id: item
    })
  }
});

$(document).ready(function() {
  $('#search-input').on('keyup', function () {
    var resultdiv = $('#results');
    var query = $(this).val().toLowerCase();
    var result =
      idx.query(function (q) {
        query.split(lunr.tokenizer.separator).forEach(function (term) {
          q.term(term, { boost: 100 })
          if(query.lastIndexOf(" ") != query.length-1){
            q.term(term, {  usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, boost: 10 })
          }
          if (term != ""){
            q.term(term, {  usePipeline: false, editDistance: 1, boost: 1 })
          }
        })
      });
    resultdiv.empty();
    resultdiv.prepend('<p class="results__found">'+result.length+'{{ site.data.ui-text[site.locale].results_found | default: "Result(s) found" }}</p>');
    for (var item in result) {
      var ref = result[item].ref;
      if(store[ref].teaser){
        var searchitem =
          '<div class="list__item">'+
            '<article aria-labelledby="title-'+store[ref].aria+'" aria-describedby="desc-'+store[ref].aria+'" itemscope itemtype="https://schema.org/CreativeWork" class="archive__item">'+
              '<h2 class="archive__item-title">'+
                '<a href="'+store[ref].url+'" rel="permalink" id="title-'+store[ref].aria+'">'+store[ref].title+'</a>'+
              '</h2>'+
              '<p itemprop="description" id="desc-'+store[ref].aria+'" class="archive__item-summary">'+store[ref].summary.split(" ").splice(0,20).join(" ")+'...</p>'+
            '</article>'+
          '</div>';
      }
      else{
    	  var searchitem =
          '<div class="list__item">'+
            '<article aria-labelledby="title-'+store[ref].aria+'" aria-describedby="desc-'+store[ref].aria+'" itemscope itemtype="https://schema.org/CreativeWork" class="archive__item">'+
              '<h2 class="archive__item-title">'+
                '<a href="'+store[ref].url+'" rel="permalink" id="title-'+store[ref].aria+'">'+store[ref].title+'</a>'+
              '</h2>'+
              '<p itemprop="description" id="desc-'+store[ref].aria+'" class="archive__item-summary">'+store[ref].summary.split(" ").splice(0,20).join(" ")+'...</p>'+
            '</article>'+
          '</div>';
      }
      resultdiv.append(searchitem);
    }
  });
});
