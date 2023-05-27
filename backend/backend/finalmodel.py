import pickle
import psycopg2 as ps
import pandas as pd
import warnings
from geopy.geocoders import Nominatim
import numpy as np

class TargetEncoder():
            def __init__(self, k,  cat_features):
                self.cat_features= cat_features
                self.k=k

            def fit(self, data, y):
                self.globalmean=np.mean(data[y])
                self.mean=[]
                for i in self.cat_features:
                    self.mean.append(data.groupby(i).mean()[y])
                    
            def transform(self,data):
                with warnings.catch_warnings():
                    warnings.simplefilter("ignore")
                    for i in range(len(self.cat_features)):
                        for j in data[self.cat_features[i]].unique():
                            try:
                                data.loc[data[self.cat_features[i]]==j, self.cat_features[i]]=(self.mean[i][j]*self.k+(1-self.k)*self.globalmean)
                            except:
                                data.loc[data[self.cat_features[i]]==j, self.cat_features[i]]=self.globalmean
                        data[self.cat_features[i]]= data[self.cat_features[i]].astype('float')
                return data
            

class get_price():
            def __init__(self, address, floor, floor_amount, rooms, metres, kitchen, repair, metro, time_to_metro, year_house):
                self.address = address.strip()
                
                self.floor_amount = floor_amount
                try:
                    self.floor=floor/floor_amount
                except:
                    self.floor=floor
                self.rooms = rooms.strip()
                if rooms.lower().strip()=='студия':
                    self.rooms = 0.0
                else:
                    self.rooms = float(rooms)
                self.metres = float(metres)
                self.kitchen = kitchen
                self.repair = repair.strip()
                self.metro = metro.strip()
                self.time_to_metro = time_to_metro
                self.year_house = year_house
                
                self.metro_dict={"Арбатско-Покровская": ['Пятницкое шоссе', 'Митино', 'Волоколамская', 'Мякинино','Строгино', 'Крылатское', 'Молодёжная',
                'Кунцевская', 'Славянский бульвар',
                'Парк Победы', 'Киевская', 'Смоленская', 'Арбатская',
                'Площадь революции','Курская','Бауманская',
                'Электрозаводская','Семёновская','Партизанская','Измайловская','Первомайская', 'Щёлковская'],
                "Бутовская":
                [
                    'Улица Горчакова',
                    'Бульвар адмирала Ушакова',
                'Улица Скобелевская',
                'Улица Старокачаловская',
                'Лесопарковая',
                'Битцевский парк',




                ],
                'Замоскворецкая':

                ['Ховрино','Беломорская','Речной вокзал','Водный стадион',
                'Войковская','Сокол', 'Аэропорт', 'Динамо', 'Белорусская', 'Маяковская',
                'Тверская', 'Театральная', 'Новокузнецкая', 'Павелецкая', 'Автозаводская',
                'Технопарк', 'Коломенская', 'Каширская', 'Кантемировская', 'Царицыно', 'Орехово',
                'Домодедовская','Красногвардейская','Алма-Атинская'
                ],

                'Калининско-Солнцевская':[
                    'Новокосино',
                    'Новогиреево',
                    'Перово',
                    'Шоссе Энтузиастов',
                    'Авиамоторная',
                    'Площадь Ильича',
                    'Марксистская',
                    'Третьяковская'
                ],
                'Калужско-Рижская':
                [
                'Новоясеневская',
                'Ясенево',
                'Тёплый стан',
                'Коньково',
                'Беляево',
                'Калужская',
                'Новые Черёмушки',
                'Профсоюзная',
                'Академическая',
                'Ленинский проспект',
                'Шаболовская',
                'Октябрьская',
                'Третьяковская',
                'Китай-город',
                'Тургеневская',
                'Сухаревская',
                'Проспект Мира',
                'Рижская',
                'Алексеевская',
                'ВДНХ',
                'Ботанический сад',
                'Свиблово',
                'Бабушкинская',
                'Медведково'],

                'Люблинско-Дмитровская':
                [
                'Зябликово',
                'Шипиловская',
                'Борисово',
                'Марьино',
                'Братиславская',
                'Люблино',
                'Волжская',
                'Печатники',
                'Кожуховская',
                'Дубровка',
                'Крестьянская застава',
                'Римская',
                'Чкаловская',
                'Сретенский бульвар',
                'Трубная',
                'Достоевская',
                'Марьина роща',
                'Бутырская', 
                'Фонвизинская', 
                'Петровско-Разумовская', 
                'Окружная', 
                'Верхние Лихоборы',
                'Селигерская'],

                'Серпуховско-Тимирязевская':
                [
                'Бульвар Дмитрия Донского',
                'Аннино',
                'Улица академика Янгеля',
                'Пражская',
                'Южная',
                'Чертановская',
                'Севастопольская',
                'Нахимовский Проспект',
                'Нагорная',
                'Нагатинская',
                'Тульская',
                'Серпуховская',
                'Полянка',
                'Боровицкая',
                'Чеховская',
                'Цветной бульвар',
                'Менделеевская',
                'Савеловская',
                'Дмитровская',
                'Тимирязевская',
                'Владыкино',
                'Отрадное',
                'Бибирево',
                'Алтуфьево',
                ],

                'Солнцевская':
                [
                'Рассказовка',
                'Новопеределкино',
                'Боровское шоссе',
                'Солнцево',
                'Говорово',
                'Озёрная',
                'Мичуринский проспект',
                'Раменки',
                'Ломоносовский проспект',
                'Минская',
                'Парк Победы',
                'Деловой центр'],
                'Сокольническая':

                ['Бульвар Рокоссовского',
                'Черкизовская',
                'Преображенская площадь',
                'Сокольники',
                'Красносельская',
                'Комсомольская',
                'Красные ворота',
                'Чистые пруды',
                'Лубянка',
                'Охотный ряд',
                'Библиотека им. Ленина',
                'Кропоткинская',
                'Парк Культуры',
                'Фрунзенская',
                'Спортивная',
                'Воробьёвы горы',
                'Университет',
                'Проспект Вернадского',
                'Юго-Западная',
                'Тропарёво',
                'Румянцево',
                'Саларьево'],

                'Таганско-Краснопресненская':
                [
                'Котельники',
                'Жулебино',
                'Лермонтовский проспект',
                'Выхино',
                'Рязанский проспект',
                'Кузьминки',
                'Текстильщики',
                'Волгоградский проспект',
                'Пролетарская',
                'Таганская',
                'Китай-город',
                'Кузнецкий мост',
                'Пушкинская',
                'Баррикадная',
                'Улица 1905 года',
                'Беговая',
                'Полежаевская',
                'Октябрьское поле',
                'Щукинская',
                'Спартак',
                'Тушинская',
                'Сходненская',
                'Планерная'],
                'Филевская':
                [
                'Александровский сад',
                'Арбатская',
                'Смоленская',
                'Киевская',
                'Студенческая',
                'Кутузовская',
                'Фили',
                'Багратионовская',
                'Филевский парк',
                'Пионерская',
                'Кунцевская',
                'Выставочная',
                'Международная'],

                'Кольцевая':
                ['Парк культуры',
                'Октябрьская',
                'Калужская ',
                'Добрынинская',
                'Павелецкая',
                'Таганская',
                'Курская',
                'Комсомольская',
                'Проспект Мира',
                'Новослободская',
                'Краснопресненская',
                'Киевская'],
                'МЦК':
                [
                    'Хорошево',
                'Новопесчаная',
                'Стрешнево',
                'Лихоборы',
                'Войковская',
                'Балтийская',
                'Николаевская',
                'Окружная',
                'Владыкино',
                'Ботанический сад',
                'Ростокино',
                'Белокаменная',
                'Бульвар Рокоссовского',
                'Локомотив',
                'Измайлово',
                'Соколиная гора',
                'Шоссе энтузиастов',
                'Андроновка',
                'Угрешская',
                'Новохохловская',
                'Нижегородская',
                'Дубровка',
                'Автозаводская',
                'ЗИЛ',
                'Верхние котлы',
                'Крымская',
                'Площадь Гагарина',
                'Лужники',
                'Кутузовская',
                'Деловой центр',
                'Шелепиха'
                ],
                'Некрасовская':
                [
                'Электрозаводская',
                'Лефортово',
                'Авиамоторная',
                'Нижегородская',
                'Стахановская',
                'Окская',
                'Юго-Восточная',
                'Косино',
                'Улица Дмитриевского',
                'Некрасовка',
                'Лухмановская'
                ]
                    }
                self.dict_metro={i:k for k, v in self.metro_dict.items() for i in v}
                self.central_stations={"Арбатско-Покровская":11, "Бутовская":19, "Калужско-Рижская":13,'Замоскворецкая': 10, 
                        'Калининско-Солнцевская': 7, 'Люблинско-Дмитровская':11, 'Серпуховско-Тимирязевская':11,
                        'Солнцевская':11, 'Сокольническая':8, 'Таганско-Краснопресненская':11,'Филевская':0, 'Некрасовская':1
                        }
            def raddeg(self, r):
                d= r* 180 /np.pi
                return d

            def degrad(self, d):
                r= d* np.pi / 180
                return r
            def set_coords(self):
                
                geolocator = Nominatim(user_agent='prohorovstepan17@gmail.com')
                location = geolocator.geocode(self.address)
                self.coords = [location.latitude, location.longitude] 
            def set_distance_to_Kremlin(self):
                
                l2 = 37.618790
                w2 = 55.751462
                w1, l1=self.coords[0], self.coords[1]
                t = l1- l2
                d = 60* 1.1515* self.raddeg(np.arccos((np.sin(self.degrad(w1))* np.sin(self.degrad(w2))) + 
                                (np.cos(self.degrad(w1))* np.cos(self.degrad(w2)) * np.cos(self.degrad(t))))) 
                self.distance_to_Kremlin = round(d* 1.609344, 2)
            def set_district(self):
                geolocator = Nominatim(user_agent='prohorovstepan17@gmail.com')
                l = geolocator.reverse(self.coords)
                self.district = l.raw['address'].get('suburb').replace('район', '').strip()
            def set_metro_line(self):
                try:
                    self.metro_line = self.dict_metro[self.metro]
                except:
                    self.metro_line = 'БКЛ'
            def set_metro_distance(self):
                self.set_distance_to_Kremlin()
                if self.metro_line == 'БКЛ':
                    self.metro_distance = 6
                elif self.metro_line == 'МЦК':
                    self.metro_distance = 4
                elif self.metro_line == 'Кольцевая':
                    self.metro_distance = 2
                else:
                    self.metro_distance = abs(self.central_stations[self.metro_line]-self.metro_dict[self.metro_line].index(self.metro))
                self.metro_distance = self.distance_to_Kremlin - self.metro_distance
            def encoding(self):
                with open(fr"C:\Users\Алина\Desktop\БИВТ-21-8_Фахердинова А.Д_проект\source\backend\model\utils\mte.pkl", "rb") as f:
                    mte =pd.read_pickle(f)
                with open(fr"C:\Users\Алина\Desktop\БИВТ-21-8_Фахердинова А.Д_проект\source\backend\model\utils\metro_line_le.pkl", "rb") as f:
                    metro_line_le = pd.read_pickle(f)
                with open(fr"C:\Users\Алина\Desktop\БИВТ-21-8_Фахердинова А.Д_проект\source\backend\model\utils\num_rooms_le.pkl", "rb") as f:
                    num_rooms_le = pd.read_pickle(f)
                with open(fr"C:\Users\Алина\Desktop\БИВТ-21-8_Фахердинова А.Д_проект\source\backend\model\utils\repair_le.pkl", "rb") as f:
                    repair_le = pd.read_pickle(f)
                with open(fr"C:\Users\Алина\Desktop\БИВТ-21-8_Фахердинова А.Д_проект\source\backend\model\utils\district_le.pkl", "rb") as f:
                    district_le = pd.read_pickle(f)
                self.set_metro_line()
                self.set_coords()
                self.set_district()
                self.metro_line_le=metro_line_le.transform([self.metro_line])
                self.num_rooms_le=num_rooms_le.transform([self.rooms])
                self.repair_le = repair_le.transform([self.repair])
                self.district_le = district_le.transform([self.district])
                
                a=pd.DataFrame(columns=['district','metro_line', 'repair', 'num_rooms'])
                a.district=[self.district]
                a.metro_line=[self.metro_line]
                a.repair=[self.repair]
                a.num_rooms=[self.rooms]
                self.district_mte, self.metro_line_mte, self.repair_mte, self.num_rooms_mte=mte.transform(a).iloc[0,:]
            def set_interactions(self):
                self.set_metro_distance()
                
                self.encoding()
                self.distrtime_mte = self.district_mte*self.time_to_metro
                self.distrtime_le = self.district_le*self.time_to_metro
                self.Kretime = self.distance_to_Kremlin*self.time_to_metro
                self.Krearea = self.distance_to_Kremlin*self.metres
                self.yeararea = self.year_house*self.metres
                self.yearfloors = self.year_house*self.floor_amount
                self.areanum_le = self.metres/(self.num_rooms_le +1)
                self.areanum_mte = self.metres/(self.num_rooms_mte)
                self.yearrepair_mte=self.year_house*self.repair_mte
                self.yearrepair_le=self.year_house*self.repair_le
            def get_mte_df(self):
                self.encoding()
                self.set_interactions()
                mte_df=pd.DataFrame(columns=[ 'time_to_metro', 'num_rooms', 'total_area', 'year_house',
            'kitchen_area', 'floors', 'num_floor', 
            'distance_to_Kremlin',
            'district', 'metro_line', 'metro_distance', 'distr*time', 'Kre*time',
            'Kre*area', 'year*area','year*repair', 'year*floors', 'area/num+1'])
                mte_df['time_to_metro']=[self.time_to_metro]
                mte_df['num_rooms']=[self.num_rooms_mte]
                mte_df['total_area']=[self.metres]
                mte_df['year_house']=[self.year_house]
                mte_df['kitchen_area']=[self.kitchen]
                mte_df['floors']=[self.floor_amount]
                mte_df['num_floor']=[self.floor]
                mte_df['distance_to_Kremlin']=[self.distance_to_Kremlin]
                mte_df['district']=[self.district_mte]
                mte_df['metro_line']=[self.metro_line_mte]
                mte_df['metro_distance']=[self.metro_distance]
                mte_df['distr*time']=[self.distrtime_mte]
                mte_df['Kre*time']=[self.Kretime]
                mte_df['Kre*area']=[self.Krearea]
                mte_df['year*area']=[self.yeararea]
                mte_df['year*repair']=[self.yearrepair_mte]
                mte_df['year*floors']=[self.yearfloors]
                mte_df['area/num+1']=[self.areanum_mte]
                return mte_df
            def get_le_df(self):
                le_df=self.get_mte_df()
                le_df['num_rooms'] = self.num_rooms_le
                le_df['district'] = self.district_le
                le_df['metro_line'] = self.metro_line_le
                le_df['distr*time']=self.distrtime_le
                le_df['area/num+1']=self.areanum_le
                le_df['year*repair']=self.yearrepair_le
                return le_df
            def predict(self):
                y1=[]
                y2=[]
                y3=[]
                X_lv=self.get_le_df()
                X_mv=self.get_mte_df()
                for i in range(5):
                    with open(fr"C:\Users\Алина\Desktop\БИВТ-21-8_Фахердинова А.Д_проект\source\backend\model\utils\cat{i}.pkl", "rb") as f:
                        cat=pd.read_pickle(f)
                    with open(fr"C:\Users\Алина\Desktop\БИВТ-21-8_Фахердинова А.Д_проект\source\backend\model\utils\xgb{i}.pkl", "rb") as f:
                        xgb=pd.read_pickle(f)
                    with open(fr"C:\Users\Алина\Desktop\БИВТ-21-8_Фахердинова А.Д_проект\source\backend\model\utils\lgbm{i}.pkl", "rb") as f:
                        lgbm=pd.read_pickle(f)
                    y1.append(cat.predict(X_lv))
                    y2.append(xgb.predict(X_mv))
                    y3.append(lgbm.predict(X_mv))

                y1=np.mean(y1, axis=0)
                y2=np.mean(y2, axis=0)
                y3=np.mean(y3, axis=0)

                df_test=pd.DataFrame(columns=['y1','y2','y3'])

                df_test['y1']=y1
                df_test['y2']=y2
                df_test['y3']=y3
                res=[]

                for i in range(5):
                    with open(fr"C:\Users\Алина\Desktop\БИВТ-21-8_Фахердинова А.Д_проект\source\backend\model\utils\s_model{i}.pkl", "rb") as f:
                        s_model=pd.read_pickle(f)
                    res.append(s_model.predict(df_test))

                res=np.mean(res, axis=0)
                return res
  
if __name__ == "__main__":
    conn = ps.connect(host="127.0.0.1", port = 5432, database="newapp", user="postgres", password="123456", options="-c search_path=bookings")
    aparts = pd.read_sql("SELECT * FROM public.api_aparts", con=conn).drop('id',axis=1).iloc[-1,:]
    a=get_price(aparts[0],aparts[1],aparts[2],aparts[3], str(aparts[4]),aparts[5],aparts[6], aparts[7],aparts[8],aparts[9])
    TargetEncoder()
    #a=get_price('Москва, улица Люблинская 76 к5',10,15,'3', 93,11.1,'косметический', 'Братиславская',25,2021)
    ans=a.predict()