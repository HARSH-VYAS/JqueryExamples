$(function(){
        var suggestions =[];
        var currencies = [];
        $.ajax({
                async:false,    
                url: 'https://api.viki.io/v4/search.json?c=b&per_page=5&with_people=true&with_paywall=1&app=100266a&t=1440586215',
                type: 'get',
                success: function(data){
                        dataReceived(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    var errorMsg = 'Ajax request failed: ' + xhr.responseText;
                    $('#content').html(errorMsg);
                  }
                });
                
            

            function dataReceived(data){
                
                suggestions=data;   
                for(var i=0;i<suggestions.length;i++){
                    //console.log(suggestions[i].t +""+suggestions[i].tt);                  
                     var value = '{ value :"'+suggestions[i].tt+'", data:"'+suggestions[i].e+'"}';
                     var str = JSON.stringify(eval("(" + value + ")"));
                     currencies.push(JSON.parse(str));
                }
                return currencies;
            };
            
  $('#autocomplete').autocomplete({  
    lookup:currencies,
    onSelect: function (suggestion) {   
      var thehtml = '<strong>Series Name:</strong> ' + suggestion.value + ' <br> <strong>Number Of Episodes:</strong> ' + suggestion.data;
      $('#outputcontent').html(thehtml);
    }
  });
  
});