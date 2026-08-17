/**
 * Автоисполняемый скрипт, который будет инициализировать виджет
 * Можно инициализировать так:
 * <script src="https://your-cdn.com/gigaplan-autoload.js" defer></script>
 */
(function () {
    var currentScript = document.currentScript;

    if (!currentScript) {
        return;
    }

    // Скрипт подключения виджета
    var widgetUrl = 'https://gp.ksdev.ru/gigaplan-widget.js';
    // id элемента к которому монтируемся
    var targetId = currentScript.getAttribute('data-target-id') || 'gigaplan-widget';
    // button - через кнопку | embed - через встроенный блок | telegram - Mini App в Telegram
    var mountMode = currentScript.getAttribute('data-mount-mode') || 'button';
    // id проекта
    var complexId = currentScript.getAttribute('data-complex-id');
    // позиция кнопки
    var positionButton = currentScript.getAttribute('data-position') || 'right';

    // Создаём элемент куда будем мантироваться
    var target = document.getElementById(targetId);

    // Если элемента нет на странице, создаём
    if (!target) {
        target = document.createElement('div');
        target.id = targetId;

        document.body.appendChild(target);
    }

    // Создаём скрипт, который будет создавать виджет
    var widgetScript = document.createElement('script');
    widgetScript.src = widgetUrl;
    widgetScript.async = true;

    widgetScript.onload = function () {
        if (
            window.GigaplanWidget &&
            typeof window.GigaplanWidget.mountGigaplanWidget === 'function'
        ) {
            window.GigaplanWidget.mountGigaplanWidget({
                target: '#' + targetId,
                mode: mountMode,
                complexId,
                positionButton,
            });
        }
    };

    document.head.appendChild(widgetScript);
})();
