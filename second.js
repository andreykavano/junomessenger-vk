var module_vk = require('./vk.js'),
    vk = module_vk("c515ec82b95087040d739c213a9f4ab13ec435d2432db6b5767dce74fb417b10fd8e0eae1ade3ffadee7c"),
    ingredients = {};



/**
vk.sreq.jsonp("http://k-94.ru/apps/api/og/ingr.php",function(a){
    ingredients = a;
})
**/
Array.prototype.random = function() {
    return this[Math.floor(this.length * Math.random())];
};

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
            regexp: /^\/(фото|музыка|видео) (.*)/i,
            f: function(params, msg) {
                var cmd = {
                    "фото": ["photo", "photos"],
                    "музыка": ["audio", "audio"],
                    "видео": ["video", "video", "adult=true"],
                };
                params[1] = cmd[params[1].toLowerCase()];
                vk.api[params[1][1]].search({
                    sort: 0,
                    auto_complete: 1,
                    q: params[2]
                }, function(res) {
                    console.log(res);
                    if (res.response.items.length) {
                        msg.send(
                            "Результаты поиска по запросу: " + params[2], {
                                attachment: res.response.items.map(function(a) {
                                    return params[1][0] + a.owner_id + "_" + a.id;
                                }).join(",")
                            }
                        );
                        console.log('Получилось найти: id',msg, msg.user_id);
                    } else {
                        msg.send("По вашему запросу ничего не найдено");
                        console.log('Не получилось найти: id',msg, msg.user_id);
                    }
                });
            },
            command: "/фото, /музыка, /видео",
            description: "Ищет фото, музыку или видео"

        }, {
            regexp: /^\/(ping)/i,
            f: function(params, msg) {
                msg.send("*НАРМАЛЬНААААА*");
                            console.log('Пингует: id', msg.user_id);
            },
            command: "/ping",
            description: "ping - pong"

        }, {
            regexp: /^\/eval (.*)/i,
            f: function(params, msg) {
                msg.send(eval(params[1]));
                console.log('/eval: id', msg.user_id);
            },
            admin: 1,
            command: "/eval",
            description: "eval"
        }, {
            regexp: /^\/va ([a-z0\.]+) (.*)/i,
            f: function(params, msg) {
                vk._api(params[1], JSON.parse(params[2]), function(a) {
                    msg.send(JSON.stringify(a, null, " ​ ​ ​"));
                })
                console.log('Тестирует апи: id', msg.user_id);
            },
            admin: 1,
            command: "/va",
            description: "vk api"

        }, {
            regexp: /^(кто|что)\s+([^\s]+)\s+([^\?]*)\?/i,
            f: function(params, msg) {
                console.log(params);
                msg.send("Я думаю, что " + (params[3].split(/\s*,|или\s*/).random()) + " " + params[2]);
                console.log('Хочет узнать, кто круче: id', msg.user_id);
            },
            command: "кто, что",
            description: "рандом"

        },

        {
        regexp:/^\/(help)/i,
        f:function(params,msg){
            msg.send(cmds.map(function(a){return a.description + " - " + a.command }).join("\n"));
        },
        description:"команды"
    },

    ];


        var pair = "USDRUB,USDBYR,ILSRUB";
        var dollar_url = 'https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+"' + pair + '"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        var pair_names = {};

        function getUSD(_cb) {
            vk.sreq.jsonp(dollar_url, {}, function(a) {
                if (a.query) {
                    try {
                        _cb(
                            "Курс валют:\n" +
                            a.query.results.rate.map(function(a) {
                                return (pair_names[a.Name] || a.Name) + ": продажа " + (Math.round(a.Bid * 100) / 100) + " покупка " + (Math.round(a.Ask * 100) / 100);
                            }).join("\n")
                        );
                    } catch (e) {
                        _cb("Ошибка получения курса валют");
                    }
                } else {
                    _cb("Ошибка получения курса валют");
                }
            }, function(a) {

            });
        }