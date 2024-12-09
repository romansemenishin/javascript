function animate({ duration, draw, timing }) {
    let start = performance.now();
  
    function animateFrame(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      let progress = timing(timeFraction);
  
      draw(progress);
  
      if (timeFraction < 1) {
        requestAnimationFrame(animateFrame);
      }
    }
  
    requestAnimationFrame(animateFrame);
  }
  
  function startAnimation() {
    var logo = document.querySelector('.logo');
    var text = document.querySelector('.text');
  
    logo.style.animation = 'none';
    text.style.animation = 'none';
  
    // Використання нової функції animate для анімації кольору фону логотипу
    animate({
      duration: 2000,
      timing: function (timeFraction) {
        return timeFraction;
      },
      draw: function (progress) {
        logo.style.backgroundColor = interpolateColor('#3498db', '#e74c3c', progress);
      }
    });
  
    setTimeout(function () {
      // Додана анімація для тексту, що з'являється динамічно
      animate({
        duration: 2000,
        timing: function (timeFraction) {
          return timeFraction;
        },
        draw: function (progress) {
          text.style.opacity = progress;
          text.style.transform = 'translateY(' + (20 - 20 * progress) + 'px)';
        }
      });
  
      // Додана анімація для руху логотипу та зміни його розміру
      animate({
        duration: 2000,
        timing: function (timeFraction) {
          return timeFraction;
        },
        draw: function (progress) {
          logo.style.transform = 'translateY(' + (-20 * progress) + 'px)';
          logo.style.transform = 'scale(' + (1 + 0.2 * progress) + ')';
        }
      });
  
      // Додана анімація через JavaScript для створення нового об'єкту
      createNewObject();
    }, 100);
  }
  
  function createNewObject() {
    var newObject = document.createElement('div');
    newObject.className = 'new-object';
    document.querySelector('.logo-container').appendChild(newObject);
  
    // Додана анімація для нового об'єкту
    animate({
      duration: 2000,
      timing: function (timeFraction) {
        return timeFraction;
      },
      draw: function (progress) {
        newObject.style.transform = 'translate(-50%, -50%) scale(' + (1 + 0.5 * progress) + ')';
        newObject.style.opacity = 1 - progress;
      }
    });
  }
  
  function interpolateColor(color1, color2, progress) {
    var r = Math.round(parseInt(color1.substring(1, 3), 16) * (1 - progress) + parseInt(color2.substring(1, 3), 16) * progress);
    var g = Math.round(parseInt(color1.substring(3, 5), 16) * (1 - progress) + parseInt(color2.substring(3, 5), 16) * progress);
    var b = Math.round(parseInt(color1.substring(5, 7), 16) * (1 - progress) + parseInt(color2.substring(5, 7), 16) * progress);
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
  }
  