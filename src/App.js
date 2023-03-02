import './App.css';
import axios from 'axios'
import {useState} from 'react'
import umbrella from './umbrella.png'
import Clouds from './islandiia-nebo-tserkov-pole.jpg'
import Clear from './Clear.jpg'
import Snow from './Snow.jpg'
import Loader from './loader'

function App() {
  const [name, setName] = useState('')
  const [feels, setFeels] = useState('')
  const [temp, setTemp] = useState('')
  const [hum, setHum] = useState('')
  const [wind, setWind] = useState('')
  const [city, setCity] = useState('')
  const [weath, setWeath] = useState('')
  const [img, setImg] = useState('')
  const [loader, setLoader] = useState(false)
  const [loc, setLoc] = useState('')

  const [name1, setName1] = useState('')
  const [feels1, setFeels1] = useState('')
  const [temp1, setTemp1] = useState('')
  const [hum1, setHum1] = useState('')
  const [wind1, setWind1] = useState('')
  const [city1, setCity1] = useState('')
  const [weath1, setWeath1] = useState('')
  const [img1, setImg1] = useState('')

  const changeHandler = (e) => {
    setCity(e.target.value)
  }

  const findWeather = () => {
  setLoader(true)
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&lang=ru&units=metric&appid=91dc5eb4a123dbc0d2127b1828842a59`)
  .then(dat => (
    console.log(dat),
    setName(dat.data.name),
    setFeels(dat.data.main.feels_like),
    setTemp(dat.data.main.temp),
    setHum(dat.data.main.humidity),
    setWind(dat.data.wind.speed),
    setWeath(dat.data.weather[0].description),
    setImg(dat.data.weather[0].main)
    
  ))
  .catch(err => {
    console.log(err)
    alert('Что-то пошло не так. Скорее всего, вы неправильно ввели название города.')
  })
  setLoader(false)
  console.log(img)
  }

  const findCity = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=cde918b3-de48-48ab-98d5-7a7d4e247ff7&geocode=${lng},${lat}&kind=locality`)
            .then(data => {
              const loc = data.data.response.GeoObjectCollection.featureMember[0].GeoObject.name
              setLoc(loc)
            })
            .catch(err => {
              console.log(err)
              alert('Что-то пошло не так.')
            })
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc.trim()}&lang=ru&units=metric&appid=91dc5eb4a123dbc0d2127b1828842a59`)
            .then(dat => (
            console.log(dat),
            setName1(dat.data.name),
            setFeels1(dat.data.main.feels_like),
            setTemp1(dat.data.main.temp),
            setHum1(dat.data.main.humidity),
            setWind1(dat.data.wind.speed),
            setWeath1(dat.data.weather[0].description),
            setImg1(dat.data.weather[0].main) 
            ))
           .catch(err => {
           console.log(err)
            })
            });
          }
  return (
    <div className="App">
      <div className='blur'></div>
      <div className='Layout'>
       <h2>Погода в твоём городе</h2> 
       <input placeholder='Название города' onChange={changeHandler}/> { loader === true ? <Loader/> : null}
       <button onClick={findWeather}>Найти</button>
       <div className='loc'>
       <a className='findCity' onClick={findCity}>Узнать погоду по местоположению</a>
       {loc === '' ? <span style={{fontSize: '3vh'}}>Не могу получить доступ к твоему городу.</span> : <h2>{name1}</h2>}
       {loc === '' ? null : <span style={{fontSize: '2.5vh'}}>На улице: <span style={{fontWeight: '500', marginLeft: '6px', fontSize: '2.5vh'}}>{Math.round(temp1)}°С, {weath1};</span></span>}
       {loc === '' ? null : <span style={{fontSize: '2.5vh'}}>Ощущается как: <span style={{fontWeight: '500', marginLeft: '6px', fontSize: '2.5vh'}}>{Math.round(feels1)}°С;</span></span>}
       {loc === '' ? null : <span style={{fontSize: '2.5vh'}}>Влажность: <span style={{fontWeight: '500', marginLeft: '6px', fontSize: '2.5vh'}}>{hum1}%;</span></span>}
       {loc === '' ? null : <span style={{fontSize: '2.5vh'}}>Скорость ветра: <span style={{fontWeight: '500', marginLeft: '6px', fontSize: '2.5vh'}}>{wind1} м/с;</span></span>}
       </div>
      </div>
      
      <div className='data'>
      <h1>{name}</h1> 
      <div style={{height: '24px'}}>
        <div className='blur2'>
      
      {/* {img === 'Clouds' ? <img className='screen' src={Clouds}/> : null}
      {img === 'Clear' ? <img className='screen' src={Clear}/> : null}
      {img === 'Snow' ? <img className='screen' src={Snow}/> : null} */}
        </div>
      </div>
      <div className='pain'>
      
       { temp === '' ? null : <span style={{fontSize: '3vh'}}>На улице: <span style={{fontWeight: '500', marginLeft: '6px'}}>{Math.round(temp)}°С, {weath};</span></span> }
       { feels === '' ? null : <span style={{display: 'block', fontSize: '3vh'}}>Ощущается как: <span style={{fontWeight: '500', marginLeft: '6px'}}>{Math.round(feels)}°С;</span></span> }
       { hum === '' ? null : <span style={{display: 'block', fontSize: '3vh'}}>Влажность: <span style={{fontWeight: '500', marginLeft: '6px'}}>{hum}%;</span></span> }
       { wind === '' ? null : <span style={{fontSize: '3vh'}}>Скорость ветра: <span style={{fontWeight: '500', marginLeft: '6px'}}>{wind} м/с;</span></span> }
       </div>
       </div>
    </div>
  );
}

export default App;
