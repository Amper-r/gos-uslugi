<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.min.css">
    <title>Uslugi</title>
</head>
<body>
    <header class="header">
        <div class="wraper-header">
            <div class="header-fixed">
                <div class="wraper-header-fixed">
                    <span class="cookie"></span>
                    <button class="btn-update-session">Обновить сессию</button>
                    <div class="wraper-download-btn">
                        <a class="download-btn" href="" download>Скачать последний xml файл</a>
                        <br>
                        <a href="" class="link-btn" target="_blanck">Просмотреть последний xml файл</a>
                    </div>
                </div>
                <div class="wraper-btn-header-fixed">
                    <div class="btn-header-fixed"></div>
                </div>
            </div>

            <div class="wraper-form">
                <form class="form-load">
                    <div class="form-content">
                        <input class="resurs-input" name="resurs_input" type="text" placeholder="Введите имя ресурса">
                        <div class="btn-and-select">
                            <button class="btn-send">Получить данные</button>
                            <select name="has_electronic_view" class="select_has_electronic_view">
                                <option value="-1" id="has_electronic_view_-1" selected>Любое значение has_electronic_view</option>
                                <option value="0" id="has_electronic_view_0">has_electronic_view = 0</option>
                                <option value="1" id="has_electronic_view_1">has_electronic_view = 1</option>
                            </select>
                        </div>
                    </div>
                    <span style="font-size: 14px; text-align: center;">https://uslugi.gospmr.org/?option=com_uslugi&view=gosuslugi&task=getUslugi</span>
                </form>
            </div>
        </div>

        <div class="wraper-pages hidden">
            <div class="btn-nav-page btn-nav-page-prev"></div>
            <div class="content-pages-btns">
                <div class="pages">
                </div>
            </div>
            <div class="btn-nav-page btn-nav-page-next"></div>
        </div>
        </header>
        <div class="wraper-page">
            <div class="container">
                <ul class="content-page">
                </ul>
            </div>  
        </div>

        <div class="wraper-error-list">
            <div class="container">
                <h2 class="title-error-list">Ошибки при выполнении скрипта в текущей сессии:</h2>
                <ul class="content-error-list">
                    <!-- <li class="item-error-list">
                        <div class="prop-error-list">
                            <span class="name_prop-error-list">DateTime:</span>
                            <span class="value_prop-error-list">test</span>
                        </div>
                        <div class="prop-error-list">
                            <span class="name_prop-error-list">Error:</span>
                            <span class="value_prop-error-list">test_error</span>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script src="js/app.js"></script>
        <script src="js/printErrors.js"></script>
        <script src="js/downloadBtn.js"></script>
        <script src="js/cookie.js"></script>
        <script src="js/popup.js"></script>
</body>
</html>