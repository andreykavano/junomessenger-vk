//Requirements

var module_vk = require('./vk.js'),
    vk = module_vk("94c983aef43e50032197d2f405f5cdf74c3ebe72e61761617089765f933cc5ecf26b8f42a59d4a55c8d21"),
    ingredients = {},
    admins = [229445848, 296240340];



//end.Requirements

/* 

|Start commands
|-start - ok!
|-gp - ok!
|-stable - ok!
|-beta - ok!
|-check - in dev.
|-about - 
|-ping - ok!
|-test

*/

vk.addListener.messages(function(msg) {
    var i = cmds.length;
    while (i--) {
        var matched = msg.body.match(cmds[i].regexp);
        if (matched) {
            if (!cmds[i].admin || (cmds[i].admin && admins.indexOf(msg.user_id) !== -1)) {
                cmds[i].f(matched, msg);
            } else {
                msg.reply("Нет прав администратора");
            }
            return false;
        }
    }
});

var cmds = [{
    regexp: /^\/(start)/i,
    f: function(params, msg) {
        msg.send("Привет! Я - Juno Messenger Bot.\nВкратце, я - менеджер обновлений Juno.\n\nДля того, чтобы посмотреть список существующих команд введите /help.");
        console.log('Кто-то начал работу', msg.user_id);
    },
    command: "/start",
    description: "Начало работы"
}, {
    regexp: /^\/(gp)/i,
    f: function(params, msg) {
        msg.send("https://play.google.com/store/apps/details?id=ru.juno.messenger");
        console.log('Загрузка из ГП', msg.user_id);
    },
    command: "/gp",
    description: "Загрузка из Google Play"
}, {
    regexp: /^\/(stable)/i,
    f: function(params, msg) {
        msg.send("Стабильная версия приложения.", {
            attachment: "doc296240340_445956769"
        });
        console.log('Установка стабильной версии:', msg.user_id);
    },
    command: "/stable",
    description: "Загрузка стабильной версии"
}, {
    regexp: /^\/(beta)/i,
    f: function(params, msg) {
        msg.send("Внимание! Это экспериментальная версия! Баги и вылеты здесь возможны.", {
            attachment: "doc296240340_445956801"
        });
        console.log('Установка бета-версии', msg.user_id);
    },
    command: "/beta",
    description: "Загрузка бета-версии"
}, {
    regexp: /^\/(about)/i,
    f: function(params, msg) {
        msg.send("Меня зовут Джуно! 👧\nЯ - совершенно новый мессенджер для ВКонтакте! Моими главным преимуществами являются отзывчивость, безопасность и, конечно же, кастомизация.\nКоманда разработчиков трудится над моими функциями и внешним видом.\nПо их мнению я должна уметь делать свою работу и выглядеть эстетично, чтобы вы чувствовали себя хорошо и уютно при использовании приложения.\n\nКоманда:\nДанил Дерменжи (Разработчик) - vk.com/dvader_empire\nИван Андреев (Дизайнер) - vk.com/andrv1\nИгорь Морозкин (Основатель Euphoria) - vk.com/igor.morozkin\n\nНаше сообщество ВКонтакте: https://vk.com/junomessenger");
                    console.log('Кто-то читает о нас:',msg.user_id);
    },
    command: "/about",
    description: "О проекте"
}, {
    regexp: /^\/(check)/i,
    f: function(params, msg) {
        msg.send("В разработке.");
                    console.log('Чекает обновления:',msg.user_id);
    },
    command: "/check",
    description: "Проверка обновлений"
}, {
    regexp: /^\/(help)/i,
    f: function(params, msg) {
        msg.send(cmds.map(function(a) {
            return a.description + " - " + a.command
        }).join("\n"));
    },
    command: "/help",
    description: "Список команд"
}, {
    regexp: /^\/(ping)/i,
    f: function(params, msg) {
        msg.send("Владимирский сервак, ветер в северной,\nПингуют из Твери, пинг немеренный,\nЛежит на клаве тяжкий груз..");
        console.log('/ping: Time', date);
                    console.log('Пингует:',msg.user_id);
    },
    command: "/ping",
    description: "Проверка работоспособности бота"
}, {
    regexp: /^\/(test)/i,
    f: function(params, msg) {
        msg.send('', {
            sticker_id: 4183
        });
                    console.log('Тест',msg.user_id);
    }
}];