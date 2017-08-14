function hideStickyMenu (vSelector, toggle = true, vTop = 50) {
    var prevTopPos = 0;
    var scrollTimeout; // таймер для прореживания обработки события скроллинга
    var TIMEOUT_SCROLL = 10; // длительность прореживания скроллинга
    const headerNav = document.querySelector(vSelector); // шапка
    
    /** Основная функция - проверить позицию и показать/спрятать шапку сайта */
    function doTheJob() {
        let top = window.pageYOffset || document.documentElement.scrollTop;
        // console.log(`::::: (${top} > ${vTop} && ((${toggle} && ${prevTopPos} < ${top}) || !${toggle}))`);
        if (top > vTop && (!toggle || (prevTopPos < top))) {
            //console.log('-');
            //headerNav.style.display = 'none';
            mnu.style.transition = '0.3s';
            mnu.style.marginTop = '-50px';
        } else {
            //console.log('+');
            //headerNav.removeAttribute('style');
            mnu.style.marginTop = '';
        }
        prevTopPos = top;
    }

    /** функция вызывающая основную с прореживанием по времени обработки события скроллинга */
    function scrollProcessing() {
      if (!scrollTimeout) {
        doTheJob()
        /* throttle - проредим срабатывание события onscroll */
        scrollTimeout = setTimeout(function() {
          clearTimeout(scrollTimeout);
          scrollTimeout = null;
        }, TIMEOUT_SCROLL);
      }
    }

    /** повесим на событие скроллинга свой обработчик */
    window.addEventListener('scroll', function() {
        scrollProcessing();
    });
};
