$(function(){
	
	//set max and min for input
	var min = 1;
    var max = 999;

	$("#Up").click(function(){
	  if($("#input").val() < max && $("#input").val() >= min )
	    $("#input").val(Number($("#input").val()) + 1);  // increment
	});
	
	$("#Down").click(function(){
	  if($("#input").val() <= max && $("#input").val() > min )
	    $("#input").val(Number($("#input").val()) - 1);  // decrement
	});
		
});