const axios = require('axios');
let flag = false;
function execute() {
    let i = 1;
    let interval = setInterval(() => {
        console.log(i);
        i++;
        if (flag) {
            console.log("Loop stopped.");
            clearInterval(interval);
        }
    }, 1000);
}

// function binarySearch(arr, target) {
//     let left = 0;
//     let right = arr.length - 1;

//     while (left <= right) {
//         let mid = Math.floor((left + right) / 2);

//         if (arr[mid] === target) {
//             return true;
//         } else if (arr[mid] < target) {
//             left = mid + 1;
//         } else {
//             right = mid - 1;
//         }
//     }
//     return false;
// }

// let filteredEntries = [];

module.exports = {
    fetchData : async (req, res) => {
        try {
            const filtereData = Object.keys(req.query).sort();
            if (filtereData.length === 0) {
                // flag = false;
                // execute()
                const response = await axios.get('https://api.publicapis.org/entries');
                // flag = true;
                return res.status(200).send(response.data);
            } else {
                // flag = false;
                // execute()
                const response = await axios.get('https://api.publicapis.org/entries');
                // response.data.entries.forEach(entry => {
                //     if (binarySearch(filtereData, entry.Category)) {
                //         filteredEntries.push(entry);
                //     }
                // });                
                const filteredEntries = await response.data.entries.filter(entry => {
                    return filtereData.includes(entry.Category);
                });
                // flag = true;
                return res.status(200).send(filteredEntries);
            }
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    filterByCategories : async (req, res) => {
        try {
            const filtereData = Object.keys(req.query);
            if (filtereData.length === 0) {
                res.status(400).send('No query parameters provided');
                return;
            }
            filtereData.sort()
            let flag = false;
            let i = 1;
            let interval = setInterval(() => {
                console.log(i);
                i++;
                if (flag) {
                    console.log("Loop stopped.");
                    clearInterval(interval);
                }
            }, 1000);
            const response = await axios.get('https://api.publicapis.org/entries');
            const filteredEntries = await response.data.entries.filter(entry => {
                return categoriesToFilter.includes(entry.Category);
            });
            flag = true;
            return res.status(200).send(filteredEntries);
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }
}



// const findData = ['Animals', 'Anime', 'Anti-Malware', 'Art & Design', 'Books', 'Business', 'Calendar', 'Weather'] // this is a sorted array by alphateical order 

