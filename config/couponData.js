import axios from 'axios';

export default couponData=async ()=>{

    const options = {
    method: 'GET',
    url: 'https://get-promo-codes.p.rapidapi.com/data/get-coupons/',
    params: {
        page: '1',
        sort: 'update_time_desc'
    },
    headers: {
        'X-RapidAPI-Key': '9cbcaeeac3mshde04b3b81850ba3p1420d8jsnaf697b81cec6',
        'X-RapidAPI-Host': 'get-promo-codes.p.rapidapi.com'
    }
    };

    try {
        // const response = await axios.request(options);

        // console.log(response.data);
    } catch (error) {
        console.log(error);
        return {}
    }
}