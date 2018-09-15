document.addEventListener("DOMContentLoaded", function(event) {
  $(".js-modal-btn").modalVideo();

  featuresArray = document.querySelectorAll('.features .feature');

  featuredBar = document.querySelector('.graph__datapoint--featured .graph__datapoint__bar');
  mediumBar = document.querySelector('.graph__datapoint--medium .graph__datapoint__bar');
  smallBar = document.querySelector('.graph__datapoint--small .graph__datapoint__bar');

  mediumBar.style.width = featuredBar.offsetWidth * (mediumBar.dataset.percentage / 100) + 'px';
  smallBar.style.width = featuredBar.offsetWidth * (smallBar.dataset.percentage / 100) + 'px';

  featuresArray.forEach(function(feature) {
    feature.querySelector('.feature__title').addEventListener('click', function() {
      document.querySelector('.feature--active').classList.remove('feature--active');
      feature.classList.add('feature--active');
    });

    feature.querySelector('.feature__title').addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        document.querySelector('.feature--active').classList.remove('feature--active');
        feature.classList.add('feature--active');
      }
    });
  });

  var animate = new Animate({
        target: '[data-animate]',
        offset: [0.5, 0.5]
    });
    animate.init();

  var optimizedResize = (function() {

    var callbacks = [],
        running = false;

    // fired on resize event
    function resize() {

        if (!running) {
            running = true;

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(runCallbacks);
            } else {
                setTimeout(runCallbacks, 66);
            }
        }

    }

    // run the actual callbacks
    function runCallbacks() {

        callbacks.forEach(function(callback) {
            callback();
        });

        running = false;
    }

    // adds callback to loop
    function addCallback(callback) {

        if (callback) {
            callbacks.push(callback);
        }

    }

    return {
        // public method to add additional callback
        add: function(callback) {
            if (!callbacks.length) {
                window.addEventListener('resize', resize);
            }
            addCallback(callback);
        }
    }
}());

// start process
  optimizedResize.add(function() {
    mediumBar.style.width = featuredBar.offsetWidth * (mediumBar.dataset.percentage / 100) + 'px';
    smallBar.style.width = featuredBar.offsetWidth * (smallBar.dataset.percentage / 100) + 'px';
  });
});
