import React, { useState,useEffect } from 'react';
import {useForm} from 'react-hook-form';

function Aparts(){

    
    
    const [data, setData]=useState();
    
    const handleSubmit=(event)=>{
        const formData=new FormData(event.target)
        fetch('http://127.0.0.1:8000/api/aparts/', {
        method: 'POST',
        body: formData,})
        
        
        
        //.then(response=>response.json())
        //.then(data => console.log('this is your data:',data))   
    }

  
  
    // useEffect(() => {
     //    fetch('http://127.0.0.1:8000/api/update/19')
    //     .then((response)=>console.log(response.data))
    // });

      useEffect(() => {
         fetch('http://127.0.0.1:8000/api/aparts/')
           .then((response) => {
             if (!response.ok) {
               throw new Error(
                 `This is an HTTP error: The status is ${response.status}`
               );
             }
             return response.json();
           })
           .then((response) => setData(response))
          
           .catch((err) => {
             console.log(err.message);
           });
       }, []);


    

    return(  
        <div>
        <form  id="form"  className="row g-3 position-absolute top-50 start-50 translate-middle" style={{marginTop:"40px",marginLeft:"45px", borderWidth:'thick',borderColor: 'black', borderStyle: 'solid',borderRadius:'10px', backgroundColor:'white'}} onSubmit={handleSubmit} >
            <h3 style={{textAlign:'center'}}>Введите информацию о квартире</h3>

            {/*поле район*/}
            {/* <div class="col-12">
            <div class="form-floating">
                <select class="form-select" aria-label="Default select example" id="floatingSelect">
                    <option value="3">Академический</option> <option value="1">Алексеевский</option> <option value="2">Алтуфьевский</option> <option value="3">Арбат</option>
                    <option value="3">Аэропорт</option> <option value="3">Бабушкинский</option> <option value="3">Басманный</option> <option value="3">Беговой</option>
                    <option value="3">Бескудниковский</option> <option value="3">Бибирево</option> <option value="3">Бирюлёво Восточное</option> <option value="3">Бирюлёво Западное</option>
                    <option value="3">Богородское</option> <option value="3">Братеево</option> <option value="3">Бусиново</option> <option value="3">Бутово</option>
                    <option value="3">Бутырский</option> <option value="3">Верхние Лихоборы</option> <option value="3">Вешняки</option> <option value="3">Войковский</option>
                    <option value="3">Восточное Дегунино</option> <option value="3">Восточное Измайлово</option> <option value="3">Выхино-Жулебино</option> <option value="3">Гавриково</option>
                    <option value="3">Гагаринский</option> <option value="3">Головинский</option> <option value="3">Гольяново</option> <option value="3">Даниловский</option>
                    <option value="3">Дегунино</option> <option value="3">Дмитровский</option> <option value="3">Донской</option> <option value="3">Дорогомилово</option>
                    <option value="3">Дрожжино</option> <option value="3">Елохово</option> <option value="3">Замоскворечье</option> <option value="3">Западное Дегунино</option>
                    <option value="3">Зенино</option> <option value="3">Зюзино</option> <option value="3">Зябликово</option> <option value="3">Ивановское</option>
                    <option value="3">Измайлово</option> <option value="3">Канатчиково</option> <option value="3">Капотня</option> <option value="3">Кожухово</option>
                    <option value="3">Коломенка</option> <option value="3">Коньково</option> <option value="3">Коптево</option> <option value="3">Косино</option>
                    <option value="3">Косино-Ухтомский</option> <option value="3">Котловка</option> <option value="3">Красная горка</option> <option value="3">Красносельский</option>
                    <option value="3">Крылатское</option> <option value="3">Кузьминки</option> <option value="3">Кунцево</option> <option value="3">Куркино</option>
                    <option value="3">Курьяново</option> <option value="3">Левобережный</option> <option value="3">Лефортово</option> <option value="3">Лианозово</option>
                    <option value="3">Ломоносовский</option> <option value="3">Лосиноостровский</option> <option value="3">Люблино</option>
                    <option value="3">Марфино</option> <option value="3">Марьина Роща</option> <option value="3">Марьино</option> <option value="3">Метрогородок</option>
                    <option value="3">Мещанский</option> <option value="3">Митино</option> <option value="3">Михалково</option> <option value="3">Можайский</option>
                    <option value="3">Москворечье-Сабурово</option> <option value="3">Нагатино-Садовники</option> <option value="3">Нагатинский Затон</option> <option value="3">Нагорный</option>
                    <option value="3">Некрасовка</option> <option value="3">Нижегородский</option> <option value="3">Нижние Лихоборы</option> <option value="3">Ново-Переделкино</option>
                    <option value="3">Новогиреево</option> <option value="3">Новокосино</option> <option value="3">Новые Химки</option> <option value="3">Обручевский</option>
                    <option value="3">Орехово-Борисово Северное</option> <option value="3">Орехово-Борисово Южное</option> <option value="3">Останкинский</option> <option value="3">Отрадное</option>
                    <option value="3">Очаково-Матвеевское</option> <option value="3">Марьина Роща</option> <option value="3">Марьино</option> <option value="3">Метрогородок</option>
                    <option value="3">Павшино</option> <option value="3">Перово</option> <option value="3">Печатники</option> <option value="3">Плющиха</option>
                    <option value="3">Покровское-Стрешнево</option> <option value="3">Потапово</option> <option value="3">Преображенское</option> <option value="3">Пресненский</option>
                    <option value="3">Проспект Вернадского</option> <option value="3">Раменки</option> <option value="3">Ростокино</option> <option value="3">Рязанский</option>
                    <option value="3">Савёловский</option> <option value="3">Свиблово</option> <option value="3">Северное Бутово</option> <option value="3">Северное Измайлово'</option>
                    <option value="3">Северное Медведково</option> <option value="3">Северное Тушино</option> <option value="3">Северный</option> <option value="3">Сокол</option>
                    <option value="3">Соколиная Гора</option> <option value="3">Сокольники</option> <option value="3">Солнцево</option> <option value="3">Строгино</option>
                    <option value="3">Таганский</option> <option value="3">Тверской</option> <option value="3">Текстильщики</option> <option value="3">Тимирязевский</option>
                    <option value="3">Тропарёво-Никулино</option> <option value="3">Тёплый Стан</option> <option value="3">Фили-Давыдково</option> <option value="3">Филёвский Парк</option>
                    <option value="3">Хамовники</option> <option value="3">Ховрино</option> <option value="3">Хорошёво-Мнёвники</option> <option value="3">Хорошёвский</option>
                    <option value="3">Царицыно</option> <option value="3">Черкизово</option> <option value="3">Чернево</option> <option value="3">Чертаново Северное</option>
                    <option value="3">Чертаново Центральное</option> <option value="3">Перово</option> <option value="3">Плющиха</option>
                    <option value="3">Чертаново Южное</option> <option value="3">Черёмушки</option> <option value="3">Щиброво</option> <option value="3">Щукино</option>
                    <option value="3">Южное Бутово</option> <option value="3">Южное Медведково</option> <option value="3">Южное Тушино</option> <option value="3">Южнопортовый</option>
                    <option value="3">Якиманка</option> <option value="3">Ярославский</option> <option value="3">Ясенево</option> <option value="3">Посёлок Ухтомского</option>
                    
                </select>
                <label form="floatingSelect">Район</label>
                </div>
            </div> */}

            {/*поле адрес */}

            <div class="col-12">
                <input name='address' id="address" type="text"  class="form-control" placeholder="Адрес" required />
            </div>

            {/* поле этаж */}
            <div class="col-md-6">
                <input name='floor' type="text"  class="form-control" id="floor" placeholder="Этаж" required />
            </div>

             {/* поле этажи в доме */}
            <div class="col-md-6">
                <input name='floor_amount' type="text" class="form-control" id="flooramount" placeholder="Количество этажей в доме" required />
            </div>

            {/* количество комнат*/}
            <div class="col-md-6">
                <input name='rooms' type="text"  class="form-control" id="rooms" placeholder="Количество комнат" required />
            </div>

            {/* квадратные метры */}
            <div class="col-md-6">
                <input name='metres' type="text" class="form-control" id="metres" placeholder="Квадратные метры" required />
            </div>

            {/* размер кухни */}
            <div class="col-md-12">
                <input name='kitchen' type="text" class="form-control" id="kitchen" placeholder="Размер кухни" required />
            </div>


            {/*Ремонт */}
            <div class="col-12">
            <div class="form-floating">
            <select name="repair" class="form-select" id="repair" aria-label="Floating label select example">
                <option defaultValue="Косметический">косметический</option>
                <option value="евро">евро</option>
                <option value="дизайнерский">дизайнерский</option>
                <option value="требует ремонта">требует ремонта</option>
            </select>
            <label form="floatingSelect">Ремонт</label>
            </div>
            </div>


            {/*поле метро*/}
            <div class="col-12">
            <div class="form-floating">
                <select class="form-select" name="metro"  aria-label="Default select example" id="metro">
                    <option defaultValue='Авиамоторная'>Авиамоторная</option> <option value="Академическая">Академическая</option>
                    <option value="Автозаводская">Автозаводская</option> 
                    <option value="Алексеевская">Алексеевская</option> <option value="Алмаатинская">Алмаатинская</option>
                    <option value="Алтуфьево">Алтуфьево</option>   <option value="Андроновка">Андроновка</option>
                    <option value="Аннино">Аннино</option> 
                    <option value="Арбатская">Арбатская</option>  <option value="Аэропорт">Аэропорт</option>
                    <option value="Бабушкинская">Бабушкинская</option> <option value="Багратионовская">Багратионовская</option>
                    <option value="Балтийская">Балтийская</option>  <option value="Баррикадная">Баррикадная</option> <option value="Бауманская">Бауманская</option> <option value="Беговая">Беговая</option> <option value="Белокаменная">Белокаменная</option> <option value="Белорусская">Белорусскаяя</option> <option value="Беляево">Беляево</option> <option value="Биберево">Биберево</option>
                    
                    <option value="Библиотека им.Ленина">Библиотека им.Ленина</option> <option value="Битцевский парк">Битцевский парк</option>
                    <option value="Борисово">Борисово</option> <option value="Боровицкая">Боровицкая</option>
                    <option value="Ботанический сад">Ботанический сад</option> 
                    <option value="Братиславская">Братиславская</option> <option value="Бульвар Адмирала Ушакова">Бульвар Адмирала Ушакова</option>
                    <option value="Бульвар Дмитрия Донского">Бульвар Дмитрия Донского</option> <option value="Бульвар Рокоссовского">Бульвар Рокоссовского</option>
                    <option value="Бунинская аллея">Бунинская аллея</option> <option value="Бутырская">Бутырская</option>
                    <option value="Варшавская">Варшавская</option> <option value="ВДНХ">ВДНХ</option>
                    <option value="Верхние котлы">Верхние котлы</option> 
                    <option value="Владыкино">Владыкино</option> <option value="Водный стадион">Водный стадион</option>
                    <option value="Войковская">Войковская</option> <option value="Волгоградский проспект">Волгоградский проспект</option>
                    <option value="Волжская">Волжская</option> <option value="Волоколамская">Волоколамская</option>
                    <option value="Воробьевы горы">Воробьевы горы</option> <option value="Выставочная">Выставочная</option>
                    <option value="Выставочный центр">Выставочный центр</option> <option value="Выхино">Выхино</option>
                    <option value="Деловой центр">Деловой центр</option> 
                    <option value="Динамо">Динамо</option> <option value="Дмитровская">Дмитровская</option>
                     <option value="Добрынинская">Добрынинская</option> <option value="Домодедовская">Домодедовская</option>
                      <option value="Достоевская">Достоевская</option> 
                    <option value="Дубровка">Дубровка</option> <option value="Жулебино">Жулебино</option>
                    <option value="ЗИЛ">ЗИЛ</option> <option value="Зорге">Зорге</option>
                    <option value="Зябликово">Зябликово</option> <option value="Измайлово">Измайлово</option>
                    <option value="Измайловская">Измайловская</option> <option value="Калужская">Калужская</option>
                    <option value="Кантемировская">Кантемировская</option> <option value="Каховская">Каховская</option>
                    <option value="Каширская">Каширская</option> <option value="Киевская">Киевская</option>
                    <option value="Китай-город">Китай-город</option> <option value="Кожуховская">Кожуховская</option>
                    <option value="Коломенская">Коломенская</option> <option value="Комсомольская">Комсомольская</option>
                    <option value="Коньково">Коньково</option> <option value="Коптево">Коптево</option>
                     <option value="Котельники">Котельники</option> <option value="Красногвардейская">Красногвардейская</option>
                      <option value="Краснопресненская">Краснопресненская</option> <option value="Красносельская">Красносельская</option>
                      <option value="Красные ворота">Красные ворота</option> <option value="Крестьянская застава">Крестьянская застава</option>
                    <option value="Кропоткинская">Кропоткинская</option> <option value="Крылатское">Крылатское</option>
                    <option value="Крымская">Крымская</option> <option value="Кузнецкий мост">Кузнецкий мост</option>
                    <option value="Кузьминки">Кузьминки</option> <option value="Кунцевская">Кунцевская</option>
                    <option value="Курская">Курская</option> <option value="Кутузовская">Кутузовская</option>
                    <option value="Ленинский проспект">Ленинский проспект</option> <option value="Лермонтовский проспект">Лермонтовский проспект</option>
                     <option value="Лесопарковая">Лесопарковая</option> <option value="Лихоборы">Лихоборы</option>
                     <option value="Локомотив">Локомотив</option> <option value="Ломоносовский проспект">Ломоносовский проспект</option>
                     <option value="Лубянка">Лубянка</option> <option value="Лужники">Лужники</option>
                    <option value="Люблино">Люблино</option> <option value="Марксисткая">Марксистская</option>
                     <option value="Марьина роща">Марьина роща</option> <option value="Марьино">Марьино</option>
                     <option value="Маяковская">Маяковская</option> <option value="Медведково">Медведково</option>
                     <option value="Международная">Международная</option> <option value="Менлделеевская">Менделевская</option>
                    <option value="Минская">Минская</option> <option value="Митино">Митино</option>
                    <option value="Молодежная">Молодежная</option> <option value="Мякинино">Мякинино</option>
                    <option value="Нагатинская">Нагатинская</option> <option value="Нагорная">Нагорная</option>
                    <option value="Нахимовский проспект">Нахимовский проспект</option> <option value="Нижегородская">Нижегородская</option>
                    <option value="Новогиреево">Новогиреево</option> <option value="Новокосино">Новокосино</option> 
                    <option value="Новокузнецкая">Новокузнецкая</option> <option value="Новослободская">Новослободская</option>
                    <option value="Новохохловская">Новохохловская</option> <option value="Новоясеневская">Новоясеневская</option> 
                    <option value="Новые черемушки">Новые черемушки</option> <option value="Окружная">Окружная</option>
                    <option value="Октябрьская">Октябрьская</option> <option value="Октябрьское поле">Октябрьское поле</option>
                     <option value="Орехово">Орехово</option> <option value="Отрадное">Отрадное</option>
                    <option value="Охотный ряд">Охотный ряд</option> <option value="Павелецкая">Павелецкая</option>
                    <option value="Панфиловская">Панфиловская</option> <option value="Парк культуры">Парк культуры</option>
                    <option value="Парк победы">Парк победы</option> <option value="Партизанская">Партизанская</option>
                     <option value="Первомайская">Первомайская</option> <option value="Перово">Перово</option>
                    <option value="Петровский парк">Петровский парк</option> <option value="Петровско-Разумовская">Петровско-Разумовская</option> 
                    <option value="Печатники">Печатники</option> <option value="Пионерская">Пионерская</option>
                    <option value="Планерная">Планерная</option> <option value="Площадь Гагарина">Площадь гагарина</option>
                    <option value="Полежаевская">Полежаевская</option> <option value="Полянка">Полянка</option>
                    <option value="Пражская">Пражская</option> <option value="Преображенская">Преображенская площадь</option>
                    <option value="Пролетарская">Пролетарская</option> <option value="Проспект вернадского">Проспект вернадского</option>
                    <option value="Проспект мира">Проспект мира</option> <option value="Профсоюзная">Профсоюзная</option>
                    <option value="Пушкинская">Пушкинская</option> <option value="Пятницкое шоссе">Пятницкое шоссе</option>
                    <option value="Раменки">Раменки</option> <option value="Речной вокзал">Речной вокзал</option>
                    <option value="Рижская">Рижская</option> <option value="Римская">Римская</option>
                    <option value="Рязанский проспект">Рязанский проспект</option> <option value="Савеловская">Савеловская</option>
                    <option value="Саларьево">Саларьево</option> <option value="Свиблово">Свиблово</option>
                    <option value="Севастопольская">Севастопольская</option> <option value="Семеновская">Семеновская</option>
                    <option value="Серпуховская">Серпуховская</option> <option value="Славянский бульвар">Славянский бульвар</option>
                    <option value="Смоленская">Смоленская</option> 
                    <option value="Сокол">Сокол</option> <option value="Соколиная гора">Соколиная гора</option>
                    <option value="Сокольники">Сокольники</option> <option value="Спартак">Спартак</option>
                    <option value="Спортивная">Спортивная</option> <option value="Сретенский бульвар">Сретенский бульвар</option>
                    <option value="Студенческая">Студенческая</option> <option value="Сухаревская">Сухаревская</option>
                    <option value="Сходненская">Сходненская</option> <option value="Таганская">Таганская</option>
                    <option value="Тверская">Тверская</option> <option value="Театральная">Театральная</option>
                    <option value="Текстильщики">Текстильщики</option> <option value="Телецентр">Телецентр</option>
                    <option value="Теплый стан">Теплый стан</option> <option value="Технопарк">Технопарк</option>
                    <option value="Тимирязевская">Тимирязевская</option> <option value="Третьяковская">Третьяковская</option>
                    <option value="Тропарево">Тропарево</option> <option value="Трубная">Трубная</option>
                    <option value="Тульская">Тульская</option> <option value="Тургеневская">Тургеневская</option>
                    <option value="Тушинская">Тушинская</option> <option value="Угрешская">Угрешская</option>
                    <option value="Улица 1905 года">Улица 1905 года</option> <option value="Улица академика королева">Улица Академика Королева</option>
                    <option value="Улица Академика Янгеля">Улица Академика Янгеля</option> <option value="Улица Горчакова">Улица Горчакова</option>
                    <option value="Улица Милашенкова">Улица Милашенкова</option> <option value="Улица Сергея Эйзенштейна">Улица Сергея Эйзенштейна</option>
                    <option value="Улица Скобелевская">Улица Скобелевская</option> <option value="Улица Старочкаловская">Улица Старочкаловская</option>  
                </select>
                <label form="floatingSelect">Метро</label>
                </div>
            </div>

            {/* время до метро */}
            <div class="col-md-12">
                <input name='time_to_metro' type="text" class="form-control" id="time_to_metro" placeholder="Время до метро" required />
            </div>

            {/* год постройки */}
            <div class="col-md-12">
                <input name='year_house' type="text" class="form-control" id="year_house" placeholder="Год постройки" required />
            </div>

            <div className="d-grid gap-2 mx-auto">
                <button type="submit" class="btn btn-dark" > Отправить </button>
            </div>

           
            
                <p style={{textAlign:'center',fontSize:'18px'}}>Цена квартиры: {data}</p>
        </form>
        <div className='footer' style={{fontSize:'15px',marginLeft:'3%'}}> 
        <p >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-c-circle" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z"/>
            </svg> Все права защищены </p></div> 
        </div>
        
      
       
        
        
     )
    }
export default Aparts;