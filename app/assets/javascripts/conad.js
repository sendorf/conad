$(function(){

  //var server = document.getElementsByClassName("servers")[0];

  //var server_id =server.getAttribute("data-change-server-id")

  //alert(server_id);

  // Collapse togglers fix
  $(document).on('click', "li a[data-change-server-id]", function(event){
    event.stopPropagation();
    event.preventDefault();

    gon.server_id = this.getAttribute("data-change-server-id");
  });


});