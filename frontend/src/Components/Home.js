import React from 'react';
import apart from 'C:/Users/Алина/Desktop/БИВТ-21-8_Фахердинова А.Д_проект/source/frontend/src/Images/flat.jpg';
import { Button } from 'bootstrap';

function Home(){
    return( 
        <div> 
        <div className="position-absolute top-50 start-50 translate-middle" style={{marginTop:"40px",marginLeft:'56px'}}>
            
            <img src={apart} style={{height:"700px", borderRadius:"20px"}}/>
            <div class='text-on-image'>
             <h3> Инструкция по работе с сайтом </h3>
             <a href="/instruction" class="btn btn-outline-dark" role="button" style={{marginLeft:"30%"}}>Перейти</a>
          </div>
        </div>
        
        <div className='footer' style={{textAlign:'center',fontSize:'15px',marginLeft:'3%'}}> 
        <p >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-c-circle" viewBox="0 0 16 16">
                <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512Z"/>
            </svg> Все права защищены </p></div> 
        </div>
     )
    }
export default Home;