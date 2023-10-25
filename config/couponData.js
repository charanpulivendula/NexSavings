import axios from 'axios';
import storeAPI from './storeAPI';
export default couponData=async ()=>{

    // const options = {
    // method: 'GET',
    // url: 'https://get-promo-codes.p.rapidapi.com/data/get-stores/',
    // params: {
    //     page: '1',
    //     sort: 'update_time_desc'
    // },
    // headers: {
    //     'X-RapidAPI-Key': '9cbcaeeac3mshde04b3b81850ba3p1420d8jsnaf697b81cec6',
    //     'X-RapidAPI-Host': 'get-promo-codes.p.rapidapi.com'
    // }
    // };

    // try {
    //     // const response = await axios.request(options);

    //     // console.log(response.data);
    // } catch (error) {
    //     console.log(error);
    //     return {}
    // }
    // const data = storeAPI.data;

    // const options =(name) => { return {
    //     method: 'GET',
    //     url: `https://api.brandfetch.io/v2/search/${name}`,
    //     headers: {
    //         accept: 'application/json',
    //         Referer: 'https://example.com/searchIntegrationPage'
    //     }
    // }
    // };
    // result=[]
    // data.forEach((store,index)=>{
    //     const opt = options(store.domain);
    //     axios
    //         .request(opt)
    //         .then(function (response) {
    //             if(response.data && response.data[0] && response.data[0].icon !==undefined){
    //                 data[index].icon = response.data[0].icon;
    //             }
    //             else{
    //                 data[index].icon = undefined;
    //             }
    //         })
    //         .catch(function (error) {
    //             console.error(error);
    //         });

    // })
    // console.log(data);

    // const result = []

    // data.map(store=>{

    // })
    // axios
    // .request(options('google.com'))
    // .then(function (response) {
    //     console.log(response.data);
    // })
    // .catch(function (error) {
    //     console.error(error);
    // });
}
