(function() {
  function showBtn() {
    const btns = $(this).siblings();

    $(btns).each(function() {
      $(this).css('display', 'inline-flex');
    });
  };

  function hideBtn() {
    const btns = $(this).siblings();

    $(btns).each(function() {
      $(this).css('display', 'none');
    });
  };

  // ПОказываем\Скрываем кнопки
  $('.name h2').focusin(showBtn);
  $('.name h2').focusout(hideBtn);
  $('.location p').focusin(showBtn);
  $('.location p').focusout(hideBtn);
  $('.language p').focusin(showBtn);
  $('.language p').focusout(hideBtn);

  // Рамка для формы
  $('.form-add_skill input').focusin(function() {
    $('.form-add_skill').css('border','1px solid green');
  });
  $('.form-add_skill input').focusout(function() {
    $('.form-add_skill').css('border','1px solid transparent');
  })

  $('.add_skill a').on('click', function(e) {
    e.preventDefault();

    $(this).fadeOut(200);
    $('.form-add_skill').fadeIn(300);
  });


  $('.form-add_skill').on('submit', function(e) {
      // Отменяем событие по умолчанию
      e.preventDefault();

      //Создаем необходимые элементы
      const item = document.createElement('li');
      const link = document.createElement('a');
      const span = document.createElement('span');
      const icon = document.createElement('i');
      const content = $('.form-add_skill input[name="skill"]');
      const select = $('.form-add_skill select[name="skills-level"]');

      // Проверяем значеине селекта и добавляем соответствующий класс элементу списка
      switch ($(select).val()) {
        case 'strong':
          $(item).addClass('strong')
          break;
        case 'medium':
          $(item).addClass('medium')
          break;
        case 'low':
          $(item).addClass('low')
          break;
      }

      // Добавляем классы остальным элеметнам
      $(icon).addClass('fa fa-times');
      $(span).addClass('remove-skill');

      //Помещаем элемент i в тег спан
      $(span).append($(icon));

      // Добаляем атрибут хреф ссылке
      $(link).attr('href','#');

      //Передаем в ссылку содержимое инпута
      $(link).append($(content).val());

      //Добавляем дочерние элементы в тег li и помещаем его внутрь списка
      $(item).append([$(link),$(span)]);
      $('.skills-list').append($(item));

      // Отчищаем инпут
      $(content).val('');

      // Показываем\Скрываем кнопку удалить при наведении на элемент списка
      $('.skills-list li').hover(function() {
        const btn = $(this).find('span');
        $(btn).css('opacity','1');
      }, function() {
        const btn = $(this).find('span');
        $(btn).css('opacity','0');
      });

      // Удаляем элемент по клику на кнопку
      $('.remove-skill').on('click', function () {
        const parent = $(this).parent();
        $(parent).remove();
      });

  })

  $('.skills-list li').hover(function() {
    const btn = $(this).find('span');
    $(btn).css('opacity','1');
  }, function() {
    const btn = $(this).find('span');
    $(btn).css('opacity','0');
  });

  $('.remove-skill').on('click', function () {
    const parent = $(this).parent();
    $(parent).remove();
  });
})();
