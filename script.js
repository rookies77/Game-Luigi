  
// Navbar affichage de la navbar quand on scroll vers le haut et disparait qaund on scrool vers le bas
let lastScrollTop = 0;
navbar = document.getElementById('navbar');

window.addEventListener('scroll',function(){
    const scrollTop = window.pageTOffset ||
    this.document.documentElement.scrollTop;

    if( scrollTop > lastScrollTop){
        navbar.style.top ="-50px";
        navbar.style.transition ="1s";
    }
    else{
        navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;

});


//   typed automatic
  var typed = new Typed('.typed', {
    strings: ['En reconversion professionnelle depuis 2 ans, Je suis toujours en recherche de challenge pour etoffer mes compétences et acquérir de nouvelles connaissance dans la programmation web'],
    typeSpeed: 100,
    backSpeed: 0,
    smartBackspace: true, // this is a default
    loop: false
  });
    

  
  // Compteur live 
let compteur = 0;

$(window).scroll(function(){
  const top = $('.counter').offset().top - window.innerHeight;

  if(compteur == 0 && $(window).scrollTop() > top) {
    $('.counter-value').each(function(){
      let $this = $(this),
        countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
        countNum : countTo
      },
      {
        duration: 4000,
        easing: 'swing',
        step: function(){
          $this.text(Math.floor(this.countNum));
        },
        complete: function(){
          $this.text(this.countNum);
        }
      });
    });
    compteur = 1;
  }
});


// AOS

AOS.init();