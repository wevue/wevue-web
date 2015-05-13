// LovinFlat Template - close menu on tap code

    //Minimizes the menu on the mobile after clicking
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });