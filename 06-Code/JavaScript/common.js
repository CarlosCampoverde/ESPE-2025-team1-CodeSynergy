$(document).ready(function() {
    // Toggle sidebar
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $(".wrapper").toggleClass("toggled");
    });
});