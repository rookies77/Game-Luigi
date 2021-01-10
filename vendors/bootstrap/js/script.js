$(function(){
console.log('coucou')

$('.progress-bar').each(function(){
    console.log($(this).attr('aria-valuenow'));

    $(this).animate({
        width: $(this).attr('aria-valuenow') + "%",
    },2000)
})



// gestion de la telecommande du carousel

$('#btpause').click(function(){
    $('.carousel').carousel('pause');
})

$('#btprev').click(function(){
    $('.carousel').carousel('prev');
})
$('#btfirst').click(function(){
    $('.carousel').carousel(0);
})

$('#btnext').click(function(){
    $('.carousel').carousel('next');
})
$('#btlast').click(function(){
    $('.carousel').carousel($('.carousel-item').length -1);
})


})