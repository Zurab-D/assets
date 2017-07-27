function hideStickyMenu (vSelector) {
    var prevTopPos = 0;
    var scrollTimeout; // таймер для прореживания обработки события скроллинга
    var TIMEOUT_SCROLL = 10; // длительность прореживания скроллинга
    const headerNav = document.querySelector(vSelector); // шапка
    
    /** Основная функция - проверить позицию и показать/спрятать шапку сайта */
    function doTheJob() {
        let top = window.pageYOffset || document.documentElement.scrollTop;
        if (top > 100 && prevTopPos < top) {
            headerNav.style.display = 'none';
        } else {
            headerNav.removeAttribute('style');
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
    document.querySelector('.sumome-share-client').remove();
};
