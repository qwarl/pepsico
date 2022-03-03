import axios from "axios"
import { useEffect } from 'react'

var city_arr: any = [];
let dataCity: any;
useEffect(() => {

    axios.get(`https://provinces.open-api.vn/api/?p==1`)
        .then((res) => {
            dataCity = res['data']
            // console.log('hehe', dataCity);

        }
        )
    if (dataCity !== undefined) {

        dataCity.map(item => {
            city_arr = [...city_arr, { label: item.name, value: item.name }]
            console.log('haha',city_arr);
            
        }
        )
    }
}, [])

export const DATA_CITY = dataCity
